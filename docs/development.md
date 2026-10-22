# Development

Work from the repository root. The extension is this repository, not a nested `openspec-sidebar/` package. Older notes that tell you to `cd openspec-sidebar` are wrong for the current tree.

Repository: https://github.com/dobrado76/cursor-openspec-extension

## Build

Requirements for building: Node.js and npm. The `typescript` and `@types/vscode` versions are the devDependencies in `package.json` (`typescript` 6.x and `@types/vscode` `^1.105.0` at the time of writing).

```bash
npm install
npm run compile
```

`npm run compile` is `tsc -p ./`. Output goes to `out/`. `npm run watch` is `tsc -watch -p ./`.

`vscode:prepublish` also runs `npm run compile`, and `npm run package` invokes vsce, which runs prepublish.

```bash
npm run package
```

That executes `npx @vscode/vsce package --allow-missing-repository --no-dependencies`. `--allow-missing-repository` is required because `package.json` has no `repository` field. The `.vsix` is gitignored.

`.vscodeignore` excludes source TypeScript, tests, and source maps from the package. The installed extension runs the compiled `out/` files plus `package.json`, `media/`, and the readme-class files vsce includes.

## Debug

`.vscode/launch.json` has one configuration, **Run Extension**.

- `type`: `extensionHost`
- `--extensionDevelopmentPath=${workspaceFolder}`
- `outFiles`: `${workspaceFolder}/out/**/*.js`
- `preLaunchTask`: the default build task

`.vscode/tasks.json` makes **npm: watch** the default build task. It is a background `tsc-watch` task and does not reveal the terminal.

Press **F5**, or start **Run Extension**. A second window opens. Open the target project with File → Open Folder in that window. This repository does not contain `openspec/changes` unless you create it, so the panel will not list proposals if the host window is this repo.

Breakpoints in `src/*.ts` work through the source map (`sourceMap` is true, `rootDir` is `src`).

Reload the host window after a compile if the running process has not picked up the change. Watch mode recompiles on save, but the extension host keeps the old `out/` evaluation until reload.

## Lint

`eslint.config.mjs` enables a small TypeScript ruleset (`semi`, `eqeqeq`, `curly`, `no-throw-literal`, and a naming rule for imports). There is no `npm run lint` script. Recommended editor extensions are in `.vscode/extensions.json`: ESLint and the VS Code extension test runner.

## Tests

Do not treat the sample test as coverage. See [architecture.md](architecture.md). The test runner config is `.vscode-test.mjs`, which looks at `out/test/**/*.test.js`. There is no `npm test` script. Running the sample only proves the test harness can execute.

## Documentation

User-support docs live in `docs/`. The generated bundle is `AI-SUPPORT.md` at the repository root.

```bash
npm run docs:build
npm run docs:check
```

`docs:build` rewrites `AI-SUPPORT.md` from the source list in `scripts/build-ai-support.mjs`. `docs:check` rebuilds in memory, compares it to the committed file, and fails if they differ. The check does not write `AI-SUPPORT.md`. It can write a temp copy only when reporting a mismatch.

`docs/support-evaluation.md` is not part of the bundle.

When behavior changes, update the matching doc in the same change and run `npm run docs:build` before committing. The maintenance rule is `.cursor/rules/documentation.mdc`.

There is no GitHub Actions workflow in this repository. `npm run docs:check` is the local freshness check. It was not added to CI because no CI exists.

## Package layout

```text
package.json          extension manifest
src/extension.ts      activation, commands, operations
src/openspecCli.ts    CLI exec and JSON handling
src/cursorChat.ts     clipboard write
src/panelHtml.ts      webview document
media/icon.svg
scripts/build-ai-support.mjs
scripts/check-ai-support.mjs
docs/                 support sources
AI-SUPPORT.md         generated bundle
```

## Publishing

There is no `vsce publish` script, no `publisher` other than `local`, and no license file. Installing the `.vsix` with **Install from VSIX...** is the supported distribution method in this repository.
