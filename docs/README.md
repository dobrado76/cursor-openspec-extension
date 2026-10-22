# Documentation

These files are the support source for OpenSpec Sidebar. The file a user should hand to an AI assistant is not in this folder. It is [`AI-SUPPORT.md`](../AI-SUPPORT.md) at the repository root, built from the sources below.

| File | Read it for |
| --- | --- |
| [product.md](product.md) | What the extension is and what it refuses to do |
| [getting-started.md](getting-started.md) | Install the CLI, configure paths, install the `.vsix`, confirm the panel |
| [user-guide.md](user-guide.md) | Every control in OpenSpec Toolkit |
| [configuration.md](configuration.md) | `openspec.nodePath` and `openspec.cliPath` |
| [reference.md](reference.md) | Exact commands, toasts, JSON handling, limits |
| [troubleshooting.md](troubleshooting.md) | Symptom, cause, check, fix |
| [FAQ.md](FAQ.md) | Standalone questions and answers |
| [architecture.md](architecture.md) | Processes, state, and trust boundary |
| [development.md](development.md) | Compile, debug, package, doc commands |
| [roadmap.md](roadmap.md) | What 0.0.1 does, and what is not promised |
| [symptom-index.md](symptom-index.md) | Short jump list used at the top of the bundle |
| [ai-instructions.md](ai-instructions.md) | Rules for an assistant using the bundle |
| [support-evaluation.md](support-evaluation.md) | Maintainer scenarios. Not copied into `AI-SUPPORT.md` |

Rebuild and check:

```bash
npm run docs:build
npm run docs:check
```

`docs:check` fails if `AI-SUPPORT.md` does not match the sources. It does not rewrite that file.

OpenSpec's own manual is not copied here. Use https://openspec.dev/docs.
