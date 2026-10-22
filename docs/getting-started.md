# Getting started

These steps install the extension and confirm that the panel can see one OpenSpec project. OpenSpec's own install guide is https://openspec.dev/docs. This page only covers what this extension requires on top of that.

## Prerequisites

| Requirement | Why it matters here |
| --- | --- |
| Cursor or VS Code whose engine is at least 1.105.0 | `package.json` sets `"vscode": "^1.105.0"`. Older hosts refuse to activate the extension. |
| A Node.js binary that can run OpenSpec | The extension does not bundle Node. OpenSpec's docs require Node.js 20.19.0 or newer. That requirement is OpenSpec's, not a check this extension performs. |
| The OpenSpec CLI on disk | The extension runs `openspec.js` by path. It does not call the `openspec` command on `PATH`. |
| A folder you can open in the editor | With no workspace folder, the panel reports `Open a project folder first.` |
| That folder initialized with OpenSpec | The extension never runs `openspec init`. |

Confirm the CLI before blaming the panel:

```bash
node --version
openspec --version
```

`openspec --version` only proves that a shell can find the CLI. The panel uses `openspec.nodePath` and `openspec.cliPath`, which can point somewhere else.

## Install OpenSpec and initialize the project

Follow https://openspec.dev/docs. The usual npm install is:

```bash
npm install -g @fission-ai/openspec@latest
```

Then, in the project you want to work on, not necessarily this extension's repository:

```bash
cd /path/to/your/project
openspec init
```

Select Cursor when the CLI asks which tools to configure. `openspec init` writes the project's agent commands. This extension does not read those files. It always copies the colon form (`/opsx:propose`). Current OpenSpec docs say Cursor's generated spelling is often the hyphen form (`/opsx-propose`). If chat does not recognize the copied command, use the spelling `openspec init` printed for your project. Details are in [user-guide.md](user-guide.md).

This extension repository itself is not an OpenSpec project unless you initialize it. Opening only this repository will not produce a proposal list.

## Find the CLI file the panel must run

On Windows with nvm4w, a typical pair is:

```text
C:\nvm4w\nodejs\node.exe
C:\nvm4w\nodejs\node_modules\@fission-ai\openspec\bin\openspec.js
```

The second path is also the extension's hardcoded fallback when `openspec.cliPath` is empty. It is not a search. On macOS, Linux, or any other Windows layout, set the setting.

To locate the script from a working `openspec` command, the global npm root plus `@fission-ai/openspec/bin/openspec.js` is the usual file. Homebrew and other installers put the CLI elsewhere. Point `openspec.cliPath` at the `openspec.js` file, not at a shell wrapper such as `openspec.ps1` or `openspec.cmd`.

## Configure the extension

After the extension is installed, open Settings, search for **OpenSpec**, and set:

```json
{
  "openspec.nodePath": "C:\\nvm4w\\nodejs\\node.exe",
  "openspec.cliPath": "C:\\nvm4w\\nodejs\\node_modules\\@fission-ai\\openspec\\bin\\openspec.js"
}
```

Use your real paths. Empty values are not auto-detected. See [configuration.md](configuration.md). The new values apply on the next Refresh. A window reload is not required for these two settings.

## Install the extension for daily use

The repository does not publish to a marketplace. Install a `.vsix` you build locally.

From this repository:

```bash
npm install
npm run package
```

`npm run package` compiles TypeScript and runs `npx @vscode/vsce package --allow-missing-repository --no-dependencies`. The file is written next to `package.json` as `openspec-sidebar-0.0.1.vsix`. That filename follows `name` and `version` in `package.json`. `.vsix` files are gitignored.

In Cursor or VS Code:

1. Open Extensions (`Ctrl+Shift+X`, or `Cmd+Shift+X` on macOS).
2. Open the `...` menu in the Extensions view.
3. Choose **Install from VSIX...**.
4. Select `openspec-sidebar-0.0.1.vsix`.
5. Reload the window when asked.

Command-line install, with the path adjusted:

```powershell
& "$env:LOCALAPPDATA\Programs\cursor\Cursor.exe" --install-extension "F:\path\to\openspec-sidebar-0.0.1.vsix"
```

Then reload. The installed extension id is `local.openspec-sidebar`.

## Confirm the install

1. Extensions lists **OpenSpec Sidebar**.
2. The activity bar shows a document icon. Its container title is **OpenSpec Toolkit**.
3. `Ctrl+Shift+P` (or `Cmd+Shift+P`) → **OpenSpec: Show Sidebar** opens the view.
4. File → Open Folder on the initialized project. The panel uses the first workspace folder only.
5. Click **Refresh** (the ↻ button, tooltip **Refresh**).

Expected results:

- Initialized project with no active changes: the list says `No proposals yet. Use Propose to create one.` There is no red banner.
- Initialized project with changes: one or more rows, the first row selected, artifact chips under **Artifacts**.
- Folder not initialized, or the CLI failed: a red banner and, underneath it, the same `No proposals yet` sentence. Read the banner, not the sentence. If the banner starts with `Command failed:`, stdout from OpenSpec was not copied. Extra lines under `Command failed:` are stderr. Run `openspec list --json` in that folder to read the JSON message. See [troubleshooting.md](troubleshooting.md).

## First workflow

1. Click a proposal row so the banner says `Selected: <name>`.
2. Click **Apply**.
3. The toast is `Apply copied to clipboard — paste in chat with Ctrl+L.`
4. Focus chat (`Ctrl+L` or `Cmd+L`). Paste with `Ctrl+V` or `Cmd+V`. Submit the message yourself.

The extension never submits chat. **Propose** needs text in **New Proposal (Explore / Propose)** first. **Archive** opens a modal and then runs the CLI.

## Develop against a second window

Press **F5** in this repository and choose **Run Extension**. That starts the background **npm: watch** task and opens an Extension Development Host. The launch configuration does not pass a project path. Use File → Open Folder inside the host window if it is empty or if it restored a different folder, then open **OpenSpec Toolkit**. The extension in that window is the source tree, not the installed `.vsix`. See [development.md](development.md).
