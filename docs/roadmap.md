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
