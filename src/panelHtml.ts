import * as vscode from 'vscode';

export function getPanelHtml(webview: vscode.Webview, nonce: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';">
    <style>
        * { box-sizing: border-box; }
        body {
            margin: 0;
            padding: 0;
            font-family: var(--vscode-font-family, sans-serif);
            font-size: 12px;
            color: var(--vscode-foreground, #ccc);
            background: var(--vscode-sideBar-background, #252526);
        }
        .wrap { padding: 10px; display: flex; flex-direction: column; gap: 10px; }
        .section-head {
            display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;
        }
        .section-title {
            font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em;
            opacity: 0.6; margin: 0 0 6px;
        }
        .section-head .section-title { margin: 0; }
        .icon-btn {
            background: transparent; border: none; color: inherit; cursor: pointer;
            padding: 4px 6px; border-radius: 4px; opacity: 0.7;
        }
        .icon-btn:hover { background: var(--vscode-toolbar-hoverBackground, #444); opacity: 1; }
        .banner {
            padding: 8px 10px; border-radius: 6px; font-size: 11px; line-height: 1.4;
            background: var(--vscode-inputValidation-warningBackground, #352a05);
            border: 1px solid var(--vscode-inputValidation-warningBorder, #b89500);
            display: none;
        }
        .banner.error {
            background: var(--vscode-inputValidation-errorBackground, #5a1d1d);
            border-color: var(--vscode-inputValidation-errorBorder, #be1100);
        }
        .changes { display: flex; flex-direction: column; gap: 4px; max-height: 140px; overflow-y: auto; }
        .change-item {
            display: flex; flex-direction: column; gap: 4px;
            padding: 8px; border-radius: 6px; cursor: pointer;
            border: 1px solid transparent;
            background: var(--vscode-editor-background, #1e1e1e);
        }
        .change-item:hover { border-color: var(--vscode-focusBorder, #007fd4); }
        .change-item.selected { border-color: var(--vscode-focusBorder, #007fd4); background: var(--vscode-list-activeSelectionBackground, #094771); }
        .change-top { display: flex; justify-content: space-between; align-items: center; gap: 6px; }
        .change-name { font-weight: 600; font-size: 12px; word-break: break-all; }
        .badge {
            font-size: 9px; padding: 2px 6px; border-radius: 10px; text-transform: uppercase;
            background: var(--vscode-badge-background, #4d4d4d);
            color: var(--vscode-badge-foreground, #fff); flex-shrink: 0;
        }
        .badge.done { background: #2d6a4f; }
        .badge.progress { background: #1d4e89; }
        .progress-bar { height: 3px; background: var(--vscode-progressBar-background, #444); border-radius: 2px; overflow: hidden; }
        .progress-fill { height: 100%; background: var(--vscode-progressBar-foreground, #0e70c0); transition: width 0.2s; }
        .meta { font-size: 10px; opacity: 0.55; }
        .artifacts { display: flex; flex-wrap: wrap; gap: 4px; }
        .chip {
            font-size: 10px; padding: 3px 7px; border-radius: 4px;
            background: var(--vscode-badge-background, #333);
        }
        .chip.done { background: #1e4d3a; }
        .chip.pending { background: #4a3f1a; }
        .chip.ready { background: #1a3a5c; }
        .ops { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
        .op-card {
            padding: 8px; border-radius: 6px; cursor: pointer;
            background: var(--vscode-editor-background, #1e1e1e);
            border: 1px solid var(--vscode-widget-border, #333);
            transition: border-color 0.15s, transform 0.1s;
        }
        .op-card:hover { border-color: var(--vscode-focusBorder, #007fd4); transform: translateY(-1px); }
        .op-card:active { transform: translateY(0); }
        .op-card.wide { grid-column: 1 / -1; }
        .op-icon { font-size: 14px; margin-bottom: 4px; }
        .op-title { font-weight: 600; font-size: 11px; margin-bottom: 2px; }
        .op-desc { font-size: 10px; opacity: 0.6; line-height: 1.3; }
        .input-area {
            width: 100%; min-height: 56px; resize: vertical;
            padding: 8px; border-radius: 6px; font-family: inherit; font-size: 12px;
            background: var(--vscode-input-background, #3c3c3c);
            color: var(--vscode-input-foreground, #ccc);
            border: 1px solid var(--vscode-input-border, #3c3c3c);
        }
        .log {
            font-family: var(--vscode-editor-font-family, monospace);
            font-size: 10px; line-height: 1.4; max-height: 100px; overflow-y: auto;
            padding: 8px; border-radius: 6px; white-space: pre-wrap; word-break: break-word;
            background: var(--vscode-terminal-background, #1a1a1a);
            border: 1px solid var(--vscode-panel-border, #333);
            display: none;
        }
        .log.visible { display: block; }
        .hint { font-size: 10px; opacity: 0.55; line-height: 1.4; margin: 0 0 6px; }
        .selected-banner {
            padding: 6px 8px; border-radius: 6px; font-size: 11px;
            background: var(--vscode-input-background, #3c3c3c);
            border: 1px solid var(--vscode-focusBorder, #007fd4);
            display: none;
        }
        .selected-banner.visible { display: block; }
        .selected-banner strong { color: var(--vscode-textLink-foreground, #4daafc); }
        .next-steps { font-size: 10px; opacity: 0.7; line-height: 1.4; margin-top: 4px; }
    </style>
</head>
<body>
    <div class="wrap">
        <div class="banner" id="banner"></div>

        <div>
            <div class="section-head">
                <p class="section-title">Proposals</p>
                <button class="icon-btn" id="refreshBtn" title="Refresh">&#8635;</button>
            </div>
            <p class="hint">Each row is an active OpenSpec change (proposal). Click one to select it — Apply, Verify, and Archive use the selection.</p>
            <div class="selected-banner" id="selectedBanner"></div>
            <div class="changes" id="changesList"><div class="empty">Loading...</div></div>
        </div>

        <div id="statusPanel" style="display:none">
            <p class="section-title">Artifacts</p>
            <div class="artifacts" id="artifacts"></div>
            <div class="next-steps" id="nextSteps"></div>
        </div>

        <div>
            <p class="section-title">New Proposal (Explore / Propose)</p>
            <textarea class="input-area" id="promptInput" placeholder="Describe a feature, e.g. add dark mode toggle..."></textarea>
        </div>

        <div>
            <p class="section-title">Workflow</p>
            <div class="ops">
                <div class="op-card" data-op="explore">
                    <div class="op-icon">&#128269;</div>
                    <div class="op-title">Explore</div>
                    <div class="op-desc">Research &amp; ideation before committing</div>
                </div>
                <div class="op-card" data-op="propose">
                    <div class="op-icon">&#128221;</div>
                    <div class="op-title">Propose</div>
                    <div class="op-desc">Create proposal, design &amp; tasks</div>
                </div>
                <div class="op-card" data-op="apply" data-needs-selection="true">
                    <div class="op-icon">&#9654;</div>
                    <div class="op-title">Apply</div>
                    <div class="op-desc">Implement tasks for selected proposal</div>
                </div>
                <div class="op-card" data-op="verify" data-needs-selection="true">
                    <div class="op-icon">&#10003;</div>
                    <div class="op-title">Verify</div>
                    <div class="op-desc">Validate specs &amp; run QA checks</div>
                </div>
                <div class="op-card wide" data-op="archive" data-needs-selection="true">
                    <div class="op-icon">&#128230;</div>
                    <div class="op-title">Archive</div>
                    <div class="op-desc">Close out change &amp; merge into main specs</div>
                </div>
            </div>
        </div>

        <div class="log" id="log"></div>
    </div>

    <script nonce="${nonce}">
        const vscode = acquireVsCodeApi();
        let state = { changes: [], selectedChange: null, status: null, error: null };

        document.getElementById('refreshBtn').addEventListener('click', () => {
            vscode.postMessage({ command: 'refresh' });
        });

        document.getElementById('promptInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                vscode.postMessage({ command: 'runOperation', op: 'propose', text: e.target.value.trim(), change: state.selectedChange });
            }
        });

        document.querySelectorAll('.op-card').forEach(card => {
            card.addEventListener('click', () => {
                const op = card.dataset.op;
                const text = document.getElementById('promptInput').value.trim();
                vscode.postMessage({ command: 'runOperation', op, text, change: state.selectedChange });
            });
        });

        window.addEventListener('message', (event) => {
            const msg = event.data;
            if (msg.command === 'updateState') {
                state = { ...state, ...msg.data };
                render();
            }
            if (msg.command === 'log') {
                const log = document.getElementById('log');
                log.textContent = msg.text;
                log.classList.add('visible');
            }
            if (msg.command === 'toast') {
                // handled by extension host
            }
        });

        function render() {
            const banner = document.getElementById('banner');
            if (state.error) {
                banner.textContent = state.error;
                banner.className = 'banner error';
                banner.style.display = 'block';
            } else {
                banner.style.display = 'none';
            }

            const list = document.getElementById('changesList');
            const selectedBanner = document.getElementById('selectedBanner');
            if (!state.changes?.length) {
                list.innerHTML = '<div class="empty">No proposals yet. Use Propose to create one.</div>';
                selectedBanner.classList.remove('visible');
            } else {
                list.innerHTML = state.changes.map(c => {
                    const pct = c.totalTasks ? Math.round((c.completedTasks / c.totalTasks) * 100) : 0;
                    const selected = state.selectedChange === c.name ? 'selected' : '';
                    const badgeClass = c.status === 'complete' ? 'done' : 'progress';
                    return \`<div class="change-item \${selected}" data-change="\${c.name}" title="Click to select this proposal">
                        <div class="change-top">
                            <span class="change-name">\${c.name}</span>
                            <span class="badge \${badgeClass}">\${c.status}</span>
                        </div>
                        <div class="progress-bar"><div class="progress-fill" style="width:\${pct}%"></div></div>
                        <div class="meta">\${c.completedTasks}/\${c.totalTasks} implementation tasks</div>
                    </div>\`;
                }).join('');

                list.querySelectorAll('.change-item').forEach(el => {
                    el.addEventListener('click', () => {
                        vscode.postMessage({ command: 'selectChange', change: el.dataset.change });
                    });
                });

                if (state.selectedChange) {
                    selectedBanner.innerHTML = 'Selected: <strong>' + state.selectedChange + '</strong> — Apply / Verify / Archive target this proposal';
                    selectedBanner.classList.add('visible');
                } else {
                    selectedBanner.classList.remove('visible');
                }
            }

            document.querySelectorAll('.op-card[data-needs-selection]').forEach(card => {
                card.style.opacity = state.selectedChange ? '1' : '0.45';
            });

            const statusPanel = document.getElementById('statusPanel');
            const artifactsEl = document.getElementById('artifacts');
            const nextStepsEl = document.getElementById('nextSteps');

            if (state.status) {
                statusPanel.style.display = 'block';
                artifactsEl.innerHTML = state.status.artifacts.map(a =>
                    \`<span class="chip \${a.status}">\${a.id}: \${a.status}</span>\`
                ).join('');
                nextStepsEl.textContent = state.status.nextSteps?.join(' ') || '';
            } else {
                statusPanel.style.display = 'none';
            }
        }

        vscode.postMessage({ command: 'ready' });
    </script>
</body>
</html>`;
}
