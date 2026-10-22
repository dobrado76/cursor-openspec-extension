# OpenSpec Sidebar

A Cursor and VS Code extension that adds an **OpenSpec Toolkit** view for [OpenSpec](https://github.com/Fission-AI/OpenSpec) projects. It lists active changes, shows artifact status from the OpenSpec CLI, copies `/opsx:*` slash commands to the clipboard, and can validate or archive the selected change.

Extension id: `local.openspec-sidebar`. Version **0.0.1**. This repository is the extension. There is no nested package to install.

## Need help? Ask an AI assistant

The full support guide, FAQ, and troubleshooting notes are in [`AI-SUPPORT.md`](AI-SUPPORT.md). That file is meant to be downloaded and used on its own.

1. Download [`AI-SUPPORT.md`](AI-SUPPORT.md) from this repository.
2. Upload or attach it in the AI assistant you prefer.
3. Ask your question, or describe what the panel did, in your own words.

Tell the assistant to follow that file and not to invent buttons, settings, or fixes that the guide does not describe. OpenSpec's own behavior stays in the OpenSpec docs. The guide only covers this extension and the boundary with the CLI.

Shorter pages, if you would rather read than upload the whole file:

- [Getting started](docs/getting-started.md)
- [User guide](docs/user-guide.md)
- [FAQ](docs/FAQ.md)
- [Troubleshooting](docs/troubleshooting.md)
- [Documentation index](docs/README.md)

If the guide does not resolve a defect in this extension, open an issue at https://github.com/dobrado76/cursor-openspec-extension/issues when Issues are enabled. Include the editor version, extension version `0.0.1`, operating system, `openspec --version`, and the exact banner or toast text with usernames and secrets removed. This repository does not promise a reply or a support desk. Problems inside the OpenSpec CLI belong at https://github.com/Fission-AI/OpenSpec/issues.

## What you can do in the panel

| Action | Result in 0.0.1 |
| --- | --- |
| Refresh the list | Runs `openspec list --json` in the first workspace folder |
| Explore, Propose, Apply | Copies a slash command. You paste it into chat. |
| Verify | Runs `openspec validate`, then copies `/opsx:verify` |
| Archive | Asks you to confirm, then runs `openspec archive ... -y` |

The panel does not fill the chat prompt, run `openspec init`, or edit spec files itself.

## Requirements

- Cursor or VS Code engine `^1.105.0`
- Node.js and the OpenSpec CLI, installed using https://openspec.dev/docs
- `openspec.nodePath` and `openspec.cliPath` set to a real `node` binary and to `openspec.js`. Empty values are not auto-detected. See [docs/configuration.md](docs/configuration.md).
- The project folder opened in the editor. The extension uses only the first workspace root.

## Install

```bash
npm install
npm run package
```

Install `openspec-sidebar-0.0.1.vsix` from Extensions → **Install from VSIX...**, then reload the window. Open the initialized project, click the **OpenSpec Toolkit** document icon, and set the two paths if the banner starts with `Command failed:`.

Press **F5** and choose **Run Extension** only when you are developing this repository. That opens a second window. It does not install the extension into your everyday Cursor window.

## Documentation maintenance

```bash
npm run docs:build
npm run docs:check
```

`AI-SUPPORT.md` is generated. Edit the files in `docs/`, then rebuild. There is no CI workflow in this repository. `npm run docs:check` is the local freshness check.
