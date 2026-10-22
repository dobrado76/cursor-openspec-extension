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

Build `openspec-sidebar-0.0.1.vsix` with `npm run package` in this repository, then Extensions → `...` → **Install from VSIX...**, then reload. See [getting-started.md](getting-started.md).

### 12. Why does F5 not install it into my normal window?

**F5** runs **Run Extension**, which opens an Extension Development Host. Your normal window keeps using the installed `.vsix`, or nothing, until you install the package. The host window is also a different workspace. Open your project there with File → Open Folder.

### 13. Where is the icon?

A document icon on the activity bar, titled **OpenSpec Toolkit**. If it is missing, right-click the activity bar or run **OpenSpec: Show Sidebar**. See [troubleshooting.md](troubleshooting.md).

### 14. What do I install before the extension is useful?

A Node.js binary, the OpenSpec CLI (`openspec.js`), and a project folder. OpenSpec documents Node.js 20.19.0 or newer. This extension does not check that version. Install steps for OpenSpec: https://openspec.dev/docs.

### 15. Does the extension run `openspec init`?

No. There is no Init button. If the project has no changes directory, CLI 1.5.0 exits with an error. The panel usually shows `Command failed:` rather than the CLI's sentence. Run `openspec init` yourself.

### 16. How do I know install worked?

Extensions shows **OpenSpec Sidebar**. **OpenSpec: Show Sidebar** opens a view that gets past `Loading...` into rows, the empty sentence, or a red banner. `OpenSpec Sidebar: activate` appears in the extension host log.

### 17. The host says the extension requires ^1.105.0. What now?

Update Cursor or VS Code. That message is the editor refusing the manifest. Settings cannot override it.

### 18. Can I install it on macOS or Linux?

Yes, if the editor engine is new enough. You must set `openspec.cliPath`. The empty-value fallback is a Windows nvm4w path that will be wrong on other systems. Set `openspec.nodePath` too. See [configuration.md](configuration.md).

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

The CLI call may be hung. There is no timeout. Try the same node and script in a terminal. See [troubleshooting.md](troubleshooting.md).

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
