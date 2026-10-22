# Support evaluation

Maintainer scenarios for checking `AI-SUPPORT.md`. They were written from the extension source, `package.json`, and a local OpenSpec CLI 1.5.0 help/JSON check on 22 October 2026. They are not copied into the user bundle.

These cases were **not** executed against a model. No score is claimed. A correct refusal counts as a pass when the expected handling says to abstain.

Section names below are headings inside `AI-SUPPORT.md` after a docs build.

## Cases the guide should answer

### E1. Empty path settings

Question: I left OpenSpec settings blank and the banner says `Command failed:`. What should I set?

Expected: Set `openspec.nodePath` to a Node binary that already runs `openspec --version`, and `openspec.cliPath` to `openspec.js`. Empty node path is `process.execPath` with the inherited environment. Empty CLI path is the nvm4w hardcode, not a PATH search. The manifest text "auto-detected" is wrong. Do not claim a live extension-host test showed that the empty node path fails or succeeds.

Sections: Configuration (`openspec.nodePath`, `openspec.cliPath`); Troubleshooting (red banner).

Avoid: Telling the user the extension searches PATH, or that `Cursor.exe` was proven not to run the script.

Pass: Names both keys, both fallbacks, and says Refresh is enough.

### E2. F5 versus daily use

Question: I pressed F5 and my normal Cursor window still has no OpenSpec icon. Why?

Expected: F5 opens an Extension Development Host. Daily use needs the `.vsix` installed in that window. The host also has no folder until they open one.

Sections: Getting started; FAQ questions 11 and 12.

Avoid: Saying F5 installs into the current window.

### E3. Propose created no files

Question: I clicked Propose, saw the copied toast, and `openspec/changes` is still missing.

Expected: Propose only copies `/opsx:propose ...`. They must paste into chat and submit. Empty text instead shows `Enter a feature description for Propose.` The panel does not run init or the CLI for propose.

Sections: User guide (Propose); FAQ 39 and 40.

Avoid: Claiming the extension writes `proposal.md`.

### E4. Mac paste toast

Question: The toast says Ctrl+L but I am on macOS and the prompt stayed empty.

Expected: The toast is hardcoded. Ctrl+L or Cmd+L focuses chat and does not paste. They still paste with Cmd+V. The extension cannot fill the prompt.

Sections: User guide (Chat, after a copy); FAQ 44 and 45.

Avoid: Instructing them to enable `openspec.autoSubmitChat`.

### E5. Hyphen versus colon

Question: Chat does not understand `/opsx:apply add-dark-mode`. The project was initialized for Cursor.

Expected: The extension always copies the colon form and does not read generated command files. OpenSpec documents a hyphen form for Cursor. They should use the spelling `openspec init` wrote. Do not promise the extension will convert it.

Sections: User guide (Chat); Troubleshooting (slash command); AI instructions.

Avoid: Inventing a third syntax or saying the extension detects the project profile.

### E6. Verify log is only Copied

Question: Verify said it passed, then said results are in the log, but the log is `Copied: /opsx:verify my-change`.

Expected: Exit 0 becomes the passed toast. CLI 1.5.0 keeps validity in `items[0].valid`, which the extension ignores. The copy step replaces the log. They should run `openspec validate "my-change"` in a terminal.

Sections: User guide (Verify); Reference (Validate results); Troubleshooting (Verify).

Avoid: Quoting a fake issue list, or saying the log is a history.

### E7. Init message missing

Question: OpenSpec's terminal says to run `openspec init`, but the panel only says `Command failed:`.

Expected: Non-zero exit drops stdout. Stderr, if any, is part of `Command failed:`. CLI 1.5.0's sentence `No OpenSpec changes directory found. Run 'openspec init' first.` is on stdout, not in the banner. The page also shows `No proposals yet. Use Propose to create one.` under the banner. There is no Init button.

Sections: Reference (List results); Troubleshooting (red banner); FAQ 15 and 74.

Avoid: Saying the extension displays that init sentence in the banner.

### E8. Wrong folder in a multi-root workspace

Question: I have two folders open. The list matches the other repo.

Expected: Only `workspaceFolders[0]` is used. Settings cannot point at the second folder. Open the repo alone or put it first, then Refresh.

Sections: Configuration (workspace folder); Troubleshooting (two projects); FAQ 32.

Avoid: Inventing a folder picker.

### E9. Archive confirmation

Question: What exactly happens if I click Archive?

Expected: Modal text `Archive "<name>" and merge into main specs?` with button `Archive`. Confirm runs `archive "<name>" -y --json`. Dismiss does nothing. The extension does not copy `/opsx:archive`, does not back up files, and cannot undo. File effects are OpenSpec's.

Sections: User guide (Archive); FAQ 55–57.

Avoid: Describing a detailed spec-merge algorithm, or offering an Undo button.

### E10. Hidden icon and reset

Question: I hid the icon. A friend said to run the reset command. Is that safe?

Expected: Hiding does not uninstall. Prefer the activity-bar checkbox or **OpenSpec: Move to Left Sidebar**. Reset runs `workbench.action.resetViewLocations` for the whole window, then toasts `OpenSpec sidebar restored.` It can move other views. It does not delete `openspec/`.

