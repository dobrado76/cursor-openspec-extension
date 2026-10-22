# AI-SUPPORT — OpenSpec Sidebar

This file is the self-contained support knowledge base for the **OpenSpec Sidebar** extension. It is generated from the files under `docs/`. Do not edit it by hand. Rebuild it with `npm run docs:build`.

| Item | Value |
| --- | --- |
| Extension version | 0.0.1 |
| Extension id | local.openspec-sidebar |
| Display name | OpenSpec Sidebar |
| Engine requirement | `^1.105.0` |
| Repository | https://github.com/dobrado76/cursor-openspec-extension |
| Issue tracker | https://github.com/dobrado76/cursor-openspec-extension/issues |

The extension version comes from `package.json`. There is no separate changelog of released behavior beyond the initial unreleased entry in `CHANGELOG.md`. OpenSpec CLI details that this knowledge base marks as verified were checked against CLI **1.5.0** on 22 October 2026. The npm package `@fission-ai/openspec` showed version **1.14.3** on that date. JSON shapes for 1.14.3 were not inspected. Do not assume every OpenSpec release matches 1.5.0.

## How to use this file

A person can read it directly, or download it and attach it to any AI assistant.

An AI assistant must follow **Instructions for AI Assistants** before answering.

### Links when this file is used alone

Links that start with `#` point at headings in this file. They are not paths on disk.

In the git repository the same topics also exist as separate files under `docs/`. Those repository links are rewritten to in-file headings when this bundle is built.

External products use absolute `https://` URLs. This file does not embed the OpenSpec manual.

If an answer depends on the user's Cursor version, OpenSpec version, workspace path, or generated command files, ask for those details. Do not invent them.

Repository for source evidence: https://github.com/dobrado76/cursor-openspec-extension

## Topic index

Headings below are the sections inside this file. Search for the heading text if a link does not scroll.

