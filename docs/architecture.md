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

The extension runs whatever executable `openspec.nodePath` names, with the script path and the arguments listed in [reference.md](reference.md). Pointing the setting at an unexpected program runs that program. That is the same trust level as a user-controlled setting in the editor.

## Tests

`src/test/extension.test.ts` is the generator sample. It asserts that `indexOf` cannot find `5` or `0` in `[1, 2, 3]`. It does not import the extension. `package.json` has no `test` script. A green sample test would not prove the panel works.
