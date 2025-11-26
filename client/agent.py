import os
from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.prebuilt import create_react_agent
from langchain_google_genai import ChatGoogleGenerativeAI

from .config import GOOGLE_API_KEY, MCP_SERVERS, MODEL_NAME
from .auth import save_credentials
from .system_prompt import create_system_message


class ORBITAgent:
    def __init__(self):
        self.agent = None
        self.current_tasklist_id = None
        self.messages = []
        
    async def initialize(self):
        os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY

        save_credentials()

        client = MultiServerMCPClient(MCP_SERVERS)

        tools = await client.get_tools()

        model = ChatGoogleGenerativeAI(model=MODEL_NAME)

        system_message = create_system_message(self.current_tasklist_id)

        self.agent = create_react_agent(model, tools)

        self.messages = [system_message]

    async def chat(self, user_input):
        if not self.agent:
            raise RuntimeError("Agent not initialized. Call initialize() first.")
            
        self.messages.append({"role": "user", "content": user_input})

        try:
            response = await self.agent.ainvoke({"messages": self.messages})
            reply = response['messages'][-1].content
            self.messages.append({"role": "assistant", "content": reply})
            return reply
        except Exception as e:
            raise Exception(f"Agent processing failed: {str(e)}")

    async def run_interactive(self):
        await self.initialize()
        
        print("🤖 ORBIT is ready. Ask me anything! (type 'exit' to quit)\n")

        while True:
            user_input = input("👤 You: ")

            if user_input.lower() in {"exit", "quit"}:
                print("👋 Goodbye!")
                break

            try:
                reply = await self.chat(user_input)
                print(f"🤖 ORBIT: {reply}\n")
            except Exception as e:
                print(f"❌ Error: {str(e)}\n")