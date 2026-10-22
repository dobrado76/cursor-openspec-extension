# Configuration

The extension contributes two settings. Both are strings. Both default to an empty string. `package.json` does not set `scope`, so they are window settings: User and Workspace. They are not language-specific and not per-folder in a multi-root workspace.

Open them with Settings (`Ctrl+,` or `Cmd+,`) and search **OpenSpec**, or edit `settings.json`.

The extension reads them on every CLI call through `vscode.workspace.getConfiguration('openspec')`. It does not listen for configuration changes, but the next list, status, validate, or archive call loads the current values. You do not reload the window after editing them.

There are no environment variables, feature flags, or secret stores in this extension.

## openspec.nodePath

| | |
| --- | --- |
| Key | `openspec.nodePath` |
| Type | string |
| Default | `""` |
| Manifest text | "Path to node.exe (auto-detected if empty)" |

The manifest text is misleading. The code does not search `PATH` and does not look for `node.exe`.

When the value is empty or otherwise falsy, the extension uses `process.execPath` and does not change the environment. `exec` inherits the extension host environment. This repository did not run the panel to see whether that executable successfully loads `openspec.js`. Do not treat the empty value as a detected Node install. Set the setting to the same `node` binary that can already run `openspec --version` (OpenSpec's own docs require Node.js 20.19.0 or newer).

A whitespace-only value is not empty, so it is used as the program path and the call fails.

Example:

```json
"openspec.nodePath": "C:\\nvm4w\\nodejs\\node.exe"
```

The value is quoted by the extension when it builds the command, so spaces in the path are allowed. It must be the Node executable, not `openspec.cmd`.

## openspec.cliPath

| | |
| --- | --- |
| Key | `openspec.cliPath` |
| Type | string |
| Default | `""` |
| Manifest text | "Path to openspec.js CLI (auto-detected if empty)" |

The manifest text is misleading. There is no detection.

When the value is empty or otherwise falsy, the extension uses this hardcoded path:

```text
C:\nvm4w\nodejs\node_modules\@fission-ai\openspec\bin\openspec.js
```

That file exists only on a machine that installed the global npm package under nvm4w at that location. Every other layout must set `openspec.cliPath` to the `openspec.js` entry file. Do not point it at `openspec.ps1`, `openspec.cmd`, or a directory.

Example:

```json
"openspec.cliPath": "C:\\nvm4w\\nodejs\\node_modules\\@fission-ai\\openspec\\bin\\openspec.js"
```

## Settings that do not exist

The extension does not contribute any of the following. If an older note or chat mentions them, they are not in version 0.0.1:

- `openspec.autoSubmitChat`
- `openspec.agentOpenDelayMs`
- A store id, profile name, or sort order
- A telemetry switch

OpenSpec's own telemetry, if the CLI has it, is unchanged by this extension. The extension does not set `OPENSPEC_TELEMETRY` or `DO_NOT_TRACK`.

If the same key is set in User settings and in Workspace settings, the editor's normal precedence applies: the workspace value wins. The extension does not implement a third store.

## Workspace trust

`package.json` does not declare `capabilities.untrustedWorkspaces`. VS Code's workspace-trust guide says an extension that omits that declaration stays disabled in Restricted Mode until the folder is trusted: https://code.visualstudio.com/api/extension-guides/workspace-trust. This repository did not re-test that host behavior inside Cursor. There is also no `capabilities.virtualWorkspaces` entry. Whether a virtual workspace disables the extension was not tested.

## What is stored, and where

| Data | Stored? |
| --- | --- |
| The two settings | Yes, in normal User or Workspace settings, by VS Code/Cursor. This extension does not write a private config file. |
| Selected proposal | Memory only, on the webview provider. Lost when the extension host exits. |
| Text in the proposal box | Inside the webview document. Lost when the webview is recreated. Not written to disk by this extension. |
| Log text | Same as the text box. |
| Clipboard | The slash command replaces the clipboard. The previous clipboard text is not restored. |
| OpenSpec files | Not written by this extension, except indirectly when `openspec archive` succeeds. That write is the CLI's. |

No cache, database, or log file is created by the extension. The only activation log line is `OpenSpec Sidebar: activate` in the extension host console.

## Workspace folder versus settings

CLI working directory is always `workspaceFolders[0]`, the first root. Settings are window-scoped, so a second folder cannot have its own node path inside one window. Open that folder as its own window if it needs different paths.
