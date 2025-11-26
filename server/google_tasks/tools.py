from fastmcp import FastMCP
from .auth import get_tasks_service

service = get_tasks_service()
mcp = FastMCP("Google-Tasks")

# TaskList Tools
@mcp.tool()
def create_tasklist(title: str) -> dict:
    """Creates a new Google Task List with the given title."""
    try:
        body = {"title": title}
        tasklist = service.tasklists().insert(body=body).execute()
        return {
            "status": "success",
            "id": tasklist.get("id"),
            "title": tasklist.get("title"),
            "updated": tasklist.get("updated")
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

@mcp.tool()
def get_tasklist(tasklist_id: str) -> dict:
    """Gets a specific Google Task List by ID."""
    try:
        tasklist = service.tasklists().get(tasklist=tasklist_id).execute()
        return {
            "status": "success",
            "id": tasklist.get("id"),
            "title": tasklist.get("title"),
            "updated": tasklist.get("updated")
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

@mcp.tool()
def delete_tasklist(tasklist_id: str) -> dict:
    """Deletes a Google Task List by ID."""
    try:
        service.tasklists().delete(tasklist=tasklist_id).execute()
        return {"status": "success", "message": f"TaskList {tasklist_id} deleted successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@mcp.tool()
def list_tasklists() -> dict:
    """Lists all Google Task Lists for the authenticated user."""
    try:
        results = service.tasklists().list().execute()
        tasklists = results.get('items', [])
        
        formatted_tasklists = []
        for tasklist in tasklists:
            formatted_tasklists.append({
                "id": tasklist.get("id"),
                "title": tasklist.get("title"),
                "updated": tasklist.get("updated")
            })
        
        return {
            "status": "success",
            "tasklists": formatted_tasklists,
            "count": len(formatted_tasklists)
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Task Tools
@mcp.tool()
def create_task(tasklist_id: str, title: str, notes: str = None, due: str = None, parent: str = None) -> dict:
    """Creates a new task in the specified task list."""
    try:
        body = {"title": title}
        if notes:
            body["notes"] = notes
        if due:
            body["due"] = due
        
        task = service.tasks().insert(tasklist=tasklist_id, body=body, parent=parent).execute()
        
        return {
            "status": "success",
            "id": task.get("id"),
            "title": task.get("title"),
            "notes": task.get("notes"),
            "status": task.get("status"),
            "due": task.get("due"),
            "updated": task.get("updated"),
            "parent": task.get("parent")
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

@mcp.tool()
def get_task(tasklist_id: str, task_id: str) -> dict:
    """Gets a specific task by ID from a task list."""
    try:
        task = service.tasks().get(tasklist=tasklist_id, task=task_id).execute()
        
        return {
            "status": "success",
            "id": task.get("id"),
            "title": task.get("title"),
            "notes": task.get("notes"),
            "status": task.get("status"),
            "due": task.get("due"),
            "completed": task.get("completed"),
            "updated": task.get("updated"),
            "parent": task.get("parent")
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

@mcp.tool()
def delete_task(tasklist_id: str, task_id: str) -> dict:
    """Deletes a task from a task list."""
    try:
        service.tasks().delete(tasklist=tasklist_id, task=task_id).execute()
        return {"status": "success", "message": f"Task {task_id} deleted successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@mcp.tool()
def list_tasks(tasklist_id: str, show_completed: bool = False, show_deleted: bool = False, max_results: int = 100) -> dict:
    """Lists tasks in a specific task list."""
    try:
        results = service.tasks().list(
            tasklist=tasklist_id,
            showCompleted=show_completed,
            showDeleted=show_deleted,
            maxResults=max_results
        ).execute()
        
        tasks = results.get('items', [])
        
        formatted_tasks = []
        for task in tasks:
            formatted_tasks.append({
                "id": task.get("id"),
                "title": task.get("title"),
                "notes": task.get("notes"),
                "status": task.get("status"),
                "due": task.get("due"),
                "completed": task.get("completed"),
                "updated": task.get("updated"),
                "parent": task.get("parent")
            })
        
        return {
            "status": "success",
            "tasks": formatted_tasks,
            "count": len(formatted_tasks)
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}