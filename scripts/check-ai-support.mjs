import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildAiSupport } from './build-ai-support.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function fail(message) {
    process.stderr.write(`${message}\n`);
    process.exitCode = 1;
}

const expectedMarkers = [
    'docs/symptom-index.md',
    'docs/ai-instructions.md',
    'docs/product.md',
    'docs/getting-started.md',
    'docs/user-guide.md',
    'docs/configuration.md',
    'docs/reference.md',
    'docs/troubleshooting.md',
    'docs/FAQ.md',
    'docs/architecture.md',
    'docs/development.md',
    'docs/roadmap.md',
];

for (const rel of expectedMarkers) {
    if (!fs.existsSync(path.join(root, rel))) {
        fail(`Missing source document: ${rel}`);
    }
}

const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
if (!readme.includes('](AI-SUPPORT.md)')) {
    fail('README.md is missing a direct link to AI-SUPPORT.md');
}
if (!/## Need help\? Ask an AI assistant/.test(readme)) {
    fail('README.md is missing the AI-assisted help section');
}

const generated = buildAiSupport();
const committedPath = path.join(root, 'AI-SUPPORT.md');
if (!fs.existsSync(committedPath)) {
    fail('AI-SUPPORT.md is missing. Run npm run docs:build');
} else {
    const committed = fs.readFileSync(committedPath, 'utf8').replace(/\r\n/g, '\n');
    if (committed !== generated) {
        const temp = path.join(os.tmpdir(), 'AI-SUPPORT.generated.md');
        fs.writeFileSync(temp, generated);
        fail(`AI-SUPPORT.md is stale. Run npm run docs:build and commit the result. A comparison copy was written to ${temp}`);
    }
}

if (process.exitCode) {
    process.exit(process.exitCode);
}

const bundled = fs.readFileSync(committedPath, 'utf8');
for (const rel of expectedMarkers) {
    const marker = `<!-- source: ${rel} -->`;
    const count = bundled.split(marker).length - 1;
    if (count !== 1) {
        fail(`Expected exactly one marker for ${rel}, found ${count}`);
    }
}

const forbidden = ['docs/support-evaluation.md'];
for (const rel of forbidden) {
    if (bundled.includes(`<!-- source: ${rel} -->`)) {
        fail(`${rel} must not be bundled into AI-SUPPORT.md`);
    }
}

const docsDir = path.join(root, 'docs');
for (const name of fs.readdirSync(docsDir)) {
    if (!name.endsWith('.md')) {
        continue;
    }
    const filePath = path.join(docsDir, name);
    const text = fs.readFileSync(filePath, 'utf8');
    const links = text.matchAll(/\]\((?!https?:)([^)\s]+\.md)(?:#[^)\s]+)?\)/g);
    for (const match of links) {
        const target = path.resolve(path.dirname(filePath), match[1]);
        if (!fs.existsSync(target)) {
            fail(`${name} links to missing file ${match[1]}`);
        }
    }
}

if (process.exitCode) {
    process.exit(process.exitCode);
}

process.stdout.write('Documentation check passed.\n');
