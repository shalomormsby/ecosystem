# MCP Server Setup Guide

This guide documents how to set up and configure Model Context Protocol (MCP) servers for use with Claude Code in this ecosystem.

## Table of Contents

- [What is MCP?](#what-is-mcp)
- [General Setup Process](#general-setup-process)
- [Figma MCP Server](#figma-mcp-server)
- [Troubleshooting](#troubleshooting)

---

## What is MCP?

Model Context Protocol (MCP) is a standard that allows Claude Code to connect to external tools and services. MCP servers provide specialized capabilities like reading Figma designs, accessing databases, or integrating with APIs.

## General Setup Process

### 1. Add MCP Server via CLI

Use the `claude mcp add` command to register an MCP server:

```bash
claude mcp add --transport <type> <server-name> <url>
```

**Transport types:**
- `http` - HTTP-based MCP servers
- `sse` - Server-Sent Events
- `stdio` - Standard I/O (for local processes)

### 2. Verify Installation

Check that the server is configured:

```bash
claude mcp list
```

This will show all configured MCP servers and their connection status.

### 3. Restart Claude Code/VS Code

After adding an MCP server, you typically need to restart VS Code completely (not just Claude Code) for the tools to become available.

### 4. Test Connection

Use the `/mcp` command in Claude Code to check server status and manage connections.

---

## Figma MCP Server

The Figma MCP Server brings Figma designs directly into your Claude Code workflow, allowing AI agents to read design information, tokens, and component details.

### Two Setup Options

1. **Desktop MCP Server** (Recommended) - Runs locally through Figma desktop app, selection-based
2. **Remote MCP Server** - Connects to Figma's hosted endpoint, link-based (requires OAuth)

### Option 1: Desktop MCP Server (Recommended)

**Why use this:**
- No authentication complexity
- Selection-based (select in Figma, Claude sees it)
- Works offline once files are loaded
- Faster and more reliable

**Prerequisites:**
1. Install Figma desktop app (latest version)
2. Open a Figma Design file
3. Enable Dev Mode (Shift+D)

**Setup Steps:**

1. **Enable Desktop MCP Server in Figma**
   - Open Figma desktop app
   - Open or create a Design file
   - Switch to Dev Mode (Shift+D)
   - In the inspect panel, find "MCP server" section
   - Click "Enable desktop MCP server"
   - Server will run at `http://127.0.0.1:3845/mcp`

2. **Add Server to Claude Code**
   ```bash
   claude mcp add --transport http figma http://127.0.0.1:3845/mcp
   ```

3. **Verify Connection**
   ```bash
   claude mcp list
   ```

   You should see:
   ```
   figma: http://127.0.0.1:3845/mcp (HTTP) - ✓ Connected
   ```

4. **Restart VS Code**
   - Close VS Code completely
   - Reopen VS Code
   - Start a new Claude Code session

5. **Test It**
   - Select a frame or component in Figma (in Dev Mode)
   - In Claude Code, ask: "Can you see the Figma frame that's currently selected?"
   - Claude should be able to read and describe your design

**How to Use:**
- Keep Figma desktop app running with your design file open
- Select components/frames in Figma Dev Mode
- Claude Code will automatically read what you have selected
- Ask Claude to generate code, extract design tokens, or analyze the design

---

### Option 2: Remote MCP Server (Link-Based)

**Why use this:**
- No desktop app required
- Can access any Figma file via URL
- Works from anywhere

**Known Issues:**
- OAuth authentication can be unreliable
- May show "needs authentication" without clear auth flow
- Tools don't always load after authentication without restart
- As of Dec 2024, this has significant UX issues

**Setup Steps:**

1. **Add Remote Server**
   ```bash
   claude mcp add --transport http figma https://mcp.figma.com/mcp
   ```

2. **Check Status**
   ```bash
   claude mcp list
   ```

   You'll likely see:
   ```
   figma: https://mcp.figma.com/mcp (HTTP) - ⚠ Needs authentication
   ```

3. **Attempt Authentication**
   - Type `/mcp` in Claude Code
   - Click "Manage MCPs" or "MCP Status"
   - Look for "figma" server
   - Click on the server entry (this may trigger OAuth)
   - Follow browser prompts to authorize

4. **Known Issue: No Clear Auth Button**
   - The UI may not show an "Authenticate" button
   - Clicking on the server name might not trigger OAuth
   - This is a known bug as of Dec 2024

5. **If Authentication Succeeds**
   - Restart VS Code completely
   - Check `claude mcp list` again
   - Should show "✓ Connected"

**Our Experience:**
After multiple attempts, we were unable to get the remote server working reliably. OAuth authentication appeared to be broken in the current version. **We recommend using the Desktop MCP Server instead.**

---

## Troubleshooting

### Server Shows "Needs Authentication"

**For Desktop Server:**
- Make sure Figma desktop app is running
- Verify "Enable desktop MCP server" is toggled ON in Figma Dev Mode
- Check that the server is accessible: `curl http://127.0.0.1:3845/mcp` should not error

**For Remote Server:**
- This usually indicates OAuth issues
- Try removing and re-adding: `claude mcp remove figma -s local && claude mcp add --transport http figma https://mcp.figma.com/mcp`
- Check GitHub issues: https://github.com/anthropics/claude-code/issues (search for "MCP authentication")

### Tools Not Available After Setup

**Symptoms:**
- MCP server shows "Connected" in `claude mcp list`
- But Claude Code doesn't have access to Figma tools
- Claude can't see selected designs

**Solution:**
1. Restart VS Code completely (not just reload window)
2. Start a fresh Claude Code session
3. This is due to a known bug where tools don't load until restart

**Related Issue:**
- https://github.com/anthropics/claude-code/issues/10250
- OAuth authentication succeeds but MCP reconnection fails until restart

### Server Already Exists Error

**Error:**
```
MCP server figma already exists in local config
```

**Solution:**
The server is already configured. Check its status with:
```bash
claude mcp list
```

If you want to reconfigure:
```bash
claude mcp remove figma -s local
claude mcp add --transport http figma <url>
```

### Cannot Create .mcp.json Manually

**Important:**
Do NOT create `.mcp.json` files manually. Always use `claude mcp add` command.

**Why:**
- Manual files may have incorrect format
- MCP servers need proper registration in Claude Code's config
- The CLI handles all necessary setup steps

**If you already created .mcp.json manually:**
1. Delete it: `rm .mcp.json`
2. Use proper CLI command: `claude mcp add ...`

### Desktop Server Not Running

**Symptoms:**
- `claude mcp list` shows connection error
- Tools not available

**Checklist:**
1. Is Figma desktop app running?
2. Do you have a Design file open (not FigJam)?
3. Are you in Dev Mode (Shift+D)?
4. Is "Enable desktop MCP server" toggled ON?
5. Try toggling it OFF and ON again

**Test Server:**
```bash
curl http://127.0.0.1:3845/sse
```

Should return something like:
```
event: endpoint
data: /messages?sessionId=...
```

### MCP Commands Not Working

**Error:**
```bash
claude mcp: command not found
```

**Solution:**
Claude Code CLI is not installed or not in PATH. Install/update Claude Code.

### Server Shows Connected But Features Don't Work

**For Figma Desktop Server:**
- Make sure you have something SELECTED in Figma
- The desktop server is selection-based
- Claude can only see what you have selected in Dev Mode

**For Figma Remote Server:**
- You need to provide Figma URLs
- Example: "Can you read this Figma file: https://figma.com/design/..."
- The remote server is link-based

---

## Configuration Files

### Where MCP Config is Stored

**System-wide config:**
- macOS: `~/.claude.json`
- Linux: `~/.claude.json`
- Windows: `%USERPROFILE%\.claude.json`

**Project-specific config:**
- `.mcp.json` in project root (if using project scope)
- NOT recommended to create manually

### Viewing Current Config

```bash
claude mcp get <server-name>
```

Example:
```bash
claude mcp get figma
```

Shows:
- Scope (local vs system)
- Status (connected, needs auth, error)
- Type (http, sse, stdio)
- URL

---

## Adding Other MCP Servers

When adding other MCP servers to this ecosystem, follow the same pattern:

1. Document the server in a new section in this file
2. Include setup steps, troubleshooting, and usage examples
3. Note any known issues or limitations
4. Add verification steps

**Template for new MCP server section:**

```markdown
## [Server Name] MCP Server

### Purpose
What this server provides...

### Prerequisites
- Required tools/accounts
- Version requirements

### Setup Steps
1. Step-by-step instructions
2. With actual commands
3. And verification steps

### Usage
How to use once set up...

### Troubleshooting
Common issues and solutions...
```

---

## Resources

- [Claude Code MCP Documentation](https://docs.claude.com/en/docs/claude-code/mcp)
- [Figma MCP Server Documentation](https://developers.figma.com/docs/figma-mcp-server/)
- [MCP Specification](https://modelcontextprotocol.io)
- [Claude Code GitHub Issues](https://github.com/anthropics/claude-code/issues)

---

**Last Updated:** 2025-12-15
**Tested With:** Claude Code v0.x, Figma Desktop (latest), macOS
