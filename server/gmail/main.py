from .tools import mcp

def main():
    mcp.run(transport="http", port=8001)

if __name__ == "__main__":
    main()