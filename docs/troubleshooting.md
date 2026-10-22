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

1. Settings → **OpenSpec**. Both paths should be filled. See [configuration.md](configuration.md).
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
4. If the agent does not understand `/opsx:propose`, try the hyphen form your `openspec init` generated. See [user-guide.md](user-guide.md).

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
