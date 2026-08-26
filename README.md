# Cursor OpenSpec Extension

A **Cursor / VS Code sidebar extension** that gives [OpenSpec](https://github.com/Fission-AI/OpenSpec) a visual workflow panel inside the editor. Instead of remembering slash commands and hunting through folders, you get a live list of proposals, artifact progress, and one-click access to the five core OpenSpec operations.

This repository is a **monorepo workspace**:

| Path | Purpose |
|------|---------|
| `openspec-sidebar/` | The installable extension (TypeScript, webview UI, CLI integration) |
| `package.json` | Root workspace tooling (`generator-code`, shared dev deps) |
| `.vscode/` | Debug launch config pointing at `openspec-sidebar/` |

---

## Table of Contents

- [Why this exists](#why-this-exists)
- [What is OpenSpec?](#what-is-openspec)
- [Features](#features)
- [Requirements](#requirements)
- [Install for daily use](#install-for-daily-use)
- [Quick start](#quick-start)
- [The five workflow operations](#the-five-workflow-operations)
- [How proposals work](#how-proposals-work)
- [UI walkthrough](#ui-walkthrough)
- [Configuration](#configuration)
- [Command palette commands](#command-palette-commands)
- [Development](#development)
- [Project structure](#project-structure)
- [Architecture](#architecture)
- [Troubleshooting](#troubleshooting)
- [Known limitations](#known-limitations)
- [Updating the extension](#updating-the-extension)
- [Related links](#related-links)

---

## Why this exists

OpenSpec is powerful spec-driven development for AI assistants, but the default experience is **CLI + chat slash commands**. That works, yet it has friction:

- You must remember `/opsx:propose`, `/opsx:apply`, etc.
- Active changes live under `openspec/changes/` — easy to lose track
- There is no at-a-glance view of artifact completion or task progress
- Selecting *which* proposal to apply requires knowing folder names

This extension adds an **OpenSpec Toolkit** panel to Cursor's activity bar. It reads your workspace via the OpenSpec CLI, surfaces proposals with progress bars, and copies the right slash command to your clipboard so you can paste it into Cursor chat.

---

## What is OpenSpec?

[OpenSpec](https://github.com/Fission-AI/OpenSpec) is an open-source, spec-driven development (SDD) framework for AI coding assistants. It structures work into:

1. **Explore** — research and ideation before committing to a change
2. **Propose** — draft `proposal.md`, `design.md`, spec deltas, and `tasks.md`
3. **Apply** — implement against the agreed task checklist
4. **Verify** — validate specs and run QA
5. **Archive** — merge completed changes into main specs and close out the change

OpenSpec generates tool-specific slash commands when you run `openspec init`. In Cursor, these appear as `/opsx:explore`, `/opsx:propose`, `/opsx:apply`, `/opsx:verify`, and archive flows via CLI or chat.

**This extension does not replace OpenSpec** — it is a UI layer on top of the CLI and Cursor chat commands you already use.

---

## Features

- **Proposal list** — live data from `openspec list --json` with status badges and task progress bars
- **Artifact tracking** — for the selected proposal, shows `proposal`, `design`, `specs`, and `tasks` completion state via `openspec status --json`
- **Five workflow actions** — Explore, Propose, Apply, Verify, Archive as clickable cards
- **Smart selection** — Apply, Verify, and Archive require a selected proposal; the UI dims those actions until you pick one
- **Clipboard integration** — copies the correct `/opsx:*` slash command; paste into Cursor chat with **Ctrl+L**
- **Direct CLI for Verify & Archive** — runs `openspec validate` and `openspec archive` and shows output in an in-panel log
- **View recovery commands** — restore the sidebar if you accidentally hide it or dock it somewhere awkward
- **Configurable CLI paths** — override Node and OpenSpec CLI locations if auto-detection fails

---

## Requirements

| Requirement | Notes |
|-------------|-------|
| **Cursor** or **VS Code** `>= 1.105.0` | Extension engine requirement |
| **Node.js** | Used to invoke the OpenSpec CLI |
| **OpenSpec CLI** | `npm install -g @fission-ai/openspec@latest` |
| **Initialized project** | Run `openspec init` in your target repo and select Cursor |

Your **target project** (the folder you open in Cursor) must contain an `openspec/` directory created by `openspec init`. The extension reads that workspace — it does not initialize OpenSpec for you.

---

## Install for daily use

F5 debug mode runs the extension in a **second** "Extension Development Host" window. For normal daily use, install a packaged `.vsix` file.

### Option A — Install from VSIX (recommended)

1. Build the package (or use an existing one):

   ```powershell
   cd openspec-sidebar
   npm install
   npm run package
   ```

   Output: `openspec-sidebar/openspec-sidebar-0.0.1.vsix`

2. In Cursor: **Extensions** (`Ctrl+Shift+X`) → **`...`** menu → **Install from VSIX...**
3. Select the `.vsix` file
4. **Reload Window** when prompted

### Option B — CLI install

```powershell
& "$env:LOCALAPPDATA\Programs\cursor\Cursor.exe" --install-extension "F:\Sites\cursor-openspec-extension\openspec-sidebar\openspec-sidebar-0.0.1.vsix"
```

Adjust the path to match your machine, then reload Cursor.

### Verify installation

- **Extensions** panel should list **OpenSpec Sidebar**
- Activity bar should show a **document icon** (OpenSpec Toolkit)
- `Ctrl+Shift+P` → **OpenSpec: Show Sidebar** should open the panel

---

## Quick start

1. **Install OpenSpec globally** (if you have not already):

   ```bash
   npm install -g @fission-ai/openspec@latest
   ```

2. **Initialize your project**:

   ```bash
   cd /path/to/your/project
   openspec init
   # Select "Cursor" when prompted
   ```

3. **Install this extension** (see above)

4. **Open your initialized project** in Cursor (File → Open Folder)

5. **Open the OpenSpec Toolkit** — click the document icon in the activity bar, or run **OpenSpec: Show Sidebar**

6. **Create or select a proposal**:
   - Type a feature description in the input box → click **Propose** → paste `/opsx:propose …` into chat
   - Or click an existing proposal row to select it

7. **Run workflow actions** — click **Apply**, **Verify**, etc. Commands copy to clipboard; paste in chat with **Ctrl+L**

---

## The five workflow operations

| Operation | What it does | Needs selected proposal? | Needs input text? | Mechanism |
|-----------|--------------|--------------------------|-------------------|-----------|
| **Explore** | Research and ideation before committing | Optional | Optional | Copies `/opsx:explore …` to clipboard |
| **Propose** | Create a new change with proposal, design, specs, tasks | No | **Yes** | Copies `/opsx:propose …` to clipboard |
| **Apply** | Implement tasks for a change | **Yes** | No | Copies `/opsx:apply <change-name>` to clipboard |
| **Verify** | Validate specs and QA | **Yes** | No | Runs `openspec validate` CLI **and** copies `/opsx:verify <change-name>` |
| **Archive** | Close out change and merge into main specs | **Yes** | No | Runs `openspec archive` CLI (with confirmation dialog) |

### Typical end-to-end flow

```
Explore (optional)
    ↓
Propose  →  AI drafts openspec/changes/<name>/
    ↓
Review & iterate in chat until artifacts are complete
    ↓
Apply  →  AI implements tasks.md checklist
    ↓
Verify  →  CLI validation + /opsx:verify in chat
    ↓
Archive  →  Merges specs, removes active change folder
```

**Keyboard shortcut:** `Ctrl+Enter` in the proposal input box triggers **Propose**.

---

## How proposals work

In OpenSpec terminology, a **change** and a **proposal** are the same thing. Each row in the sidebar corresponds to a folder:

```
openspec/changes/<change-name>/
├── proposal.md      # What and why
├── design.md        # How (technical approach)
├── specs/           # Requirement deltas
└── tasks.md         # Implementation checklist
```

The sidebar calls:

- `openspec list --json` — populate the proposal list with status, task counts, and last modified date
- `openspec status --change "<name>" --json` — show artifact chips and next steps for the selected proposal

When you click **Apply**, the extension copies `/opsx:apply add-dark-mode` (for example). Paste that into Cursor chat and the agent reads `tasks.md` and related spec files from your repo — not from chat history.

---

## UI walkthrough

```
┌─────────────────────────────────────┐
│ OPENSPEC TOOLKIT          (native)  │  ← Cursor view title (only one bar)
├─────────────────────────────────────┤
│ Proposals                      ↻    │
│ Each row is an active change...     │
│ ┌─────────────────────────────────┐ │
│ │ Selected: add-dark-mode         │ │  ← Selection banner
│ └─────────────────────────────────┘ │
│ ┌ add-dark-mode          [progress] │
│ │ ████████░░░░  4/7 tasks           │
│ └ add-auth-flow            [done]   │
│                                     │
│ Artifacts                           │
│ [proposal: done] [design: done] ... │
│                                     │
│ New Proposal (Explore / Propose)    │
│ ┌─────────────────────────────────┐ │
│ │ Describe a feature...           │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Workflow                            │
│ ┌─────────┐ ┌─────────┐             │
│ │ Explore │ │ Propose │             │
│ └─────────┘ └─────────┘             │
│ ┌─────────┐ ┌─────────┐             │
│ │  Apply  │ │ Verify  │  (dimmed    │
│ └─────────┘ └─────────┘   until     │
│ ┌─────────────────────────┐ select) │
│ │        Archive          │         │
│ └─────────────────────────┘         │
│                                     │
│ Log (CLI output for verify/archive) │
└─────────────────────────────────────┘
```

- **Refresh (↻)** — re-fetch proposals and status from CLI
- **Selected banner** — confirms which proposal Apply / Verify / Archive will target
- **Dimmed workflow cards** — Apply, Verify, Archive are disabled visually until a proposal is selected

---

## Configuration

Open **Settings** (`Ctrl+,`) and search **OpenSpec**:

| Setting | Key | Default | Description |
|---------|-----|---------|-------------|
| Node path | `openspec.nodePath` | *(empty)* | Path to `node.exe`. Falls back to `process.execPath` |
| CLI path | `openspec.cliPath` | *(empty)* | Path to `openspec.js`. Required on non-default installs |
| | | | On Windows with nvm4w, default fallback is `C:\nvm4w\nodejs\node_modules\@fission-ai\openspec\bin\openspec.js` |

Example `settings.json` snippet:

```json
{
  "openspec.nodePath": "C:\\nvm4w\\nodejs\\node.exe",
  "openspec.cliPath": "C:\\nvm4w\\nodejs\\node_modules\\@fission-ai\\openspec\\bin\\openspec.js"
}
```

Set these if the sidebar shows CLI errors or "OpenSpec not initialized" when your project is correctly set up.

---

## Command palette commands

| Command | Purpose |
|---------|---------|
| **OpenSpec: Show Sidebar** | Open or focus the OpenSpec Toolkit view |
| **OpenSpec: Reset Sidebar (fix hidden icon)** | Reset all view locations and restore the activity bar icon |
| **OpenSpec: Move to Left Sidebar** | Move the panel back to the primary side bar |

### If you accidentally hide the panel

Right-click the **activity bar** (far-left icon strip) → check **OpenSpec Toolkit**.

Or run **OpenSpec: Reset Sidebar** — this fixes both hidden icons and empty views after a bad dock/hide sequence.

### Docking behavior

OpenSpec is a **View**, not an editor tab. It can live in:

- Primary side bar (left, with the document icon in the activity bar)
- Secondary side bar (right)
- Bottom panel (e.g. next to Terminal)

Drag the **view title bar** (`OPENSPEC TOOLKIT`), not the content inside. It cannot become a normal editor tab. If docked in the bottom panel, the activity bar icon may disappear — use **Move to Left Sidebar** or **Reset Sidebar**.

---

## Development

### Prerequisites

- Node.js 18+
- Cursor or VS Code

### Setup

```powershell
# Root workspace (optional generator tooling)
npm install

# Extension package
cd openspec-sidebar
npm install
npm run compile
```

### Run in Extension Development Host

1. Open this repo as the workspace root (`cursor-openspec-extension.code-workspace`)
2. Press **F5** → select **Run OpenSpec Extension**
3. A **second Cursor window** opens — that is where the extension runs
4. In that window, open a project with OpenSpec initialized (e.g. a repo where you ran `openspec init`)
5. Click the **document icon** in the activity bar

The root `.vscode/launch.json` sets `--extensionDevelopmentPath` to `openspec-sidebar/` so Cursor does not mistakenly load the root `package.json` as an extension manifest.

### Watch mode

```powershell
cd openspec-sidebar
npm run watch
```

Recompile happens on save; reload the Extension Development Host window to pick up changes.

### Package a new VSIX

```powershell
cd openspec-sidebar
npm run package
```

Then reinstall the `.vsix` in your main Cursor instance.

---

## Project structure

```
cursor-openspec-extension/
├── README.md                          ← This file
├── package.json                       ← Root workspace (private, not an extension)
├── cursor-openspec-extension.code-workspace
├── .vscode/
│   ├── launch.json                    ← F5 → openspec-sidebar
│   └── tasks.json                     ← Pre-launch compile task
└── openspec-sidebar/                  ← The actual extension
    ├── package.json                   ← Extension manifest
    ├── tsconfig.json
    ├── media/
    │   └── icon.svg                   ← Activity bar icon
    ├── src/
    │   ├── extension.ts               ← Activation, commands, webview provider
    │   ├── openspecCli.ts             ← CLI wrapper (list, status, validate, archive)
    │   ├── panelHtml.ts               ← Webview UI (HTML/CSS/JS)
    │   └── cursorChat.ts              ← Clipboard helper for slash commands
    └── out/                           ← Compiled JavaScript (gitignored)
```

---

## Architecture

```
┌──────────────────┐     postMessage      ┌──────────────────┐
│  Webview panel   │ ◄──────────────────► │  extension.ts    │
│  (panelHtml.ts)  │                      │  WebviewProvider │
└──────────────────┘                      └────────┬─────────┘
                                                   │
                     ┌─────────────────────────────┼─────────────────────────────┐
                     │                             │                             │
                     ▼                             ▼                             ▼
            ┌────────────────┐           ┌─────────────────┐           ┌─────────────────┐
            │  openspecCli   │           │  cursorChat     │           │  VS Code API    │
            │  child_process │           │  clipboard      │           │  commands       │
            └───────┬────────┘           └─────────────────┘           └─────────────────┘
                    │
                    ▼
            ┌────────────────┐
            │  @fission-ai/  │
            │  openspec CLI  │
            └───────┬────────┘
                    │
                    ▼
            openspec/changes/  in workspace
```

- **Explore / Propose / Apply** — UI only prepares slash commands; Cursor chat executes them
- **Verify** — hybrid: CLI validation runs immediately; slash command copied for full AI-driven QA
- **Archive** — CLI-only with modal confirmation (destructive operation)

The webview re-renders when it becomes visible again, avoiding blank panels after hide/show cycles.

---

## Troubleshooting

### Blank sidebar

- Confirm you are in the **Extension Development Host** window when debugging (F5), or that the VSIX is installed in your main Cursor
- Check **View → Output → Extension Host** for `OpenSpec Sidebar: activate` and `resolveWebviewView`
- Run **OpenSpec: Reset Sidebar**

### "Extension not compatible with Code X.X.X"

The extension requires VS Code engine `^1.105.0`. If Cursor reports a lower version, either update Cursor or adjust `engines.vscode` in `openspec-sidebar/package.json` to match your build.

### "property 'name' is mandatory" on launch

The workspace root must **not** be loaded as the extension. Use the provided F5 launch config, which points at `openspec-sidebar/`.

### No proposals listed / "not initialized"

- Open a **folder** that contains `openspec/` (File → Open Folder)
- Run `openspec init` in that project if missing
- Click refresh (↻) in the panel
- Verify CLI works in terminal: `openspec list --json`

### CLI errors on Windows

Set `openspec.nodePath` and `openspec.cliPath` explicitly in Settings (see [Configuration](#configuration)).

### Slash command copied but nothing happens in chat

1. Focus Cursor chat (`Ctrl+L`)
2. Paste (`Ctrl+V`)
3. Submit the message

The extension intentionally does **not** auto-open or auto-fill the agent prompt — Cursor has no stable public API for that, and auto-open created a poor UX (new chat window every click).

### Archive failed

Archive requires the change to pass validation and have completed artifacts. Run **Verify** first and check the log panel for CLI output.

---

## Known limitations

- **Clipboard-only for chat operations** — Explore, Propose, and Apply copy commands; you paste manually
- **Single workspace folder** — uses the first workspace root for CLI `cwd`
- **No inline editing** — proposal files are edited in the editor or via chat, not in the webview
- **View docking quirks** — standard VS Code/Cursor behavior; use reset/move commands as workarounds
- **Hardcoded Windows CLI fallback** — non-Windows users should set `openspec.cliPath` in settings

---

## Updating the extension

After pulling code changes:

```powershell
cd openspec-sidebar
npm install          # if dependencies changed
npm run compile      # or npm run package for VSIX
```

- **F5 debug:** stop and restart the debug session
- **Installed VSIX:** `npm run package` → Install from VSIX again (overwrites previous version) → Reload Window

---

## Related links

- [OpenSpec on GitHub](https://github.com/Fission-AI/OpenSpec)
- [OpenSpec npm package](https://www.npmjs.com/package/@fission-ai/openspec)
- [OpenSpec docs — How commands work](https://openspec.dev/docs/how-commands-work)
- [OpenSpec + Cursor setup guide](https://openspec.pro/cursor-openspec/)
- [Cursor Community — OpenSpec thread](https://forum.cursor.com/t/openspec-lightweight-portable-spec-driven-framework-for-ai-coding-assistants/134052)

---

## License

See the extension package in `openspec-sidebar/` for licensing details. OpenSpec itself is maintained by [Fission-AI](https://github.com/Fission-AI).
