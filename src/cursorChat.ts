import * as vscode from 'vscode';

export async function copySlashCommand(command: string): Promise<void> {
    await vscode.env.clipboard.writeText(command);
}
