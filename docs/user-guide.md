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
