import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const sources = [
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

function read(rel) {
    const full = path.join(root, rel);
    if (!fs.existsSync(full)) {
        throw new Error(`Missing documentation source: ${rel}`);
    }
    return fs.readFileSync(full, 'utf8').replace(/\r\n/g, '\n').replace(/\s+$/, '');
}

function firstHeading(markdown) {
    const match = markdown.match(/^#\s+(.+)$/m);
    if (!match) {
        throw new Error('Documentation source is missing an h1 heading');
    }
    return match[1].trim();
}

function slug(text) {
    return text
        .toLowerCase()
        .replace(/<[^>]+>/g, '')
        .replace(/[`*_]/g, '')
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .trim()
        .replace(/\s+/g, '-');
}

function rewriteLinks(markdown, slugByFile) {
    return markdown.replace(/\]\((?:\.\.\/|\.\/)?([A-Za-z0-9_.-]+\.md)(#[^)\s]+)?\)/g, (full, file, hash) => {
        const key = file.toLowerCase();
        const target = slugByFile.get(key);
        if (!target) {
            return full;
        }
        return `](${hash || `#${target}`})`;
    });
}

function collectHeadings(markdown) {
    const lines = [];
    for (const line of markdown.split('\n')) {
        const match = /^(#{2,3})\s+(.+)$/.exec(line);
        if (match) {
            lines.push({ level: match[1].length, text: match[2].trim() });
        }
    }
    return lines;
}

export function buildAiSupport() {
    const pkg = JSON.parse(read('package.json'));
    const bodies = sources.map((rel) => ({ rel, body: read(rel) }));
    const slugByFile = new Map();
    for (const item of bodies) {
        const base = path.basename(item.rel);
        slugByFile.set(base.toLowerCase(), slug(firstHeading(item.body)));
    }

    const rewritten = bodies.map((item) => ({
        ...item,
        body: rewriteLinks(item.body, slugByFile),
        title: firstHeading(item.body),
    }));

    const indexParts = ['## Topic index', ''];
    indexParts.push('Headings below are the sections inside this file. Search for the heading text if a link does not scroll.');
    indexParts.push('');
    for (const item of rewritten) {
        indexParts.push(`- [${item.title}](#${slug(item.title)})`);
        for (const heading of collectHeadings(item.body)) {
            const indent = heading.level === 3 ? '    ' : '  ';
            indexParts.push(`${indent}- ${heading.text}`);
        }
    }

    const header = `# AI-SUPPORT — OpenSpec Sidebar

This file is the self-contained support knowledge base for the **OpenSpec Sidebar** extension. It is generated from the files under \`docs/\`. Do not edit it by hand. Rebuild it with \`npm run docs:build\`.

| Item | Value |
| --- | --- |
| Extension version | ${pkg.version} |
| Extension id | ${pkg.publisher}.${pkg.name} |
| Display name | ${pkg.displayName} |
| Engine requirement | \`${pkg.engines.vscode}\` |
| Repository | https://github.com/dobrado76/cursor-openspec-extension |
| Issue tracker | https://github.com/dobrado76/cursor-openspec-extension/issues |

The extension version comes from \`package.json\`. There is no separate changelog of released behavior beyond the initial unreleased entry in \`CHANGELOG.md\`. OpenSpec CLI details that this knowledge base marks as verified were checked against CLI **1.5.0** on 22 October 2026. The npm package \`@fission-ai/openspec\` showed version **1.14.3** on that date. JSON shapes for 1.14.3 were not inspected. Do not assume every OpenSpec release matches 1.5.0.

## How to use this file

A person can read it directly, or download it and attach it to any AI assistant.

An AI assistant must follow **Instructions for AI Assistants** before answering.

### Links when this file is used alone

Links that start with \`#\` point at headings in this file. They are not paths on disk.

In the git repository the same topics also exist as separate files under \`docs/\`. Those repository links are rewritten to in-file headings when this bundle is built.

External products use absolute \`https://\` URLs. This file does not embed the OpenSpec manual.

If an answer depends on the user's Cursor version, OpenSpec version, workspace path, or generated command files, ask for those details. Do not invent them.

Repository for source evidence: https://github.com/dobrado76/cursor-openspec-extension

${indexParts.join('\n')}
`;

    const chunks = [header.trimEnd()];
    for (const item of rewritten) {
        chunks.push(`\n\n<!-- source: ${item.rel} -->\n\n${item.body}`);
    }
    chunks.push('\n');
    return chunks.join('');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const output = path.join(root, 'AI-SUPPORT.md');
    fs.writeFileSync(output, buildAiSupport());
    process.stdout.write(`Wrote ${output}\n`);
}
