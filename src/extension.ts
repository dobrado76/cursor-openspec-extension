import * as vscode from 'vscode';
import { copySlashCommand } from './cursorChat';
import { OpenSpecCli } from './openspecCli';
import { getPanelHtml } from './panelHtml';

const VIEW_ID = 'openspec.sidebarView';
const CONTAINER_ID = 'openspec-sidebar-container';

const OPS: Record<string, { label: string; phase: string; slash: (change?: string, text?: string) => string }> = {
    explore: {
        label: 'Explore',
        phase: 'Research & Ideation',
        slash: (change, text) => `/opsx:explore ${text || change || ''}`.trim()
    },
    propose: {
        label: 'Propose',
        phase: 'Requirement Definition',
        slash: (_change, text) => `/opsx:propose ${text || ''}`.trim()
    },
    apply: {
        label: 'Apply',
        phase: 'Source Code Generation',
        slash: (change) => (change ? `/opsx:apply ${change}` : '/opsx:apply')
    },
    verify: {
        label: 'Verify',
        phase: 'Quality Assurance',
        slash: (change) => (change ? `/opsx:verify ${change}` : '/opsx:verify')
    }
};

export function activate(context: vscode.ExtensionContext) {
    console.log('OpenSpec Sidebar: activate');

    const cli = new OpenSpecCli();
    const provider = new OpenSpecSidebarProvider(context.extensionUri, cli);

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(VIEW_ID, provider),
        vscode.commands.registerCommand('openspec.showSidebar', () => showSidebar()),
        vscode.commands.registerCommand('openspec.resetSidebar', () => resetSidebar()),
        vscode.commands.registerCommand('openspec.moveToSidebar', () => moveToSidebar())
    );
}

async function showSidebar(): Promise<void> {
    try {
        await vscode.commands.executeCommand('workbench.views.openView', VIEW_ID);
    } catch {
        await vscode.commands.executeCommand(`workbench.view.extension.${CONTAINER_ID}`);
        await vscode.commands.executeCommand(`${VIEW_ID}.focus`);
    }
}

async function resetSidebar(): Promise<void> {
    await vscode.commands.executeCommand('workbench.action.resetViewLocations');
    await showSidebar();
    vscode.window.showInformationMessage('OpenSpec sidebar restored.');
}

async function moveToSidebar(): Promise<void> {
    await showSidebar();
    try {
        await vscode.commands.executeCommand('workbench.action.moveFocusedViewToSideBar');
    } catch {
        await resetSidebar();
    }
}

class OpenSpecSidebarProvider implements vscode.WebviewViewProvider {
    private _view?: vscode.WebviewView;
    private _selectedChange?: string;

    constructor(
        private readonly _extensionUri: vscode.Uri,
        private readonly _cli: OpenSpecCli
    ) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        _context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        webviewView.webview.html = this._getHtml(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(async (message) => {
            switch (message.command) {
                case 'ready':
                case 'refresh':
                    await this.refreshState();
                    break;
                case 'selectChange':
                    this._selectedChange = message.change;
                    await this.refreshState();
                    break;
                case 'runOperation':
                    await this.runOperation(message.op, message.change, message.text);
                    break;
            }
        });

        webviewView.onDidChangeVisibility(() => {
            if (webviewView.visible) {
                this.refreshState();
            }
        });
    }

    private async refreshState(): Promise<void> {
        if (!this._view) {
            return;
        }

        const list = await this._cli.listChanges();
        let status = null;

        if (this._selectedChange) {
            status = await this._cli.getStatus(this._selectedChange);
        } else if (list.changes.length) {
            this._selectedChange = list.changes[0].name;
            status = await this._cli.getStatus(this._selectedChange);
        }

        this._view.webview.postMessage({
            command: 'updateState',
            data: {
                changes: list.changes,
                selectedChange: this._selectedChange,
                status,
                error: list.error
            }
        });
    }

    private async runOperation(op: string, change?: string, text?: string): Promise<void> {
        const activeChange = change || this._selectedChange;

        if (op === 'archive') {
            await this.runArchive(activeChange);
            return;
        }

        if (op === 'verify') {
            await this.runVerify(activeChange);
            return;
        }

        if (op === 'propose' && !text?.trim()) {
            this.postLog('Enter a feature description in the input box first.');
            vscode.window.showWarningMessage('Enter a feature description for Propose.');
            return;
        }

        if ((op === 'apply' || op === 'verify') && !activeChange) {
            this.postLog('Select a proposal from the list first.');
            vscode.window.showWarningMessage('Select a proposal from the list first.');
            return;
        }

        const opDef = OPS[op];
        if (opDef) {
            const slash = opDef.slash(activeChange, text?.trim());
            await this.copySlashCommand(slash, opDef.label);
        }
    }

    private async runVerify(change?: string): Promise<void> {
        if (!change) {
            this.postLog('Select a change to verify.');
            return;
        }

        this.postLog(`Validating "${change}"...`);
        const result = await this._cli.validate(change);
        this.postLog(result.output);

        if (result.ok) {
            vscode.window.showInformationMessage(`Verify passed for "${change}".`);
        } else {
            vscode.window.showWarningMessage(`Verify found issues for "${change}". See log in sidebar.`);
        }

        await this.copySlashCommand(
            OPS.verify.slash(change),
            'Verify',
            'CLI results are in the log below.'
        );
    }

    private async runArchive(change?: string): Promise<void> {
        if (!change) {
            vscode.window.showWarningMessage('Select a change to archive.');
            return;
        }

        const confirm = await vscode.window.showWarningMessage(
            `Archive "${change}" and merge into main specs?`,
            { modal: true },
            'Archive'
        );

        if (confirm !== 'Archive') {
            return;
        }

        this.postLog(`Archiving "${change}"...`);
        const result = await this._cli.archive(change);
        this.postLog(result.output);

        if (result.ok) {
            vscode.window.showInformationMessage(`"${change}" archived successfully.`);
            this._selectedChange = undefined;
            await this.refreshState();
        } else {
            vscode.window.showErrorMessage(`Archive failed: ${result.output}`);
        }
    }

    private async copySlashCommand(
        command: string,
        label: string,
        extraNote?: string
    ): Promise<void> {
        await copySlashCommand(command);
        this.postLog(`Copied: ${command}`);
        const note = extraNote ? ` ${extraNote}` : '';
        vscode.window.showInformationMessage(
            `${label} copied to clipboard — paste in chat with Ctrl+L.${note}`
        );
    }

    private postLog(text: string): void {
        this._view?.webview.postMessage({ command: 'log', text });
    }

    private _getHtml(webview: vscode.Webview): string {
        return getPanelHtml(webview, getNonce());
    }
}

function getNonce(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let nonce = '';
    for (let i = 0; i < 32; i++) {
        nonce += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return nonce;
}
