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
