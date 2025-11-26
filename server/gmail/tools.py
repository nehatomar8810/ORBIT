from fastmcp import FastMCP
from .auth import get_gmail_service
from datetime import datetime
import re
from typing import List, Dict, Optional

service = get_gmail_service()
mcp = FastMCP("Gmail")

def format_email_summary(emails: List[Dict]) -> str:
    """Format emails into a readable summary"""
    if not emails:
        return "No emails found."
    
    summary = f"Found {len(emails)} emails:\n\n"
    for i, email in enumerate(emails, 1):
        summary += f"{i}. From: {email['from']}\n"
        summary += f"   Subject: {email['subject']}\n"
        summary += f"   Date: {email['date']}\n"
        summary += f"   Preview: {email['snippet'][:100]}...\n\n"
    return summary

def extract_email_addresses(text: str) -> List[str]:
    """Extract email addresses from text"""
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    return re.findall(email_pattern, text)

@mcp.tool()
def get_last_emails(count: int = 10, query: str = "") -> dict:
    """
    Fetches the last N emails from the user's Gmail inbox.
    
    Args:
        count: Number of emails to fetch (default: 10, max: 50)
        query: Optional Gmail search query to filter emails
    """
    try:
        count = min(max(1, count), 50)  # Limit between 1-50
        
        # Build search query
        search_params = {
            'userId': 'me',
            'maxResults': count,
            'labelIds': ['INBOX']
        }
        
        if query:
            search_params['q'] = query
            
        results = service.users().messages().list(**search_params).execute()
        messages = results.get('messages', [])
        emails = []
        
        for msg in messages:
            msg_data = service.users().messages().get(
                userId='me', 
                id=msg['id'], 
                format='metadata', 
                metadataHeaders=['subject', 'from', 'date', 'to', 'cc']
            ).execute()
            
            headers = {h['name'].lower(): h['value'] for h in msg_data['payload'].get('headers', [])}
            emails.append({
                'id': msg['id'],
                'snippet': msg_data.get('snippet', ''),
                'subject': headers.get('subject', 'No Subject'),
                'from': headers.get('from', 'Unknown Sender'),
                'to': headers.get('to', ''),
                'cc': headers.get('cc', ''),
                'date': headers.get('date', ''),
                'thread_id': msg_data.get('threadId', '')
            })
        
        formatted_summary = format_email_summary(emails)
        
        return {
            'status': 'success', 
            'count': len(emails),
            'emails': emails,
            'summary': formatted_summary,
            'search_query': query if query else 'inbox'
        }
    except Exception as e:
        return {'status': 'error', 'message': str(e)}

