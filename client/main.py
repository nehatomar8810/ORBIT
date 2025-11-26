import asyncio
from .agent import ORBITAgent


async def main():
    agent = ORBITAgent()
    await agent.run_interactive()


def client():
    asyncio.run(main())


if __name__ == "__main__":
    client()