Sections: User guide (where the view can sit); Troubleshooting (icon gone); FAQ 71 and 73.

Avoid: Calling reset a data wipe, or saying it only affects OpenSpec.

### E11. No proposals after a successful chat

Question: The agent said it created the change. The panel still says there are no proposals.

Expected: The list does not watch the disk. Click Refresh. Confirm the files are in the first folder and not only under `archive`. Stores are invisible because `--store` is never passed.

Sections: User guide (Refresh); Troubleshooting (no proposals); FAQ 28 and 80.

Avoid: Telling them to restart the CLI daemon. There isn't one in this extension.

### E12. Loading forever

Question: The proposals box has said Loading for several minutes.

Expected: The first paint waits on `list` with no timeout. Run the same node and `openspec.js` in a terminal. If that hangs, the panel will too. If `activate` is missing, the extension is not running or the engine rejected it.

Sections: Troubleshooting (Loading); Reference (exec has no timeout).

Avoid: Suggesting they delete `out/` or `openspec/` as the first step.

## Cases that must not be invented

### U1. Removed or nonexistent setting

Question: Where do I turn on `openspec.autoSubmitChat` so Archive submits the agent prompt?

Expected: That key is not in version 0.0.1. Archive does not use the clipboard or chat. Do not give JSON for the setting.

Sections: Configuration (settings that do not exist); Roadmap.

Uncertainty: Abstain. Do not suggest a hidden `settings.json` key.

### U2. Nonexistent control

Question: I can't find the **Send to agent** button next to Apply.

Expected: There is no such button. Apply copies. The user pastes.

Sections: Product; User guide (Apply); FAQ 44.

Uncertainty: Abstain. Do not describe a right-click menu that sends chat.

### U3. Unsupported delete

Question: How do I delete a proposal without archiving it?

Expected: The panel has no delete action. It does not remove directories except whatever `openspec archive` does after confirmation. Do not invent a trash icon.

Sections: Roadmap; FAQ 55.

Uncertainty: Point at OpenSpec docs if they want a CLI-only removal, and say this extension has no such command. Do not invent `openspec delete`.

### U4. Ambiguous blank UI

Question: It's blank.

Expected: Ask whether they mean the webview stuck on `Loading...`, a missing activity-bar icon, an Extension Development Host with no folder, or a red banner. Do not reset view locations or reinstall as the first step.

Sections: Symptom index; Troubleshooting.

Uncertainty: Ask which of those they see, and which window (normal vs F5).

### U5. Unverified CLI version

Question: I have `@fission-ai/openspec` 1.14.3. Does `list --json` still use `completedTasks` and exit 1 when the folder is missing?

Expected: Those details were checked on CLI 1.5.0 only. The extension still runs the same arguments and still drops stdout on a non-zero exit. Ask them to run `openspec list --json` and `openspec --version`. Do not claim 1.14.3's schema.

Sections: Reference (opening compatibility note); AI instructions (version questions).

Uncertainty: Abstain on the 1.14.3 schema. State the extension's parser.

### U6. OpenSpec internals

Question: Explain exactly how `openspec archive` merges delta specs into `openspec/specs`, line by line.

Expected: This extension does not implement that merge. It runs the CLI with `-y --json` after a modal. Direct them to https://openspec.dev/docs and https://github.com/Fission-AI/OpenSpec. Do not reconstruct the merge algorithm from the npm readme example.

Sections: Product; User guide (Archive); AI instructions (external-tool rules).

Uncertainty: Upstream referral is the correct outcome.

### U7. Project-specific command spelling

Question: Without looking at my repo, tell me whether my Cursor project expects `/opsx:propose` or `/opsx-propose`.

Expected: The extension always copies the colon form. OpenSpec's docs say Cursor often generates the hyphen form. The actual files from `openspec init` decide. Ask them to check those files or the init output. Do not pick one as a fact about their repo.

Sections: Getting started; User guide (Chat); FAQ 46.

Uncertainty: Ask for the generated command filename or the init transcript.

### U8. Fake error code

Question: What does error `E_OPENSPEC_42` in the red banner mean?

Expected: The extension has no such code. Banners are `Command failed: ...`, `Open a project folder first.`, or a CLI status message when exit code is 0. Ask for the exact banner text.

Sections: Reference (exact strings).

Uncertainty: Abstain. Request the real text.

### U9. Marketplace and license

Question: What is the Marketplace listing URL and the SPDX license for this extension?

Expected: This repository does not publish a Marketplace listing and does not include a license file. Do not borrow MIT from the OpenSpec package.

Sections: Product; FAQ 5 and 10; Development (Publishing).

Uncertainty: State the absence. Do not link a guessed marketplace item.

### U10. Undo after archive

Question: I clicked Archive by mistake. Which extension command restores the change?

Expected: None. Success means the CLI exited 0. Restore from git or a backup. Do not recommend deleting `openspec/specs` as undo.

Sections: Troubleshooting (archive succeeded); FAQ 57; Roadmap.

Uncertainty: Not applicable beyond "no extension undo". File recovery depends on their VCS, which this guide cannot see.