@mcp.tool()
def send_email(to: str, subject: str = "", body: str = "", cc: str = "", bcc: str = "") -> dict:
    """
    Sends an email using the user's Gmail account with smart defaults.
    
    Args:
        to: Recipient email address(es) - can be comma separated
        subject: Email subject (will generate if empty)
        body: Email body (will generate basic body if empty)
        cc: CC recipients (optional)
        bcc: BCC recipients (optional)
    """
    import base64
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart
    
    try:
        # Validate and clean email addresses
        to_emails = [email.strip() for email in to.split(',')]
        for email in to_emails:
            if not re.match(r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$', email):
                return {'status': 'error', 'message': f'Invalid email address: {email}'}
        
        # Generate subject if empty
        if not subject.strip():
            subject = f"Email from Gmail Assistant - {datetime.now().strftime('%Y-%m-%d %H:%M')}"
        
        # Generate body if empty
        if not body.strip():
            body = "This email was sent via Gmail Assistant.\n\nBest regards"
        
        # Create message
        message = MIMEMultipart()
        message['to'] = ', '.join(to_emails)
        message['subject'] = subject
        
        if cc:
            cc_emails = [email.strip() for email in cc.split(',')]
            message['cc'] = ', '.join(cc_emails)
        
        if bcc:
            bcc_emails = [email.strip() for email in bcc.split(',')]
            message['bcc'] = ', '.join(bcc_emails)
        
        message.attach(MIMEText(body, 'plain'))
        
        raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
        send_result = service.users().messages().send(userId='me', body={'raw': raw}).execute()
        
        return {
            'status': 'success', 
            'id': send_result.get('id'),
            'to': ', '.join(to_emails),
            'subject': subject,
            'message': f'Email sent successfully to {len(to_emails)} recipient(s)'
        }
    except Exception as e:
        return {'status': 'error', 'message': str(e)}

@mcp.tool()
def forward_emails_summary(email_ids: List[str], to: str, custom_subject: str = "", custom_message: str = "") -> dict:
    """
    Forwards a summary of multiple emails to a recipient.
    
    Args:
        email_ids: List of email IDs to summarize and forward
        to: Recipient email address
        custom_subject: Custom subject line (optional)
        custom_message: Custom message to add before the summary (optional)
    """
    try:
        # Get email details
        emails_data = []
        for email_id in email_ids:
            try:
                msg_data = service.users().messages().get(
                    userId='me', 
                    id=email_id, 
                    format='metadata', 
                    metadataHeaders=['subject', 'from', 'date']
                ).execute()
                
                headers = {h['name'].lower(): h['value'] for h in msg_data['payload'].get('headers', [])}
                emails_data.append({
                    'subject': headers.get('subject', 'No Subject'),
                    'from': headers.get('from', 'Unknown Sender'),
                    'date': headers.get('date', ''),
                    'snippet': msg_data.get('snippet', '')
                })
            except Exception as e:
                print(f"Error fetching email {email_id}: {e}")
                continue
        
        if not emails_data:
            return {'status': 'error', 'message': 'No valid emails found to forward'}
        
        # Generate subject
        if not custom_subject:
            custom_subject = f"Email Summary - {len(emails_data)} emails from {datetime.now().strftime('%Y-%m-%d')}"
        
        # Generate body
        body = custom_message + "\n\n" if custom_message else ""
        body += f"Here's a summary of {len(emails_data)} emails:\n\n"
        
        for i, email in enumerate(emails_data, 1):
            body += f"--- Email {i} ---\n"
            body += f"From: {email['from']}\n"
            body += f"Subject: {email['subject']}\n"
            body += f"Date: {email['date']}\n"
            body += f"Preview: {email['snippet'][:200]}...\n\n"
        
        body += f"\nSummary generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        
        # Send the summary
        return send_email(to=to, subject=custom_subject, body=body)
        
    except Exception as e:
        return {'status': 'error', 'message': str(e)}

@mcp.tool()
def smart_email_action(action: str, details: str = "") -> dict:
    """
    Intelligent email handler that can perform complex multi-step operations based on natural language.
    
    Args:
        action: Natural language description of what to do
        details: Additional context or parameters
        
    Examples:
        - "send last 5 emails to john@example.com"
        - "forward recent emails from boss to my assistant"
        - "get emails about project alpha and send summary to team"
    """
    try:
        action_lower = action.lower()
        
        # Extract email addresses from action and details
        all_text = f"{action} {details}"
        found_emails = extract_email_addresses(all_text)
        
        # Pattern: "send last X emails to Y"
        if "send" in action_lower and "last" in action_lower and "emails" in action_lower:
            # Extract number
            numbers = re.findall(r'\d+', action)
            count = int(numbers[0]) if numbers else 10
            
            if found_emails:
                to_email = found_emails[0]
                
                # Get the emails
                recent_emails = get_last_emails(count=count)
                if recent_emails['status'] == 'success':
                    email_ids = [email['id'] for email in recent_emails['emails']]
                    
                    # Forward summary
                    subject = f"Last {count} emails summary - {datetime.now().strftime('%Y-%m-%d')}"
                    return forward_emails_summary(
                        email_ids=email_ids,
                        to=to_email,
                        custom_subject=subject,
                        custom_message=f"As requested, here are the last {count} emails from the inbox:"
                    )
                else:
                    return recent_emails
            else:
                return {'status': 'error', 'message': 'No recipient email address found in the request'}
        
        # Pattern: "get emails from X" or "find emails about Y"
        elif "get" in action_lower or "find" in action_lower:
            query = ""
            count = 10
            
            # Extract search terms
            if "from:" in details or "from " in action_lower:
                # Extract sender
                from_match = re.search(r'from[:\s]+([^\s,]+@[^\s,]+)', all_text, re.IGNORECASE)
                if from_match:
                    query += f"from:{from_match.group(1)} "
            
            if "about" in action_lower or "subject:" in details:
                # Extract subject keywords
                subject_match = re.search(r'(?:about|subject:?)\s+([^,\n]+)', all_text, re.IGNORECASE)
                if subject_match:
                    keywords = subject_match.group(1).strip()
                    query += f'subject:"{keywords}" '
            
            # Extract count if specified
            numbers = re.findall(r'\d+', action)
            if numbers:
                count = int(numbers[0])
            
            return get_last_emails(count=count, query=query.strip())
        
        # Pattern: "forward emails to X"
        elif "forward" in action_lower and found_emails:
            # Get recent emails and forward
            recent_emails = get_last_emails(count=5)
            if recent_emails['status'] == 'success':
                email_ids = [email['id'] for email in recent_emails['emails']]
                return forward_emails_summary(
                    email_ids=email_ids,
                    to=found_emails[0],
                    custom_message="Forwarding recent emails as requested:"
                )
        
        else:
            return {
                'status': 'error', 
                'message': 'Could not understand the action. Try patterns like: "send last 5 emails to user@example.com", "get emails from boss", "find emails about project"'
            }
            
    except Exception as e:
        return {'status': 'error', 'message': f'Error processing smart action: {str(e)}'}

@mcp.tool()
def search_emails(query: str, max_results: int = 20) -> dict:
    """
    Advanced email search with Gmail query syntax support.
    
    Args:
        query: Gmail search query (supports from:, to:, subject:, has:attachment, etc.)
        max_results: Maximum number of results (default: 20, max: 100)
    
    Examples:
        - "from:boss@company.com subject:meeting"
        - "has:attachment filename:pdf"
        - "is:unread after:2024/1/1"
    """
    try:
        max_results = min(max(1, max_results), 100)
        
        results = service.users().messages().list(
            userId='me',
            q=query,
            maxResults=max_results
        ).execute()
        
        messages = results.get('messages', [])
        emails = []
        
        for msg in messages:
            msg_data = service.users().messages().get(
                userId='me',
                id=msg['id'],
                format='metadata',
                metadataHeaders=['subject', 'from', 'date', 'to']
            ).execute()
            
            headers = {h['name'].lower(): h['value'] for h in msg_data['payload'].get('headers', [])}
            emails.append({
                'id': msg['id'],
                'snippet': msg_data.get('snippet', ''),
                'subject': headers.get('subject', 'No Subject'),
                'from': headers.get('from', 'Unknown Sender'),
                'to': headers.get('to', ''),
                'date': headers.get('date', ''),
                'thread_id': msg_data.get('threadId', '')
            })
        
        formatted_summary = format_email_summary(emails)
        
        return {
            'status': 'success',
            'count': len(emails),
            'emails': emails,
            'summary': formatted_summary,
            'query': query
        }
        
    except Exception as e:
        return {'status': 'error', 'message': str(e)}