- [Symptom index](#symptom-index)
- [Instructions for AI Assistants](#instructions-for-ai-assistants)
  - Answering rules
  - Troubleshooting rules
  - External-tool rules
  - Project facts that are easy to get wrong
  - Version questions
- [Product](#product)
  - What problem it addresses
  - Who it is for
  - What the extension does itself
  - What it deliberately does not do
  - Design choices that affect use
  - Relationship to OpenSpec
- [Getting started](#getting-started)
  - Prerequisites
  - Install OpenSpec and initialize the project
  - Find the CLI file the panel must run
  - Configure the extension
  - Install the extension for daily use
  - Confirm the install
  - First workflow
  - Develop against a second window
- [User guide](#user-guide)
  - Open the panel
  - Where the view can sit
  - Proposals
  - Artifacts
  - New Proposal (Explore / Propose)
  - Workflow cards
    - Explore
    - Propose
    - Apply
    - Verify
    - Archive
  - Log
  - Chat, after a copy
  - Refresh
- [Configuration](#configuration)
  - openspec.nodePath
  - openspec.cliPath
  - Settings that do not exist
  - Workspace trust
  - What is stored, and where
  - Workspace folder versus settings
- [Reference](#reference)
  - Identity
  - Contribution points
  - Commands the extension executes
  - List results
  - Status results
  - Validate results
  - Archive results
  - Slash commands copied
  - Exact user-facing strings
  - Webview messages
  - UI limits that are not settings
  - Filesystem and network
  - Compatibility
- [Troubleshooting](#troubleshooting)
  - The list stays on Loading
  - Red banner starts with Command failed
  - Banner says Open a project folder first
  - No proposals yet, but you know changes exist
  - The activity-bar icon is gone
  - The view will not become an editor tab
  - Propose seems to do nothing in the project
  - Apply, Verify, or Archive hit the wrong change
  - Verify said it passed, or the log does not show the issues
  - Archive failed
  - Archive succeeded and you need it back
  - The copied slash command does nothing in chat
  - Extension is not compatible with Code
  - Two projects are open and the list is the wrong one
  - Clipboard lost other text
  - What to include if you open an issue
- [FAQ](#faq)
  - What the extension is
    - 1. What is OpenSpec Sidebar?
    - 2. What is OpenSpec Toolkit versus OpenSpec Sidebar?
    - 3. Does this extension replace OpenSpec?
    - 4. Who is it for?
    - 5. Is it on the VS Code Marketplace?
    - 6. What version does this guide cover?
    - 7. Which editors are supported?
    - 8. Does it work offline?
    - 9. Does the extension collect telemetry?
    - 10. Is there a license?
  - Install and first launch
    - 11. How do I install it?
    - 12. Why does F5 not install it into my normal window?
    - 13. Where is the icon?
    - 14. What do I install before the extension is useful?
    - 15. Does the extension run `openspec init`?
    - 16. How do I know install worked?
    - 17. The host says the extension requires ^1.105.0. What now?
    - 18. Can I install it on macOS or Linux?
    - 19. Do I have to reload after changing the two path settings?
    - 20. The package command failed because of a missing repository. What flag is used?
  - The proposals list
    - 21. What is a proposal in this panel?
    - 22. Where are the files?
    - 23. How do I select one?
    - 24. Why is one already selected when I open the panel?
    - 25. What do the badge words mean?
    - 26. What does the progress bar measure?
    - 27. Why is `lastModified` not shown?
    - 28. How do I refresh?
    - 29. Why does it say there are no proposals when I just created one?
    - 30. Can I sort or search the list?
    - 31. Can I list specs instead of changes?
    - 32. Will a multi-root workspace list every folder?
  - Artifacts
    - 33. What are the chips under Artifacts?
    - 34. Why might Artifacts be missing?
    - 35. What do done, ready, and blocked mean?
    - 36. There is CSS for `pending`. When does that appear?
    - 37. What is the sentence under the chips?
  - Explore, Propose, and Apply
    - 38. How do I explore an idea?
    - 39. How do I start a new change?
    - 40. What if Propose warns me to enter a description?
    - 41. Does Propose use the selected row?
    - 42. How do I implement a change?
    - 43. What if I click Apply with nothing selected?
    - 44. Can the extension type the command into the agent box?
    - 45. The toast says Ctrl+L. I use a Mac.
    - 46. Why does the agent ignore `/opsx:propose`?
    - 47. Does Apply wait until artifacts are done?
    - 48. Is the text box cleared after Propose?
  - Verify and Archive
    - 49. What does Verify do that Apply does not?
    - 50. How do I know Verify really passed?
    - 51. Verify said there were issues, but the log is only `Copied:`. Where are the issues?
    - 52. I clicked Verify and only saw a log line.
    - 53. Does a failed verify still copy the slash command?
    - 54. Is `/opsx:verify` always available in chat?
    - 55. How do I archive?
    - 56. What does archive change on disk?
    - 57. Can I undo Archive?
    - 58. I dismissed the archive dialog. Did anything happen?
    - 59. Archive failed with Command failed. Did it half-finish?
    - 60. Why was a different row selected after a successful archive?
    - 61. Can I archive without updating specs?
  - Settings and data
    - 62. What does `openspec.nodePath` do?
    - 63. What does `openspec.cliPath` do?
    - 64. What is the difference between leaving a path empty and setting it?
    - 65. Are the settings per project folder?
    - 66. Where is my selected proposal stored?
    - 67. Does the extension write logs to disk?
    - 68. Does Verify or Propose upload my prompt?
  - Layout commands
    - 69. What is OpenSpec: Show Sidebar?
    - 70. What is OpenSpec: Move to Left Sidebar?
    - 71. What is OpenSpec: Reset Sidebar (fix hidden icon)?
    - 72. Why can't I dock it like a file tab?
    - 73. I clicked Hide. Is the extension uninstalled?
  - Failures and limits
    - 74. Why does the banner say Command failed instead of "run openspec init"?
    - 75. The banner says Open a project folder first.
    - 76. The list never leaves Loading.
    - 77. Can a change name break the panel?
    - 78. Does the panel support OpenSpec stores?
    - 79. Does it support more than one OpenSpec profile?
    - 80. Will it pick up a new change without Refresh?
    - 81. Two refreshes finished out of order. Is that possible?
    - 82. The sample test passed. Is the panel verified?
    - 83. How do I report a bug?
    - 84. How do I remove the extension?
    - 85. The banner failed and the list still says to use Propose. Which line is right?
    - 86. I clicked a row and immediately clicked Apply, and the command used the other name.
    - 87. Why is there no Keyboard Shortcuts entry for Propose?
    - 88. The extension is installed but nothing activates in this folder.
    - 89. Does a failed list forget which proposal I had selected?
- [Architecture](#architecture)
  - Pieces
  - Lifecycle
  - Refresh sequence
  - Operation sequence
  - Process boundary
  - State
  - Security boundary
  - Tests
- [Development](#development)
  - Build
  - Debug
  - Lint
  - Tests
  - Documentation
  - Package layout
  - Publishing
- [Roadmap](#roadmap)
  - Implemented in 0.0.1
  - Known limitations of the current implementation
  - Not implemented, and not scheduled here

<!-- source: docs/symptom-index.md -->

# Symptom index

Use this list to jump from a symptom to the write-up. Heading links stay inside the support bundle. In the repository, the long form is [troubleshooting.md](#troubleshooting) unless another file is named.

| If you see or hit this | Start here |
| --- | --- |
| Proposals area stuck on `Loading...` | Troubleshooting: The list stays on Loading |
| Red banner `Command failed:` together with `No proposals yet` | Troubleshooting: Red banner starts with Command failed |
| Installed, but `OpenSpec Sidebar: activate` never appears | Troubleshooting: The list stays on Loading (Restricted Mode and engine) |
| Banner `Open a project folder first.` | Troubleshooting: Banner says Open a project folder first |
| `No proposals yet. Use Propose to create one.` | Troubleshooting: No proposals yet, but you know changes exist |
| Document icon missing from the activity bar | Troubleshooting: The activity-bar icon is gone |
| Toast `OpenSpec sidebar restored.` and other panels moved | Troubleshooting: The activity-bar icon is gone (reset side effects) |
| Cannot drop the view next to a source file | Troubleshooting: The view will not become an editor tab |
| `Enter a feature description for Propose.` | User guide: Propose |
| `Select a proposal from the list first.` | User guide: Apply |
| Log `Select a change to verify.` and no toast | User guide: Verify |
| `Verify passed for "..."` but you need the real report | Troubleshooting: Verify said it passed, or the log does not show the issues |
| `Verify found issues` and the log only says `Copied:` | Troubleshooting: Verify said it passed, or the log does not show the issues |
| Modal `Archive "..." and merge into main specs?` | User guide: Archive |
| `Archive failed:` | Troubleshooting: Archive failed |
| `"..." archived successfully.` and you need the files back | Troubleshooting: Archive succeeded and you need it back |
| Toast says copied, chat prompt is empty | User guide: Chat, after a copy |
| Agent does not recognize `/opsx:propose` | Troubleshooting: The copied slash command does nothing in chat |
| `Extension is not compatible with Code` | Troubleshooting: Extension is not compatible with Code |
| List shows a different folder than the one you edited | Troubleshooting: Two projects are open and the list is the wrong one |
| Clipboard no longer has what you copied earlier | Troubleshooting: Clipboard lost other text |
| Need `openspec.autoSubmitChat` or a chat-inject setting | Configuration: Settings that do not exist |
| Empty `openspec.nodePath` | Configuration: openspec.nodePath |

Questions that are not symptoms are in [FAQ.md](#faq).

<!-- source: docs/ai-instructions.md -->

# Instructions for AI Assistants

You are answering from this knowledge base about **OpenSpec Sidebar** (`local.openspec-sidebar`, version in the table at the top of this file). The product is a Cursor/VS Code side-bar extension. OpenSpec itself is a different project.

## Answering rules

- Use this document as the primary source for what the extension does.
- Prefer the documented behavior over habits from other extensions or from generic OpenSpec tutorials.
- Use the exact labels, command ids, setting keys, and toast strings in the Reference.
- Do not invent menus, settings, buttons, or CLI flags. If it is not in this document, say it is not part of version 0.0.1.
- Distinguish implemented behavior from the known limitations and from items that are not scheduled.
- If this document and the source code disagree, the source code and any real tests win. Say so, and do not paper over the conflict.
- If the document does not establish an answer, say that. Do not guess a fix.
- If you also have the repository, you may read `src/extension.ts`, `src/openspecCli.ts`, `src/panelHtml.ts`, `src/cursorChat.ts`, and `package.json` before claiming something this file marks as unverified.
- Never present an assumption as verified behavior.

## Troubleshooting rules

1. Name the piece involved: webview, clipboard, `openspec list`, `status`, `validate`, `archive`, settings, or the editor's view layout.
2. Use the symptom index and the Troubleshooting section before changing settings.
3. Check `openspec.nodePath`, `openspec.cliPath`, and the open folder before suggesting reinstalls.
4. Separate extension bugs from OpenSpec CLI failures and from Cursor chat behavior.
5. Prefer a terminal `openspec list --json` or `openspec validate` over deleting directories.
6. Say what the check should print or show.
7. Do not suggest speculative flags (`--skip-specs`, `--store`, a profile change) as if the extension had a switch for them.
8. **OpenSpec: Reset Sidebar (fix hidden icon)** resets the whole window's view layout. Warn about that. It does not delete `openspec/`.
9. Archive cannot be undone by the extension. Do not suggest Archive as a cleanup step for a confused user.
10. Ask only for the editor version, extension version, OS, redacted banner text, and `openspec --version` unless the diagnosis is still blocked.
11. For a defect that this document does not already explain, point at https://github.com/dobrado76/cursor-openspec-extension/issues and the minimum report list in Troubleshooting. Do not promise a reply.

## External-tool rules

- This document is authoritative about the extension, not about OpenSpec, Cursor chat, or VS Code view layout internals.
- Do not say the extension implements spec authoring, validation rules, or archive file layout. It shells out or copies a slash command.
- The extension always copies colon commands (`/opsx:propose`). OpenSpec may have generated hyphen commands (`/opsx-propose`) in the user's project. Say both facts. Do not invent a third spelling.
- Do not invent OpenSpec install steps beyond the link https://openspec.dev/docs and the npm package https://www.npmjs.com/package/@fission-ai/openspec. Repository: https://github.com/Fission-AI/OpenSpec. Issues: https://github.com/Fission-AI/OpenSpec/issues.
- CLI JSON and help text in this document were checked for OpenSpec **1.5.0** on 22 October 2026. npm showed **1.14.3** the same day and that version's JSON was not inspected. If the user has another version, say the extension's parser is unchanged and the CLI shape may differ. Ask them to run the terminal command.
- If a failure is inside OpenSpec after a correct node path and script path, send the user to OpenSpec's docs rather than inventing OpenSpec internals.
- If you cannot tell which side failed, say what to compare: the panel banner versus `openspec list --json` in the same folder.

## Project facts that are easy to get wrong

- Daily use is an installed `.vsix` (`local.openspec-sidebar`). **F5** / **Run Extension** opens a second window and does not pass a folder path. That window may be empty or may restore its previous folder.
- Empty `openspec.nodePath` means `process.execPath` with the inherited environment. Empty `openspec.cliPath` means the hardcoded `C:\nvm4w\nodejs\node_modules\@fission-ai\openspec\bin\openspec.js`. Neither is auto-detected. Do not claim the empty node path was observed to fail or to succeed inside the extension host. Tell the user to set a Node binary that already runs `openspec --version`.
- The panel uses only the first workspace folder and never `--store`.
- Propose, Explore, and Apply do not run OpenSpec. They copy text. The user pastes into chat. The toast says `Ctrl+L` even on macOS, and that shortcut does not paste.
- Verify runs the CLI and then overwrites the log with `Copied:`. Archive runs the CLI with `-y` after a modal. Archive does not copy a slash command.
- A non-zero CLI exit becomes `Command failed:` plus any stderr. Stdout is dropped. The sentence `No OpenSpec changes directory found. Run 'openspec init' first.` is a CLI 1.5.0 stdout message, not the banner text. The page still shows `No proposals yet. Use Propose to create one.` under a failure banner.
- Selection is memory-only and updates only after `updateState`. A row click is not the selection until that reply. The first row is auto-selected. Dimmed workflow cards still click. There is no contributed keybinding, status-bar item, or trust declaration. Restricted Mode can disable the extension under VS Code's default for extensions that omit `capabilities.untrustedWorkspaces`.
- Reset view locations is window-wide. There is no undo for Archive in this extension.
- There is no `openspec.autoSubmitChat`, no chat-injection command, and no license file.
- The sample unit test does not cover the product.

## Version questions

If the answer depends on the user's editor build or OpenSpec version, ask for `openspec --version` and the editor version before claiming a JSON field or a slash-command spelling. Do not assume 1.5.0 when they might have another release, and do not assume the extension grew features after 0.0.1 unless this document's version table says so.

<!-- source: docs/product.md -->

# Product

OpenSpec Sidebar is a Cursor and VS Code extension. It adds one side-bar view, **OpenSpec Toolkit**, that lists active [OpenSpec](https://github.com/Fission-AI/OpenSpec) changes and offers five workflow actions: Explore, Propose, Apply, Verify, and Archive.

The extension id is `local.openspec-sidebar`. The display name is **OpenSpec Sidebar**. The view title is **OpenSpec Toolkit**. Version **0.0.1** declares `engines.vscode` of `^1.105.0`.

## What problem it addresses

OpenSpec keeps a change in a folder under `openspec/changes/` and expects the user to drive the AI assistant with slash commands. This extension does not replace that workflow. It shows the active changes in the editor and copies the slash command, or runs two specific CLI commands, so the user does not have to remember the change name.

## Who it is for

It is for someone who already uses, or is setting up, OpenSpec in a project opened in Cursor or VS Code. It is not a general project manager, a spec editor, or an AI chat client.

## What the extension does itself

- Registers an activity-bar container and a webview.
- Runs the OpenSpec CLI in the first workspace folder for `list`, `status`, `validate`, and `archive`.
- Renders the CLI's change list, task counts, artifact chips, and next-step text.
- Copies `/opsx:explore`, `/opsx:propose`, `/opsx:apply`, or `/opsx:verify` to the clipboard.
- Asks for confirmation, then runs `openspec archive` for the selected change.

## What it deliberately does not do

- It does not run `openspec init`, `openspec update`, or `openspec config`.
- It does not create, edit, or delete proposal Markdown itself. Propose and Apply only copy a slash command. The AI assistant and the OpenSpec instructions in the project do the writing.
- It does not open Cursor chat, type into the prompt, or submit a message.
- It does not pass `--store`. OpenSpec stores are outside this UI.
- It does not choose an OpenSpec profile. `/opsx:verify` is copied even when the project's profile has not enabled that command.
- It does not watch the filesystem. The list updates when the view loads, becomes visible, the user clicks Refresh, the user selects a row, or an archive started from this panel succeeds.
- It does not remember the selected change or the text box after the extension host restarts.
- It does not ship a license file, a marketplace publisher, or a publish script. Distribution intended by the repository is a local `.vsix`.

## Design choices that affect use

Clipboard instead of chat injection is intentional. Cursor does not provide a stable public API that fills the agent prompt. Earlier experiments opened empty chats. The panel now only copies text.

Archive is the only destructive action the extension starts. It shows a modal first, then passes `-y` so the CLI does not ask again. The extension does not make a backup and cannot undo the archive.

The two path settings look optional. Empty `openspec.nodePath` uses `process.execPath` with the inherited environment. That is not a search for `node` on `PATH`, and this repository did not prove what that process does with `openspec.js`. Empty `openspec.cliPath` uses a hardcoded Windows nvm4w path. Set both to a known-good Node binary and `openspec.js`. See [configuration.md](#configuration).

There is no status-bar item, no editor title menu, no contributed keybinding, and no walkthrough. Ctrl+Enter works only inside the proposal text area. The extension does not declare workspace-trust support, so Restricted Mode can leave it disabled. See [configuration.md](#configuration).

## Relationship to OpenSpec

OpenSpec is a separate project: https://github.com/Fission-AI/OpenSpec and https://www.npmjs.com/package/@fission-ai/openspec. Its documentation index is https://openspec.dev/docs.

This extension shells out to that CLI and copies slash-command strings. Spec format, slash-command behavior, profiles, stores, validation rules, and archive file layout belong to OpenSpec. This guide only describes how the sidebar invokes and displays them.

<!-- source: docs/getting-started.md -->

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

Select Cursor when the CLI asks which tools to configure. `openspec init` writes the project's agent commands. This extension does not read those files. It always copies the colon form (`/opsx:propose`). Current OpenSpec docs say Cursor's generated spelling is often the hyphen form (`/opsx-propose`). If chat does not recognize the copied command, use the spelling `openspec init` printed for your project. Details are in [user-guide.md](#user-guide).

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

Use your real paths. Empty values are not auto-detected. See [configuration.md](#configuration). The new values apply on the next Refresh. A window reload is not required for these two settings.

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
- Folder not initialized, or the CLI failed: a red banner and, underneath it, the same `No proposals yet` sentence. Read the banner, not the sentence. If the banner starts with `Command failed:`, stdout from OpenSpec was not copied. Extra lines under `Command failed:` are stderr. Run `openspec list --json` in that folder to read the JSON message. See [troubleshooting.md](#troubleshooting).

## First workflow

1. Click a proposal row so the banner says `Selected: <name>`.
2. Click **Apply**.
3. The toast is `Apply copied to clipboard — paste in chat with Ctrl+L.`
4. Focus chat (`Ctrl+L` or `Cmd+L`). Paste with `Ctrl+V` or `Cmd+V`. Submit the message yourself.

The extension never submits chat. **Propose** needs text in **New Proposal (Explore / Propose)** first. **Archive** opens a modal and then runs the CLI.

## Develop against a second window

Press **F5** in this repository and choose **Run Extension**. That starts the background **npm: watch** task and opens an Extension Development Host. The launch configuration does not pass a project path. Use File → Open Folder inside the host window if it is empty or if it restored a different folder, then open **OpenSpec Toolkit**. The extension in that window is the source tree, not the installed `.vsix`. See [development.md](#development).

<!-- source: docs/user-guide.md -->

# User guide

The only screen is the **OpenSpec Toolkit** webview. Cursor also draws a view title, usually shown as **OPENSPEC TOOLKIT**. The webview does not repeat that title.

## Open the panel

Any of these works:

- Click the document icon on the activity bar. The container title is **OpenSpec Toolkit**.
- Command Palette → **OpenSpec: Show Sidebar**.
- If you hid the icon: right-click the activity bar and enable **OpenSpec Toolkit**, or run **OpenSpec: Reset Sidebar (fix hidden icon)**.

The icon is a document with two text lines (`media/icon.svg`). It is not the Explorer icon.

**OpenSpec: Show Sidebar** runs `workbench.views.openView` for `openspec.sidebarView`. If that call throws, it focuses the container `openspec-sidebar-container` and then runs `openspec.sidebarView.focus`.

## Where the view can sit

This is a view, not an editor tab. It can be dragged by the view title to the primary side bar, the secondary side bar, or the panel (the area that holds Terminal). It cannot be dropped beside file tabs.

Drag the title **OPENSPEC TOOLKIT**, not the text inside the webview.

When the view leaves the primary side bar, the activity-bar icon can disappear. **OpenSpec: Move to Left Sidebar** focuses the view and runs `workbench.action.moveFocusedViewToSideBar`. If that command throws, the extension falls through to **OpenSpec: Reset Sidebar (fix hidden icon)**.

**OpenSpec: Reset Sidebar (fix hidden icon)** runs `workbench.action.resetViewLocations` for the whole window, then shows this view, then the toast `OpenSpec sidebar restored.` Other views you had moved, including Terminal, can return to their default places. It does not delete files or OpenSpec changes. Use it when the icon or the view is actually lost, not as a refresh.

## Proposals

Section titles in the webview are uppercase in the stylesheet (`PROPOSALS`, `ARTIFACTS`, `NEW PROPOSAL (EXPLORE / PROPOSE)`, `WORKFLOW`). The HTML text is title case. The workbench's own view header uses the contributed name **OpenSpec Toolkit**. Themes often draw that header in uppercase. That header is not a second copy drawn by the webview.

The heading is **Proposals**. Beside it is **Refresh** (↻). The hint under the heading reads:

> Each row is an active OpenSpec change (proposal). Click one to select it — Apply, Verify, and Archive use the selection.

Before the first reply from the extension, the list body is `Loading...`.

Each row shows:

- The change name (`name` from `openspec list --json`).
- A badge with the CLI `status` string. CSS uppercases it. For OpenSpec CLI 1.5.0 the values are `complete`, `in-progress`, and `no-tasks`. Only `complete` is green. The others use the blue badge.
- A progress bar. Width is `completedTasks / totalTasks`, rounded to a percentage. If `totalTasks` is 0, the width is 0.
- The line `<completed>/<total> implementation tasks`.

`lastModified` is returned by CLI 1.5.0 and is not shown.

The list area scrolls after about 140 pixels. The extension does not sort. CLI 1.5.0's default `list` sort is `recent`, newest `lastModified` first. Other CLI versions were not checked.

Click a row to select it. The selected row uses the active-list background. A banner appears:

> Selected: **name** — Apply / Verify / Archive target this proposal

If the list is empty, the text is always `No proposals yet. Use Propose to create one.` and the selected-row banner is hidden. That sentence is not proof of a successful empty list. A red banner above it means `list` failed or there is no folder. No red banner and that sentence means the CLI exited 0 with no rows.

If nothing is selected yet and the list is non-empty, the extension selects `changes[0]` by itself. On CLI 1.5.0 that is the most recently modified change, not a pinned favorite.

Clicking a row does not update the page's selection immediately. The page sends `selectChange` and waits for `updateState` before it highlights the row or changes `Selected:`. Apply, Verify, Archive, and Explore (when the text box is empty) send the selection from the last paint, and the host uses that name when it is non-empty. A click on a new row followed immediately by Apply can still copy the previous name. Wait until `Selected:` shows the row you want.

Selection lives in memory. Reloading the window clears it, and the next successful list selects the first row again. A selection is not cleared just because that name disappeared from the list, except after an archive that this panel started and the CLI accepted. A stale name can still be sent to Apply. A failed list does not clear it either.

Apply, Verify, and Archive are drawn at 45% opacity when `selectedChange` is null. They are still clickable. Opacity follows the selected name, not whether that name is still in the list. An empty list with a leftover selection keeps the cards fully opaque, while the selected banner stays hidden.

## Artifacts

**Artifacts** appears only when `openspec status` returns data for the selection. Each chip is `<id>: <status>`.

On OpenSpec CLI 1.5.0 the status strings are `done`, `ready`, and `blocked`. The panel colors `done` green and `ready` blue. `blocked` uses the default chip color. The stylesheet also colors `pending`, but CLI 1.5.0's status command does not emit `pending`.

Under the chips, `nextSteps` from the CLI are joined with spaces into one line. The panel does not show `isComplete`, `applyRequires`, or file paths, even though it receives them.

If status fails, the section is hidden. The proposal list can still be visible. There is no separate status error toast.

## New Proposal (Explore / Propose)

The text area placeholder is `Describe a feature, e.g. add dark mode toggle...`.

- Enter inserts a newline.
- Ctrl+Enter, or Cmd+Enter, runs **Propose**. This is not a Keyboard Shortcuts entry. `package.json` contributes no keybindings. The handler does not cancel the key, so the webview may also insert a newline.
- Only leading and trailing whitespace is removed. Line breaks inside the box stay in the copied command.
- Explore and Propose use this text. Apply, Verify, and Archive ignore it.
- The copied command does not add quotes around the description or the change name.

The extension does not write this text to a file. It copies it only as part of a slash command.

## Workflow cards

| Card | Glyph | Subtitle in the panel | Needs a selection? | Needs text? | What version 0.0.1 actually does |
| --- | --- | --- | --- | --- | --- |
| Explore | magnifying glass | Research & ideation before committing | No | No | Copies a slash command |
| Propose | memo | Create proposal, design & tasks | No | Yes | Copies a slash command |
| Apply | play triangle | Implement tasks for selected proposal | Yes, in practice | No | Copies a slash command |
| Verify | check mark | Validate specs & run QA checks | Yes | No | Runs `openspec validate`, then copies a slash command |
| Archive | package | Close out change & merge into main specs | Yes | No | Modal, then `openspec archive` |

The strings `Research & Ideation`, `Requirement Definition`, `Source Code Generation`, and `Quality Assurance` exist only in source code. They are not shown.

### Explore

Copied text, after trim:

- Text box non-empty: `/opsx:explore` plus that text. The selected name is ignored.
- Text box empty and a change is selected: `/opsx:explore` plus the change name.
- Neither: `/opsx:explore`.

Toast: `Explore copied to clipboard — paste in chat with Ctrl+L.`

The log becomes `Copied: /opsx:explore ...` and replaces any older log.

### Propose

If the trimmed text is empty, nothing is copied. The log is `Enter a feature description in the input box first.` and a warning toast says `Enter a feature description for Propose.`

Otherwise the clipboard receives `/opsx:propose` plus the text. The selected change is not included. Toast: `Propose copied to clipboard — paste in chat with Ctrl+L.`

This does not create `openspec/changes/<name>/`. The assistant does that after you paste the command, and only if OpenSpec's instructions are in the project.

### Apply

The change is the row you selected, or the auto-selected first row. If none is selected, the log and a warning both say `Select a proposal from the list first.` Nothing is copied.

Otherwise the clipboard receives `/opsx:apply <name>`. The unimplemented form `/opsx:apply` with no name is not used, because the empty selection returns first. Toast: `Apply copied to clipboard — paste in chat with Ctrl+L.`

### Verify

If no change is selected, the only feedback is the log line `Select a change to verify.` There is no warning toast. This differs from Apply.

If a change is selected:

1. The log briefly says `Validating "<name>"...`.
2. The extension runs `validate "<name>" --json --no-interactive`.
3. The log is replaced by the raw stdout, or by the Node error message if the process exits non-zero.
4. Exit 0 and JSON that does not set `valid` to false and does not have a non-empty `errors` array: toast `Verify passed for "<name>".` OpenSpec CLI 1.5.0's success JSON has neither `valid` nor `errors` at the top level, so exit 0 is reported as passed. The real flag in that JSON is `items[0].valid`, which this extension does not read.
5. Non-zero exit, or JSON the extension treats as failed: toast `Verify found issues for "<name>". See log in sidebar.`
6. The extension then always copies `/opsx:verify <name>` and shows `Verify copied to clipboard — paste in chat with Ctrl+L. CLI results are in the log below.`
7. That copy replaces the log with `Copied: /opsx:verify <name>`. The CLI output is gone.

So a successful-looking pair of toasts does not mean the issue list is still on screen. For the CLI's own report, run `openspec validate "<name>"` in a terminal.

Verify does not refuse to copy the slash command when validation fails.

### Archive

If no change is selected, a warning says `Select a change to archive.` There is no log line.

Otherwise a modal warning asks `Archive "<name>" and merge into main specs?` with the button **Archive**. Dismissing the dialog does nothing else: no log, no CLI call.

**Archive** runs `archive "<name>" -y --json`. The extension's modal is the only confirmation. `-y` tells the CLI to skip its own prompts. The extension does not pass `--skip-specs` or `--no-validate`.

The log says `Archiving "<name>"...` and is then replaced by stdout, or by `Command failed: ...` when the exit code is non-zero.

- Exit 0: toast `"<name>" archived successfully.` The selection is cleared and the list is reloaded. The extension does not inspect the JSON body. It does not move files itself. What "archive" does to `openspec/` is defined by OpenSpec (`openspec archive --help` says "Archive a completed change and update main specs").
- Non-zero: toast `Archive failed: ` plus the Node error message. The selection stays.

There is no undo command. Restore from git or from your own copy. This extension did not snapshot the folder.

## Log

The log is hidden until the first message. It then stays visible, monospace, and about 100 pixels tall, scrolling inside the box. Each new message replaces the previous one. It is not a history.

## Chat, after a copy

1. The toast names `Ctrl+L` on every operating system. On macOS, Cursor's chat shortcut is often `Cmd+L`. The toast does not change.
2. `Ctrl+L` / `Cmd+L` focuses chat. It does not paste.
3. Paste with `Ctrl+V` / `Cmd+V`, then submit.

The copied command always uses a colon: `/opsx:explore`, `/opsx:propose`, `/opsx:apply`, `/opsx:verify`. OpenSpec's current docs say the canonical name uses a colon, and that Cursor projects often generate the hyphen form (`/opsx-propose` and similar). This panel does not look at `.cursor/` to see which form your project has. If the agent does not recognize the command, paste the form `openspec init` created, or run `openspec update` in the project (that refresh is OpenSpec's, not a button here).

`/opsx:verify` is not part of every OpenSpec profile. The panel still copies it. Whether the assistant has that command is decided by OpenSpec's profile and the generated files.

Archive does not copy `/opsx:archive`.

## Refresh

**Refresh** runs `list` again and, if a change is selected, `status` again. It also runs automatically when the webview sends `ready`, when the view becomes visible, when you select a row, and after an archive this panel considers successful.

It does not run on a timer or when files change. Click **Refresh** after you create a change in chat.

Overlapping refreshes are not cancelled. A slow older call can paint the list after a newer one.

<!-- source: docs/configuration.md -->

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

<!-- source: docs/reference.md -->

# Reference

Behavior below is what version 0.0.1 implements. OpenSpec CLI notes marked "verified" were checked on 22 October 2026 against CLI 1.5.0. They are not a guarantee for `@fission-ai/openspec` 1.14.3 or any other release.

## Identity

| Field | Value |
| --- | --- |
| `name` | `openspec-sidebar` |
| `publisher` | `local` |
| Extension id | `local.openspec-sidebar` |
| `displayName` | OpenSpec Sidebar |
| `description` | OpenSpec Sidebar extension for Cursor AI |
| `version` | 0.0.1 |
| `engines.vscode` | `^1.105.0` |
| `categories` | `Other` |
| `activationEvents` | `onStartupFinished` |
| `main` | `./out/extension.js` |
| License file | none in this repository |

Activation on startup only registers the view and three commands. The CLI is not started until the webview loads or becomes visible.

The host console line on activation is exactly:

```text
OpenSpec Sidebar: activate
```

There is no `resolveWebviewView` log line in this version.

## Contribution points

| Kind | Id | User-facing title |
| --- | --- | --- |
| Activity bar container | `openspec-sidebar-container` | OpenSpec Toolkit |
| View | `openspec.sidebarView` | OpenSpec Toolkit |
| Command | `openspec.showSidebar` | OpenSpec: Show Sidebar |
| Command | `openspec.resetSidebar` | OpenSpec: Reset Sidebar (fix hidden icon) |
| Command | `openspec.moveToSidebar` | OpenSpec: Move to Left Sidebar |

The view type is `webview`. Category on each command is `OpenSpec`.

## Commands the extension executes

Working directory: `vscode.workspace.workspaceFolders[0].uri.fsPath`.

If there is no folder, list fails with exactly `Open a project folder first.` That string is thrown inside the extension. It is not an OpenSpec message.

Program:

```text
"<openspec.nodePath or process.execPath>" "<openspec.cliPath or the hardcoded Windows path>" <arguments>
```

The hardcoded CLI path is:

```text
C:\nvm4w\nodejs\node_modules\@fission-ai\openspec\bin\openspec.js
```

`child_process.exec` is used, so Windows runs the line through `cmd.exe`. The call does not pass a custom `env`. `maxBuffer` is 10 × 1024 × 1024 bytes. There is no timeout and no `CancellationToken` handling. The extension never reads `error.stdout`. On a non-zero exit it shows `error.message` only. Node puts the child's stderr into that message and does not put stdout there. A local check of Node's `exec` showed `Command failed: ...` followed by the stderr text. Stdout is dropped either way. If stdout exceeds the buffer, the failure message is Node's maxBuffer error rather than OpenSpec JSON.

| Action | Arguments appended |
| --- | --- |
| List | `list --json` |
| Status | `status --change "<name>" --json` |
| Validate | `validate "<name>" --json --no-interactive` |
| Archive | `archive "<name>" -y --json` |

The name is wrapped in double quotes and not otherwise escaped. The extension never adds `--store`, `--sort`, `--strict`, `--skip-specs`, or `--no-validate`.

Those four argument forms match `openspec <command> --help` on CLI 1.5.0. Help text for archive on that version is "Archive a completed change and update main specs". `-y, --yes` is "Skip confirmation prompts". `--json` on archive is "Output as JSON (non-interactive)".

## List results

The extension parses stdout as JSON only after exit code 0.

- If `status` is an array containing an object with `severity === "error"`, the panel shows that object's `message`, shows no rows, and does not use `changes`. This branch does not run when the process exits non-zero.
- Otherwise rows are `data.changes`, or `[]` if that property is missing. If `changes` is missing, the page treats the list as empty.
- If exit code is 0 but stdout is not JSON, `JSON.parse` throws. The banner is that exception's message, not `Command failed:`.
- If `status` exists but has no `.find` (it is not an array), the same catch runs and the banner is the exception message.
- Non-zero exit: the banner is Node's message, typically `Command failed:` plus the command line. Stderr text, when the CLI wrote any, is on the following lines. Stdout is not copied into the banner.

Whenever `changes` is empty, including these failures, the page also draws `No proposals yet. Use Propose to create one.` The red banner is the part that says the CLI failed. The empty sentence does not mean the project is initialized. The selected-row banner is hidden in that paint because the row list is empty. A previously selected name can still sit in memory, so Apply can still target it and the workflow cards can stay fully opaque.

Verified on CLI 1.5.0 in a folder with no `openspec/changes` directory: the process exits 1, stdout is JSON, and the message inside that JSON is `No OpenSpec changes directory found. Run 'openspec init' first.` The panel does not display that sentence. It displays `Command failed:`.

Verified from CLI 1.5.0 source: when the changes directory exists and has no active change directories, `list --json` exits 0 and prints `{"changes":[]}` (plus `root` in some cases). The panel then shows `No proposals yet. Use Propose to create one.` and no banner. The CLI skips a directory named `archive`.

Verified change object on CLI 1.5.0:

| Field | Use in the panel |
| --- | --- |
| `name` | Row title and selection id |
| `completedTasks` | Progress and the task line |
| `totalTasks` | Progress and the task line. `0` forces a 0% bar. |
| `lastModified` | Ignored |
| `status` | Badge text. `complete` is green. Any other string, including `in-progress` and `no-tasks`, is blue. |

`status` on that CLI is `no-tasks` when `totalTasks === 0`, `complete` when completed equals total and total is not 0, otherwise `in-progress`.

## Status results

Exit 0: the panel reads `changeName`, `isComplete`, `artifacts`, `nextSteps`, `applyRequires`, and `artifactPaths`. Only `artifacts` and `nextSteps` are rendered. Any exception, including a non-zero exit, becomes a hidden Artifacts section (`null`). The list error banner is not set from status failures.

CLI 1.5.0 artifact objects use `status` of `done`, `ready`, or `blocked`. Chip colors exist for `done`, `ready`, and `pending`. `blocked` is unstyled beyond the default chip. `missingDeps` is not shown.

## Validate results

```text
ok = data.valid !== false && !(data.errors && data.errors.length)
```

If `valid` is absent and `errors` is absent, `ok` is true. That is the CLI 1.5.0 success shape. That CLI reports validity in `items[0].valid` and `summary.totals`, which the extension ignores.

CLI 1.5.0 sets a non-zero exit when a change is invalid. The extension then never parses the JSON. `ok` is false and `output` is `Command failed: ...`, not the issue list that was on stdout.

Unknown-item JSON on that CLI (`status[].code` of `unknown_item`) also exits non-zero, so the panel does not show `Unknown item`.

After either outcome the extension still copies `/opsx:verify <name>` when a name was selected.

## Archive results

Exit 0 is success even if the JSON body is unexpected. The toast is `"<name>" archived successfully.` Selection is cleared and list runs again.

Any thrown exec error is failure. The toast is `Archive failed: ` plus `error.message`.

Canceling the modal does not call the CLI. The button label that confirms is exactly `Archive`.

## Slash commands copied

| Operation | Clipboard |
| --- | --- |
| Explore with text | `/opsx:explore <trimmed text>` |
| Explore without text, with selection | `/opsx:explore <name>` |
| Explore with neither | `/opsx:explore` |
| Propose | `/opsx:propose <trimmed text>` |
| Apply | `/opsx:apply <name>` |
| Verify | `/opsx:verify <name>` |
| Archive | nothing |

Toast pattern, except where a more specific warning applies:

```text
<label> copied to clipboard — paste in chat with Ctrl+L.
```

Verify adds a space and `CLI results are in the log below.`

Log line after a copy:

```text
Copied: <command>
```

## Exact user-facing strings

| Situation | Surface | Exact text |
| --- | --- | --- |
| Propose with empty text | Log | `Enter a feature description in the input box first.` |
| Propose with empty text | Warning | `Enter a feature description for Propose.` |
| Apply with no selection | Log and warning | `Select a proposal from the list first.` |
| Verify with no selection | Log only | `Select a change to verify.` |
| Verify CLI accepted | Information | `Verify passed for "<name>".` |
| Verify CLI rejected or JSON treated as failed | Warning | `Verify found issues for "<name>". See log in sidebar.` |
| Archive with no selection | Warning | `Select a change to archive.` |
| Archive confirm | Modal warning | `Archive "<name>" and merge into main specs?` |
| Archive confirm button | Modal | `Archive` |
| Archive process accepted | Information | `"<name>" archived successfully.` |
| Archive process failed | Error | `Archive failed: <message>` |
| Reset command finished | Information | `OpenSpec sidebar restored.` |
| Empty list, CLI exit 0 | Webview | `No proposals yet. Use Propose to create one.` and no red banner |
| List failure or no folder | Webview | Red banner, and the same empty sentence underneath |
| Before first update | Webview | `Loading...` |
| List error | Red banner | The `error` string, often `Command failed: ...` or `Open a project folder first.` |

Host compatibility text such as `Extension is not compatible with Code ... Extension requires: ^1.105.0` is produced by Cursor or VS Code, not by this extension's source.

## Webview messages

From the page to the extension:

| `command` | Other fields | Effect |
| --- | --- | --- |
| `ready` | | Same as refresh |
| `refresh` | | List, then status for the selection |
| `selectChange` | `change` | Stores the name, then refresh |
| `runOperation` | `op`, `text`, `change` | Explore, propose, apply, verify, or archive |

From the extension to the page:

| `command` | Payload |
| --- | --- |
| `updateState` | `data.changes`, `data.selectedChange`, `data.status`, `data.error` |
| `log` | `text` replaces the log and makes it visible |

`toast` is ignored by the page. The extension does not send it. Notifications use `vscode.window.showInformationMessage`, `showWarningMessage`, and `showErrorMessage`.

## UI limits that are not settings

| Item | Value |
| --- | --- |
| Proposal list max height | 140px, then scroll |
| Log max height | 100px, then scroll |
| Text area minimum height | 56px, user-resizable vertically |
| Script nonce | 32 characters from `Math.random`, not a cryptographic generator |
| Content security policy | `default-src 'none'`; styles from the webview source and inline styles; script only with the nonce |

The page does not load remote images, fonts, or scripts.

## Filesystem and network

The extension process does not read or write `openspec/` itself. `openspec archive` may, because that is what the CLI does. Explore, Propose, and Apply do not spawn the CLI.

No network call is implemented in this repository. A CLI you point at might perform network calls of its own. That is outside this extension.

## Compatibility

| Topic | Fact |
| --- | --- |
| Editor | Cursor or VS Code engine `^1.105.0` as declared. Not tested here against a version matrix. |
| Operating system | The fallback CLI path is Windows-only. Empty `openspec.nodePath` uses `process.execPath` on every OS and was not live-tested in the extension host. |
| Workspace | First folder only. |
| OpenSpec profile and command spelling | Not detected. |
| OpenSpec stores | `--store` is never passed. |

<!-- source: docs/troubleshooting.md -->

# Troubleshooting

Start with the least destructive check. Do not run **OpenSpec: Reset Sidebar (fix hidden icon)** until a view is actually lost. That command resets layout for the whole window. It does not delete project files, but it moves panels you had arranged.

Do not delete `openspec/`, `node_modules`, or User settings as a first step.

When a banner or toast includes a full path, redact the username and any secret before you paste it into a public issue.

## The list stays on Loading

**Symptom.** The proposals area still says `Loading...` and never shows rows or the empty-state sentence.

**Possible causes.** The webview script did not start, or the extension host has not answered `ready`. A hung CLI can also leave the first paint unchanged, because nothing is rendered until `list` finishes. There is no timeout.

**Checks.**

1. Command Palette → **OpenSpec: Show Sidebar**. You should get the same view, not a new kind of panel.
2. View → Output, and choose the extension host log, or **Help → Toggle Developer Tools**. Look for `OpenSpec Sidebar: activate`. This version does not log `resolveWebviewView`.
3. In a terminal, with the paths from Settings, run the same program the panel uses:

```bash
"C:\path\to\node.exe" "C:\path\to\openspec.js" list --json
```

If that command never returns, the panel will not either. Fix or remove the stuck CLI first. The extension cannot cancel it.

**Resolution.** Reload the window after the CLI returns normally. If `activate` never appears, the extension is not running: confirm **OpenSpec Sidebar** is enabled, that the host is not older than engine 1.105.0, and that the folder is not stuck in Restricted Mode. This extension does not declare `capabilities.untrustedWorkspaces`. VS Code disables that class of extension until the workspace is trusted. Trust the folder, or choose **Manage** on the Restricted Mode banner and enable the extension if the editor offers that.

**Expected result.** Rows, or `No proposals yet. Use Propose to create one.` with no red banner. A red banner can appear together with that same sentence. The sentence alone is not the success state.

## Red banner starts with Command failed

**Symptom.** A red banner shows `Command failed:` and a command line that includes `list --json`. The proposals area also says `No proposals yet. Use Propose to create one.` Both are on screen. The empty sentence does not mean OpenSpec initialized successfully.

**Possible causes.**

1. `openspec.nodePath` is empty, so the program is `process.execPath`, or the value points at a program that cannot run the script. This repository did not record a live extension-host result for the empty default. Compare the program in the banner with a `node` that can run `openspec --version`.
2. `openspec.cliPath` is empty on a machine that does not have the hardcoded nvm4w file, or the setting points at a wrapper (`openspec.cmd`, `openspec.ps1`) instead of `openspec.js`.
3. The OpenSpec process exited non-zero. The usual uninitialized-project case does this. CLI 1.5.0 prints `No OpenSpec changes directory found. Run 'openspec init' first.` on stdout and exits 1. The panel does not copy stdout into the banner. If the CLI wrote stderr, that text is included under `Command failed:` because Node puts stderr in `error.message`. The init sentence from CLI 1.5.0 was on stdout, so it was not in the banner.

**Checks.**

1. Settings → **OpenSpec**. Both paths should be filled. See [configuration.md](#configuration).
2. Run `openspec list --json` in the first workspace folder, in a normal terminal. Read the JSON `message`. That is the text the panel dropped.
3. Confirm the folder you opened is the project you initialized. The panel ignores every root except the first.

**Resolution.** Set the two paths and click **Refresh**. If the terminal says to run `openspec init`, do that in the project, using OpenSpec's docs at https://openspec.dev/docs. This extension has no Init button.

**Expected result.** Either proposal rows, or the empty-state sentence with no banner.

## Banner says Open a project folder first

**Symptom.** The banner is exactly `Open a project folder first.`

**Cause.** The window has no workspace folder. **F5** / **Run Extension** does not pass a folder path. The host window can open empty, or it can restore whatever folder that debug window had open last time. It does not automatically switch to the project you were editing in the other window.

**Resolution.** File → Open Folder, then click **Refresh**. There is no folder listener. Refresh is required if the view was already open.

**Expected result.** The banner is replaced by a list, the empty state, or a different error.

## No proposals yet, but you know changes exist

**Symptom.** The list says `No proposals yet. Use Propose to create one.` and there is no red banner.

**Possible causes.**

- The CLI exited 0 with an empty `changes` array. On CLI 1.5.0 that means the changes directory exists and every entry is missing or is the `archive` directory.
- You are looking at a different folder than the terminal you used.
- The change was created after the last refresh.
- The change lives in an OpenSpec store. This extension never passes `--store`.

**Checks.** In the first workspace folder, run `openspec list --json` and compare `name` values with what you expect. Check `openspec/changes/` and `openspec/changes/archive/`.

**Resolution.** Click **Refresh** after the files exist. If they exist only in a store, this panel cannot select that store. Use the CLI, or open the store repository as the folder.

**Expected result.** A row per active change the CLI returns.

## The activity-bar icon is gone

**Symptom.** **OpenSpec Toolkit** is not on the icon strip. **OpenSpec: Show Sidebar** might open an empty-looking area or a view docked somewhere else.

**Cause.** The container was hidden, or the view was dragged into the panel or the secondary side bar. Hiding a view container does not uninstall the extension.

**Checks.** Right-click the activity bar and look for **OpenSpec Toolkit**. Look in the bottom panel and the right side bar for the title **OPENSPEC TOOLKIT**.

**Resolution.** Re-enable it from the activity-bar menu, or run **OpenSpec: Move to Left Sidebar**. If it is still gone, run **OpenSpec: Reset Sidebar (fix hidden icon)**.

**What reset affects.** View positions in this window. It does not delete OpenSpec files, settings, or the clipboard. Other docks you customized can move. The toast `OpenSpec sidebar restored.` means the command finished, not that every previous layout was preserved.

**Expected result.** The document icon is back and the webview shows the form, not a blank editor group.

## The view will not become an editor tab

**Symptom.** Dragging the panel next to a file does nothing, or it snaps back to the side or the bottom.

**Cause.** `openspec.sidebarView` is a view. The editor area only accepts editors. This is host behavior, not a missing setting.

**Resolution.** Dock it in the primary side bar, secondary side bar, or panel. Use the view title as the drag handle.

## Propose seems to do nothing in the project

**Symptom.** The toast says the command was copied, but no `openspec/changes/` folder appears.

**Cause.** Propose only copies `/opsx:propose ...`. It does not run the CLI. The folder appears only after you paste into chat and the assistant follows the project's OpenSpec instructions.

**Checks.**

1. The toast should be `Propose copied to clipboard — paste in chat with Ctrl+L.`
2. If you instead saw `Enter a feature description for Propose.`, the text box was empty or whitespace.
3. Paste into chat yourself. `Ctrl+L` focuses chat and does not paste.
4. If the agent does not understand `/opsx:propose`, try the hyphen form your `openspec init` generated. See [user-guide.md](#user-guide).

**Expected result.** After a successful chat run, **Refresh** shows a new row. The extension does not refresh itself when the assistant writes files.

## Apply, Verify, or Archive hit the wrong change

**Symptom.** The command uses a name you did not mean to select.

**Cause.** With no manual selection, the first CLI row is selected automatically. On CLI 1.5.0, default sort is newest first. A previous selection is kept even if that row is gone, until a successful archive from this panel clears it.

**Resolution.** Click the row you want and read `Selected: <name>` before Apply, Verify, or Archive. If the banner is hidden because the list is empty but cards look fully opaque, a stale name may still be stored. Reload the window to clear memory, then select again.

## Verify said it passed, or the log does not show the issues

**Symptom.** You see `Verify passed for "<name>".` and also `Verify copied to clipboard — paste in chat with Ctrl+L. CLI results are in the log below.` The log only says `Copied: /opsx:verify ...`.

**Cause.** Exit code 0 is treated as success even though CLI 1.5.0 does not put `valid` at the top level of the JSON. The copy step then replaces the log, so the JSON is not left on screen. A failed validate exits non-zero; the toast says issues were found, and the log is still replaced by `Copied:`.

**Resolution.** Trust a terminal for the actual report:

```bash
openspec validate "<name>" --json --no-interactive
```

Read `items[0].valid` and `issues` there. The slash command in the clipboard is still only a chat command. It does not prove the CLI passed.

**Expected result.** The terminal shows the OpenSpec report. The panel cannot keep that report and the `Copied:` line at the same time in version 0.0.1.

## Archive failed

**Symptom.** `Archive failed: Command failed: ...`

**Checks.** Run, in the first workspace folder:

```bash
openspec archive "<name>" --json
```

Omit `-y` if you want the CLI's own prompts. Read its error. Typical causes are an unknown change name, validation failure inside OpenSpec, or the same wrong node/script path as the red banner.

**Resolution.** Fix the condition OpenSpec reports. Do not click **Archive** again until you intend to. The extension will pass `-y` and will not offer a dry run.

**Expected result.** A later attempt that exits 0 shows `"<name>" archived successfully.` and the list refreshes.

## Archive succeeded and you need it back

**Symptom.** The toast says the archive succeeded and the row is gone or the selection changed.

**Cause.** OpenSpec moved or updated files. This extension cannot undo that. It did not create a backup.

**Resolution.** Restore the project from git or from a copy you made. Inspect `openspec/changes/archive/` and `openspec/specs/` using OpenSpec's documentation at https://openspec.dev/docs. Do not delete `openspec/specs` to "undo" unless you know that directory is disposable.

**Expected result.** After you restore the files, **Refresh** shows the active change again if it is back under `openspec/changes/` and is not only inside `archive`.

## The copied slash command does nothing in chat

**Symptom.** Paste is accepted but the assistant treats it as ordinary text, or says the command is unknown.

**Possible causes.**

- The project was not initialized for Cursor, or `openspec update` was never run after a CLI upgrade. Those are OpenSpec setup steps.
- The project uses `/opsx-propose` (hyphen) and the clipboard has `/opsx:propose` (colon).
- `/opsx:verify` is not in the active OpenSpec profile.
- Chat was not focused in the project that contains the OpenSpec files.

**Resolution.** Use the spelling in the files `openspec init` generated. For profile and command questions, use https://openspec.dev/docs and https://github.com/Fission-AI/OpenSpec. This extension will keep copying the colon form.

## Extension is not compatible with Code

**Symptom.** The host says the extension requires `^1.105.0` and names a lower engine version.

**Cause.** The running Cursor or VS Code build is older than the engine declared in `package.json`.

**Resolution.** Update the editor, or only if you are developing the extension, lower `engines.vscode` and reinstall a newly packaged `.vsix`. Do not expect the published behavior of 0.0.1 to change by editing settings.

## Two projects are open and the list is the wrong one

**Symptom.** Multi-root workspace, and the panel shows the other folder.

**Cause.** Only `workspaceFolders[0]` is used. Settings cannot redirect the folder.

**Resolution.** Put the OpenSpec project first, or open it in its own window.

## Clipboard lost other text

**Symptom.** A previous copy disappeared after Explore, Propose, Apply, or Verify.

**Cause.** The extension writes the slash command and does not restore the previous clipboard. Archive does not touch the clipboard.

**Resolution.** There is no undo inside the extension. Copy the previous text again from its source.

## What to include if you open an issue

Use https://github.com/dobrado76/cursor-openspec-extension/issues if Issues are enabled. Nobody is committed to a response time.

Include:

- Extension version (`0.0.1` unless you changed it) and the installed extension id `local.openspec-sidebar`
- Cursor or VS Code version, and the operating system
- The exact banner or toast text, with home-directory usernames and any secrets removed
- Whether a terminal `openspec list --json` in that same folder succeeds
- What you expected and what happened

Do not paste API keys, private prompts, or entire home directories. A few lines of the banner plus the OpenSpec version (`openspec --version`) are enough unless someone asks for more.

<!-- source: docs/FAQ.md -->

# FAQ

Answers describe extension version 0.0.1. OpenSpec behavior that was checked against a specific CLI says so. For everything OpenSpec does after a command is pasted, use https://openspec.dev/docs.

## What the extension is

### 1. What is OpenSpec Sidebar?

It is a Cursor/VS Code extension, id `local.openspec-sidebar`, display name **OpenSpec Sidebar**. It adds the **OpenSpec Toolkit** view: a list of active OpenSpec changes and five actions. It is not the OpenSpec CLI and not the Cursor chat panel.

### 2. What is OpenSpec Toolkit versus OpenSpec Sidebar?

**OpenSpec Sidebar** is the extension name in the Extensions view. **OpenSpec Toolkit** is the activity-bar container and the view title. They are the same feature.

### 3. Does this extension replace OpenSpec?

No. You still install `@fission-ai/openspec`, run `openspec init` in the project, and use the assistant for explore, propose, and apply. The panel lists changes and copies slash commands. Verify and Archive also call the CLI. Spec rules, profiles, and file formats are documented at https://github.com/Fission-AI/OpenSpec.

### 4. Who is it for?

Someone working in a folder that has, or will have, an `openspec/` directory created by OpenSpec, and who wants that list inside the editor.

### 5. Is it on the VS Code Marketplace?

This repository does not publish it. Install a `.vsix` built from the repo. The publisher field is `local`, so the id is `local.openspec-sidebar`.

### 6. What version does this guide cover?

`0.0.1` as declared in `package.json`. `CHANGELOG.md` only has an Unreleased "Initial release" entry. Do not assume later features.

### 7. Which editors are supported?

Cursor and VS Code, engine `^1.105.0`. The repository does not include a compatibility matrix of Cursor builds. If the host is older, it refuses to load the extension.

### 8. Does it work offline?

The extension does not call a network API. The CLI you configure might. Chat after you paste a command uses whatever model Cursor is signed into. That is Cursor, not this extension.

### 9. Does the extension collect telemetry?

No telemetry client is implemented here. It also does not set `OPENSPEC_TELEMETRY` or `DO_NOT_TRACK`. If the OpenSpec CLI sends telemetry, that is OpenSpec's policy. See the OpenSpec repository.

### 10. Is there a license?

No license file is in this repository. Do not assume MIT or any other license from OpenSpec's license. OpenSpec's package is MIT; this extension is a separate tree.

## Install and first launch

### 11. How do I install it?

Build `openspec-sidebar-0.0.1.vsix` with `npm run package` in this repository, then Extensions → `...` → **Install from VSIX...**, then reload. See [getting-started.md](#getting-started).

### 12. Why does F5 not install it into my normal window?

**F5** runs **Run Extension**, which opens an Extension Development Host. Your normal window keeps using the installed `.vsix`, or nothing, until you install the package. The host window is also a different workspace. Open your project there with File → Open Folder.

### 13. Where is the icon?

A document icon on the activity bar, titled **OpenSpec Toolkit**. If it is missing, right-click the activity bar or run **OpenSpec: Show Sidebar**. See [troubleshooting.md](#troubleshooting).

### 14. What do I install before the extension is useful?

A Node.js binary, the OpenSpec CLI (`openspec.js`), and a project folder. OpenSpec documents Node.js 20.19.0 or newer. This extension does not check that version. Install steps for OpenSpec: https://openspec.dev/docs.

### 15. Does the extension run `openspec init`?

No. There is no Init button. If the project has no changes directory, CLI 1.5.0 exits with an error. The panel usually shows `Command failed:` rather than the CLI's sentence. Run `openspec init` yourself.

### 16. How do I know install worked?

Extensions shows **OpenSpec Sidebar**. **OpenSpec: Show Sidebar** opens a view that gets past `Loading...` into rows, the empty sentence, or a red banner. `OpenSpec Sidebar: activate` appears in the extension host log.

### 17. The host says the extension requires ^1.105.0. What now?

Update Cursor or VS Code. That message is the editor refusing the manifest. Settings cannot override it.

### 18. Can I install it on macOS or Linux?

Yes, if the editor engine is new enough. You must set `openspec.cliPath`. The empty-value fallback is a Windows nvm4w path that will be wrong on other systems. Set `openspec.nodePath` too. See [configuration.md](#configuration).

### 19. Do I have to reload after changing the two path settings?

No. The next Refresh, selection, or archive reads the current settings.

### 20. The package command failed because of a missing repository. What flag is used?

`npm run package` already passes `--allow-missing-repository`. If you call `vsce` yourself, add that flag. `package.json` has no `repository` field.

## The proposals list

### 21. What is a proposal in this panel?

A row from `openspec list --json`. In OpenSpec those are active change directories. The hint in the panel says each row is an active OpenSpec change (proposal). This extension does not invent a second kind of object.

### 22. Where are the files?

The extension does not open them for you. OpenSpec keeps active changes under the project's `openspec/changes/` tree. Archived ones are excluded from `list` by CLI 1.5.0 when the directory name is `archive`. Confirm with `openspec list --json` if your CLI version differs.

### 23. How do I select one?

Click the row. The banner reads `Selected: <name> — Apply / Verify / Archive target this proposal`.

### 24. Why is one already selected when I open the panel?

If you had not selected anything, the extension selects the first item the CLI returned. It does not sort. CLI 1.5.0 defaults to newest `lastModified` first. The panel does not show `lastModified`, so the reason a row is first is not visible in the UI.

### 25. What do the badge words mean?

They are the CLI `status` string, uppercased by CSS. On CLI 1.5.0: `complete`, `in-progress`, or `no-tasks`. Only `complete` is green. The extension does not compute that word itself.

### 26. What does the progress bar measure?

`completedTasks / totalTasks` from the list JSON, as a percentage. It is task checkboxes according to the CLI, not artifact chips. If `totalTasks` is 0, the bar is empty and the line reads `0/0 implementation tasks`.

### 27. Why is `lastModified` not shown?

The field is on the CLI 1.5.0 list object and the extension ignores it.

### 28. How do I refresh?

Click **Refresh** (↻, tooltip **Refresh**). The list also reloads when the view opens, when it becomes visible, when you select a row, and after an archive this panel treats as successful. Editing files in chat does not refresh the list by itself.

### 29. Why does it say there are no proposals when I just created one?

Click **Refresh**. Also confirm you created it in the first workspace folder, and that it is not only under `openspec/changes/archive/`.

### 30. Can I sort or search the list?

No. There is no search box and no sort control. Whatever order `list --json` prints is the order you see.

### 31. Can I list specs instead of changes?

No. The extension always runs `list --json`, which is the CLI's change list. It never passes `--specs`.

### 32. Will a multi-root workspace list every folder?

No. Only the first folder is the CLI working directory.

## Artifacts

### 33. What are the chips under Artifacts?

One chip per `artifacts[]` entry from `openspec status --change "<name>" --json`, labeled `<id>: <status>`.

### 34. Why might Artifacts be missing?

Status failed or returned nothing the extension could parse. The section hides. The proposal row can still be there. Run `openspec status --change "<name>" --json` in the folder to see the CLI error. The panel does not put status failures in the red banner.

### 35. What do done, ready, and blocked mean?

On CLI 1.5.0 those are the status command's artifact states: `done` if the artifact is complete, `ready` if it can be created next, `blocked` if dependencies are missing. The panel colors `done` and `ready` only. It does not show `missingDeps`. Definitions of each artifact id (`proposal`, `design`, `tasks`, and others) belong to the OpenSpec schema, not to this extension.

### 36. There is CSS for `pending`. When does that appear?

Only if the CLI sends `status: "pending"`. CLI 1.5.0's status formatter sends `done`, `ready`, or `blocked`, not `pending`.

### 37. What is the sentence under the chips?

`nextSteps` from the status JSON, joined with spaces. `isComplete` and `applyRequires` are parsed and not shown.

## Explore, Propose, and Apply

### 38. How do I explore an idea?

Optionally type in **New Proposal (Explore / Propose)**, click **Explore**, focus chat, paste, and submit. If the box has text, the clipboard is `/opsx:explore` plus that text, and the selected change name is not used. If the box is empty and a row is selected, the name is appended. If both are empty, the clipboard is `/opsx:explore`.

### 39. How do I start a new change?

Type a description, click **Propose** or press Ctrl+Enter (Cmd+Enter on macOS) in the text area, paste into chat, and submit. The clipboard is `/opsx:propose` plus the trimmed text. The extension does not create the folder.

### 40. What if Propose warns me to enter a description?

The warning is `Enter a feature description for Propose.` The text box was empty or only whitespace. Nothing was copied.

### 41. Does Propose use the selected row?

No. Selection is ignored for the propose string.

### 42. How do I implement a change?

Select the row. Click **Apply**. Paste `/opsx:apply <name>` into chat and submit. The extension does not edit source files.

### 43. What if I click Apply with nothing selected?

Warning and log: `Select a proposal from the list first.` The dimmed style does not block the click. If a row was auto-selected, Apply still has a name.

### 44. Can the extension type the command into the agent box?

No. Version 0.0.1 only copies to the clipboard. There is no setting to turn on auto-submit or prompt injection. Those setting names are not in `package.json`.

### 45. The toast says Ctrl+L. I use a Mac.

The toast is not localized. It always says `paste in chat with Ctrl+L.` Use the chat shortcut for your machine, often `Cmd+L`, then paste with `Cmd+V`. Focusing chat does not paste.

### 46. Why does the agent ignore `/opsx:propose`?

The extension always copies a colon. OpenSpec's docs say Cursor command files often use a hyphen (`/opsx-propose`). Match the files `openspec init` wrote in the project. The panel will not switch spellings for you. Command setup is documented by OpenSpec: https://openspec.dev/docs.

### 47. Does Apply wait until artifacts are done?

No. The extension does not read `applyRequires` before copying. OpenSpec's own apply instructions may refuse to implement early. That refusal is the assistant following OpenSpec, not a check in this panel.

### 48. Is the text box cleared after Propose?

No. The description stays so you can copy it again.

## Verify and Archive

### 49. What does Verify do that Apply does not?

Verify runs `openspec validate "<name>" --json --no-interactive` and then copies `/opsx:verify <name>`. Apply only copies a slash command.

### 50. How do I know Verify really passed?

A toast `Verify passed for "<name>".` means the CLI process exited 0 and the JSON was not shaped as `valid: false` or a non-empty top-level `errors` array. CLI 1.5.0's success JSON uses `items[0].valid` instead, which this code does not read. Exit 0 is why the toast says passed. For the issue list, run `openspec validate "<name>"` in a terminal. The panel log is replaced by `Copied: /opsx:verify <name>` immediately afterward, so it will not keep the JSON.

### 51. Verify said there were issues, but the log is only `Copied:`. Where are the issues?

The copy step replaces the log. The failed process's stdout, which on CLI 1.5.0 holds the JSON issues, is already discarded because a non-zero exit becomes `Command failed:`. Use the terminal command in the previous answer.

### 52. I clicked Verify and only saw a log line.

`Select a change to verify.` means nothing was selected. Unlike Apply, there is no warning toast.

### 53. Does a failed verify still copy the slash command?

Yes, as long as a change name was selected. The copy is not conditional on `ok`.

### 54. Is `/opsx:verify` always available in chat?

No. OpenSpec profiles decide which slash commands exist. The extension copies the string anyway. If the agent does not know it, that is the project's OpenSpec setup. See https://openspec.dev/docs.

### 55. How do I archive?

Select a row. Click **Archive**. Read the modal `Archive "<name>" and merge into main specs?`. Click **Archive** only if you want the CLI to run. The extension then runs `archive "<name>" -y --json`, so OpenSpec will not ask you again.

### 56. What does archive change on disk?

This extension does not move files itself. OpenSpec's help for the command, verified on CLI 1.5.0, says it archives a completed change and updates main specs. The exact paths are OpenSpec's. Read https://openspec.dev/docs before relying on a particular archive folder layout.

### 57. Can I undo Archive?

Not with this extension. It does not snapshot the tree. Restore from git or your own backup. Do not delete `openspec/specs` unless you already know those files are unwanted.

### 58. I dismissed the archive dialog. Did anything happen?

No. Only the button labeled `Archive` continues. There is no log line on cancel.

### 59. Archive failed with Command failed. Did it half-finish?

The extension only knows the process exited non-zero. It does not roll back. Look at the project in git and at the CLI's own output by running `openspec archive "<name>" --json` in a terminal without assuming the extension's `-y` run is still in progress. If you are unsure whether files changed, `git status` is the safe check. Do not run Archive again until you intend to.

### 60. Why was a different row selected after a successful archive?

Success clears the selection and reloads the list. The reload auto-selects the new first row if any remain. The toast is `"<name>" archived successfully.`

### 61. Can I archive without updating specs?

Not from the panel. `--skip-specs` exists on CLI 1.5.0 and the extension never passes it. Run the CLI yourself if OpenSpec's docs say that flag is appropriate. Do not expect the panel to grow that option.

## Settings and data

### 62. What does `openspec.nodePath` do?

It is the program used to launch the script. Empty means `process.execPath`, and the child inherits the extension host environment. The code does not search `PATH`. The manifest says "auto-detected". That description is wrong. This repository did not capture a live result for the empty default. Set the key to a Node binary that can run `openspec --version`.

### 63. What does `openspec.cliPath` do?

It is the path to `openspec.js`. Empty means `C:\nvm4w\nodejs\node_modules\@fission-ai\openspec\bin\openspec.js`, even on machines where that file is absent. Point it at the JavaScript entry, not at `openspec.cmd` or `openspec.ps1`.

### 64. What is the difference between leaving a path empty and setting it?

Empty uses the fallbacks above. Any non-empty string, including spaces, is used as the path. A wrong explicit path fails the same way as a bad fallback: `Command failed:`.

### 65. Are the settings per project folder?

They are window-scoped User or Workspace settings. They are not per folder. The CLI folder is always the first workspace root, regardless of these settings.

### 66. Where is my selected proposal stored?

In memory only. Reload the window and the first list row is selected again. The text you typed is not saved by the extension.

### 67. Does the extension write logs to disk?

No. The on-screen log is the webview. Activation writes `OpenSpec Sidebar: activate` to the extension host console.

### 68. Does Verify or Propose upload my prompt?

This extension does not. Propose copies text to the local clipboard. What happens after you paste into Cursor chat is Cursor's. Do not paste secrets into the text box if you do not want them on the clipboard.

## Layout commands

### 69. What is OpenSpec: Show Sidebar?

Command id `openspec.showSidebar`. It focuses the view.

### 70. What is OpenSpec: Move to Left Sidebar?

Command id `openspec.moveToSidebar`. It focuses the view and runs `workbench.action.moveFocusedViewToSideBar`. If that throws, it runs the reset command.

### 71. What is OpenSpec: Reset Sidebar (fix hidden icon)?

Command id `openspec.resetSidebar`. It runs `workbench.action.resetViewLocations` for the whole window, then shows this view, then toasts `OpenSpec sidebar restored.` Use it when the icon is lost. It can move Terminal and other views. It does not delete `openspec/` or settings.

### 72. Why can't I dock it like a file tab?

Views cannot become editors. Use the side bar or the panel. Drag the title **OPENSPEC TOOLKIT**.

### 73. I clicked Hide. Is the extension uninstalled?

No. The container is hidden. Turn **OpenSpec Toolkit** back on from the activity-bar context menu, or use the commands above.

## Failures and limits

### 74. Why does the banner say Command failed instead of "run openspec init"?

Because the CLI exited non-zero and the extension keeps Node's `error.message` only. On CLI 1.5.0 the useful sentence is on stdout: `No OpenSpec changes directory found. Run 'openspec init' first.` Run `openspec list --json` in the folder to read it.

### 75. The banner says Open a project folder first.

The window has no folder. File → Open Folder, then **Refresh**. This is normal right after **F5**.

### 76. The list never leaves Loading.

The CLI call may be hung. There is no timeout. Try the same node and script in a terminal. See [troubleshooting.md](#troubleshooting).

### 77. Can a change name break the panel?

Names are inserted into HTML without escaping, and into the shell command inside double quotes without more escaping. Unusual names can distort a row or make the CLI line fail. The extension does not offer a rename box. Rename the change with OpenSpec or by moving the folder using OpenSpec's own rules, then **Refresh**.

### 78. Does the panel support OpenSpec stores?

No. It never passes `--store`. Open the store checkout as the workspace folder if the CLI's default root is not the store.

### 79. Does it support more than one OpenSpec profile?

It does not read or set the profile. It always copies the same four slash strings and always invokes the same four CLI argument lists.

### 80. Will it pick up a new change without Refresh?

Only if something else already triggers a reload: showing the view, selecting a row, or a successful archive from the panel. Saving a file does not.

### 81. Two refreshes finished out of order. Is that possible?

Yes. Nothing cancels an older `list`. Click **Refresh** again if the rows look stale.

### 82. The sample test passed. Is the panel verified?

No. `src/test/extension.test.ts` does not import the extension. There is no `npm test` script.

### 83. How do I report a bug?

https://github.com/dobrado76/cursor-openspec-extension/issues if Issues are enabled. Include the editor version, `0.0.1`, the OS, `openspec --version`, and the redacted banner. Do not expect a guaranteed reply. OpenSpec CLI bugs belong at https://github.com/Fission-AI/OpenSpec/issues.

### 84. How do I remove the extension?

Extensions → **OpenSpec Sidebar** → Uninstall, then reload. That does not delete `openspec/` in your projects and does not uninstall the npm package `@fission-ai/openspec`. Uninstalling the CLI is documented by OpenSpec, not here.

### 85. The banner failed and the list still says to use Propose. Which line is right?

The red banner. An empty `changes` array always prints `No proposals yet. Use Propose to create one.`, including when `list` threw. Propose will not create files by itself, and it will not fix a bad node path or a missing `openspec init`.

### 86. I clicked a row and immediately clicked Apply, and the command used the other name.

The page does not store the click until the host sends `updateState`. Apply sends the previous selection when that reply has not arrived, and the host prefers that non-empty name. Wait until the banner says `Selected:` and the row is highlighted.

### 87. Why is there no Keyboard Shortcuts entry for Propose?

Ctrl+Enter is a listener inside the text area only. `package.json` contributes no `keybindings`. It will not appear in Keyboard Shortcuts, and it does nothing outside that box.

### 88. The extension is installed but nothing activates in this folder.

Check Restricted Mode. There is no `capabilities.untrustedWorkspaces` entry. VS Code's workspace-trust guide says that omission leaves the extension disabled until the workspace is trusted: https://code.visualstudio.com/api/extension-guides/workspace-trust. Also check the engine requirement and that the extension is enabled. This repository did not re-test Restricted Mode in Cursor.

### 89. Does a failed list forget which proposal I had selected?

No. The name stays in memory. The selected banner is hidden because there are no rows. The workflow cards stay fully opaque if that name is still set. Apply can still copy it. Reload the window to drop the memory.

<!-- source: docs/architecture.md -->

# Architecture

This describes version 0.0.1 so a support answer can explain what is local to the extension and what is the CLI. It is not an API for other extensions. Nothing here is exported for third-party use.

## Pieces

| Piece | File | Responsibility |
| --- | --- | --- |
| Activation and operations | `src/extension.ts` | Registers the view and commands. Holds the selected change name. Decides copy versus CLI. |
| CLI wrapper | `src/openspecCli.ts` | Builds one shell command and parses list, status, validate, and archive. |
| Clipboard | `src/cursorChat.ts` | `vscode.env.clipboard.writeText` only. The filename is historical. It does not call chat. |
| Webview markup | `src/panelHtml.ts` | HTML, CSS, and the page script, returned as a string. |
| Manifest | `package.json` | Engine, activation, settings, commands, view ids. |
| Icon | `media/icon.svg` | Activity-bar icon. |

Compiled output is `out/`, which is gitignored. The installed extension runs `out/extension.js`.

There is no background task, queue, file watcher, output channel, secret storage, or network client.

## Lifecycle

`onStartupFinished` calls `activate`. That registers:

- `WebviewViewProvider` for `openspec.sidebarView`
- `openspec.showSidebar`
- `openspec.resetSidebar`
- `openspec.moveToSidebar`

There is no `deactivate` function.

`resolveWebviewView` enables scripts, restricts local resources to the extension folder, sets the HTML, and subscribes to messages and visibility. Becoming visible calls `refreshState` again. The HTML is not rebuilt on visibility, so a surviving webview keeps the text area. A disposed webview is created again and loses the text area and the log. The selected name is on the provider object, so it survives a webview dispose until the extension host exits.

`retainContextWhenHidden` is not set.

## Refresh sequence

1. `listChanges()`.
2. If a name is already selected, `getStatus(name)`.
3. Else if the list is non-empty, select `changes[0]` and load its status.
4. `postMessage` `updateState`.

Opening the view can do this twice: the page sends `ready`, and `onDidChangeVisibility` also refreshes when the view is shown. No generation counter protects against overlap. Status errors do not fail the list. List errors still send `changes: []` and `error`, and they do not clear a selection that was already stored. The page then shows both the error banner and the empty-list sentence. The page does not highlight a newly clicked row until this message comes back, and operation messages include that older selection.

`initialized` is returned by `listChanges` and never read.

## Operation sequence

`runOperation` uses `message.change` if it is truthy, otherwise the provider's selected name.

Archive and verify return before the generic copy path. Verify's "no selection" warning in the generic path is therefore unreachable. The live verify path logs `Select a change to verify.` and returns.

Propose and explore never spawn a process. Apply never spawns a process.

## Process boundary

`OpenSpecCli.run` interpolates the name into a single string and passes it to `exec`. The extension is not talking to OpenSpec over stdin or a socket. Progress is not streamed. The call ends when the process exits or the 10 MB stdout buffer is exceeded.

A non-zero exit rejects the promise. Callers that need the OpenSpec JSON on failure do not read `error.stdout`. That is why uninitialized `list` and failed `validate` surface as `Command failed:`.

## State

| State | Where | Lifetime |
| --- | --- | --- |
| Selected change | `OpenSpecSidebarProvider._selectedChange` | Extension host process |
| Settings | VS Code configuration service | User or workspace settings files, owned by the editor |
| Webview selection mirror, list, artifacts | Page memory | Until the next `updateState` or until the page is destroyed |
| Text area and log | DOM | Until the webview is destroyed |
| Clipboard | Operating system | Until the next copy by any application |

Nothing in the extension writes `globalState`, `workspaceState`, or `secrets`.

## Security boundary

The webview cannot reach the network under its content security policy. It can post the four message commands above. The host will pass a change name through to a shell string inside double quotes. Names come from the CLI list or from the page. The extension does not sanitize HTML when it builds rows, chips, or the selected banner.

The nonce used for the script tag is `Math.random`. The page has no remote script source. This is a local editor webview, not a hosted site.

The extension runs whatever executable `openspec.nodePath` names, with the script path and the arguments listed in [reference.md](#reference). Pointing the setting at an unexpected program runs that program. That is the same trust level as a user-controlled setting in the editor.

## Tests

`src/test/extension.test.ts` is the generator sample. It asserts that `indexOf` cannot find `5` or `0` in `[1, 2, 3]`. It does not import the extension. `package.json` has no `test` script. A green sample test would not prove the panel works.

<!-- source: docs/development.md -->

# Development

Work from the repository root. The extension is this repository, not a nested `openspec-sidebar/` package. Older notes that tell you to `cd openspec-sidebar` are wrong for the current tree.

Repository: https://github.com/dobrado76/cursor-openspec-extension

## Build

Requirements for building: Node.js and npm. The `typescript` and `@types/vscode` versions are the devDependencies in `package.json` (`typescript` 6.x and `@types/vscode` `^1.105.0` at the time of writing).

```bash
npm install
npm run compile
```

`npm run compile` is `tsc -p ./`. Output goes to `out/`. `npm run watch` is `tsc -watch -p ./`.

`vscode:prepublish` also runs `npm run compile`, and `npm run package` invokes vsce, which runs prepublish.

```bash
npm run package
```

That executes `npx @vscode/vsce package --allow-missing-repository --no-dependencies`. `--allow-missing-repository` is required because `package.json` has no `repository` field. The `.vsix` is gitignored.

`.vscodeignore` excludes source TypeScript, tests, and source maps from the package. The installed extension runs the compiled `out/` files plus `package.json`, `media/`, and the readme-class files vsce includes.

## Debug

`.vscode/launch.json` has one configuration, **Run Extension**.

- `type`: `extensionHost`
- `--extensionDevelopmentPath=${workspaceFolder}`
- `outFiles`: `${workspaceFolder}/out/**/*.js`
- `preLaunchTask`: the default build task

`.vscode/tasks.json` makes **npm: watch** the default build task. It is a background `tsc-watch` task and does not reveal the terminal.

Press **F5**, or start **Run Extension**. A second window opens. Open the target project with File → Open Folder in that window. This repository does not contain `openspec/changes` unless you create it, so the panel will not list proposals if the host window is this repo.

Breakpoints in `src/*.ts` work through the source map (`sourceMap` is true, `rootDir` is `src`).

Reload the host window after a compile if the running process has not picked up the change. Watch mode recompiles on save, but the extension host keeps the old `out/` evaluation until reload.

## Lint

`eslint.config.mjs` enables a small TypeScript ruleset (`semi`, `eqeqeq`, `curly`, `no-throw-literal`, and a naming rule for imports). There is no `npm run lint` script. Recommended editor extensions are in `.vscode/extensions.json`: ESLint and the VS Code extension test runner.

## Tests

Do not treat the sample test as coverage. See [architecture.md](#architecture). The test runner config is `.vscode-test.mjs`, which looks at `out/test/**/*.test.js`. There is no `npm test` script. Running the sample only proves the test harness can execute.

## Documentation

User-support docs live in `docs/`. The generated bundle is `AI-SUPPORT.md` at the repository root.

```bash
npm run docs:build
npm run docs:check
```

`docs:build` rewrites `AI-SUPPORT.md` from the source list in `scripts/build-ai-support.mjs`. `docs:check` rebuilds in memory, compares it to the committed file, and fails if they differ. The check does not write `AI-SUPPORT.md`. It can write a temp copy only when reporting a mismatch.

`docs/support-evaluation.md` is not part of the bundle.

When behavior changes, update the matching doc in the same change and run `npm run docs:build` before committing. The maintenance rule is `.cursor/rules/documentation.mdc`.

There is no GitHub Actions workflow in this repository. `npm run docs:check` is the local freshness check. It was not added to CI because no CI exists.

## Package layout

```text
package.json          extension manifest
src/extension.ts      activation, commands, operations
src/openspecCli.ts    CLI exec and JSON handling
src/cursorChat.ts     clipboard write
src/panelHtml.ts      webview document
media/icon.svg
scripts/build-ai-support.mjs
scripts/check-ai-support.mjs
docs/                 support sources
AI-SUPPORT.md         generated bundle
```

## Publishing

There is no `vsce publish` script, no `publisher` other than `local`, and no license file. Installing the `.vsix` with **Install from VSIX...** is the supported distribution method in this repository.

<!-- source: docs/roadmap.md -->

# Roadmap

This repository has no published roadmap, milestone list, or issue that commits to future features. Nothing in this section is a promise.

## Implemented in 0.0.1

- Activity-bar container **OpenSpec Toolkit** and webview **OpenSpec Toolkit**
- Proposal list from `openspec list --json`
- Artifact chips and next-step line from `openspec status --json`
- Explore, Propose, and Apply as clipboard slash commands
- Verify as `openspec validate` plus a copied `/opsx:verify` command
- Archive as a confirmed `openspec archive ... -y --json` call
- Commands **OpenSpec: Show Sidebar**, **OpenSpec: Reset Sidebar (fix hidden icon)**, and **OpenSpec: Move to Left Sidebar**
- Settings `openspec.nodePath` and `openspec.cliPath`

## Known limitations of the current implementation

These are gaps in the code, not scheduled work.

- Chat is not filled or submitted. Commands are copied.
- Slash commands are always the colon form, never read from the project's generated Cursor commands.
- Default Node path is `process.execPath`. Default CLI path is a single Windows nvm4w path. Neither is searched.
- Only the first workspace folder is used. `--store` is never passed.
- `openspec init` and `openspec update` are never run.
- The list is not file-watched and is not sorted by the extension.
- Selection, the text box, and the log are not persisted.
- A failed CLI exit drops stdout, so OpenSpec's JSON error message is replaced by `Command failed:`.
- Verify treats exit code 0 as success. It does not read OpenSpec 1.5.0's `items[].valid` field. The log line that held CLI output is then replaced by `Copied:`.
- **OpenSpec: Reset Sidebar (fix hidden icon)** runs `workbench.action.resetViewLocations`, which resets view layout for the whole window.
- Apply, Verify, and Archive look dimmed without a selection, but the cards still accept clicks.
- Proposal names are inserted into webview HTML without escaping.
- Change names are placed in a shell command inside double quotes without further escaping.
- The bundled test does not exercise the extension. There is no `npm test` script.
- There is no license file.

## Not implemented, and not scheduled here

Support questions sometimes assume these exist. They do not, and this repository does not commit to adding them:

- A button that opens or fills Cursor chat
- Editing proposal files in the panel
- Creating a change without the AI assistant
- Deleting a change without Archive
- Undo for Archive
- A store picker, profile picker, or sort control
- Multi-root support
- Marketplace publishing under a public publisher
- Automatic refresh when `openspec/changes/` changes

If you need one of those, the honest answer is that version 0.0.1 cannot do it. Check the repository later rather than expecting a hidden control.
