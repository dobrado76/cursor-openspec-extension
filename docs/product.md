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

The two path settings look optional. Empty `openspec.nodePath` uses `process.execPath` with the inherited environment. That is not a search for `node` on `PATH`, and this repository did not prove what that process does with `openspec.js`. Empty `openspec.cliPath` uses a hardcoded Windows nvm4w path. Set both to a known-good Node binary and `openspec.js`. See [configuration.md](configuration.md).

There is no status-bar item, no editor title menu, no contributed keybinding, and no walkthrough. Ctrl+Enter works only inside the proposal text area. The extension does not declare workspace-trust support, so Restricted Mode can leave it disabled. See [configuration.md](configuration.md).

## Relationship to OpenSpec

OpenSpec is a separate project: https://github.com/Fission-AI/OpenSpec and https://www.npmjs.com/package/@fission-ai/openspec. Its documentation index is https://openspec.dev/docs.

This extension shells out to that CLI and copies slash-command strings. Spec format, slash-command behavior, profiles, stores, validation rules, and archive file layout belong to OpenSpec. This guide only describes how the sidebar invokes and displays them.
