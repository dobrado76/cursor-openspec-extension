import * as cp from 'child_process';
import * as vscode from 'vscode';
import { promisify } from 'util';

const execAsync = promisify(cp.exec);

export interface ChangeSummary {
    name: string;
    status: string;
    completedTasks: number;
    totalTasks: number;
    lastModified: string;
}

export interface ArtifactStatus {
    id: string;
    status: string;
    outputPath: string;
}

export interface ChangeStatus {
    changeName: string;
    isComplete: boolean;
    artifacts: ArtifactStatus[];
    nextSteps: string[];
    applyRequires: string[];
    artifactPaths: Record<string, { existingOutputPaths: string[] }>;
}

export interface ListResult {
    changes: ChangeSummary[];
    error?: string;
    initialized: boolean;
}

export class OpenSpecCli {
    private getPaths(): { nodeExe: string; openspecJs: string } {
        const config = vscode.workspace.getConfiguration('openspec');
        const nodeExe = config.get<string>('nodePath') || process.execPath;
        const openspecJs = config.get<string>('cliPath')
            || 'C:\\nvm4w\\nodejs\\node_modules\\@fission-ai\\openspec\\bin\\openspec.js';
        return { nodeExe, openspecJs };
    }

    private getCwd(): string {
        const folders = vscode.workspace.workspaceFolders;
        if (!folders?.length) {
            throw new Error('Open a project folder first.');
        }
        return folders[0].uri.fsPath;
    }

    async run(args: string): Promise<{ stdout: string; stderr: string }> {
        const { nodeExe, openspecJs } = this.getPaths();
        const cmd = `"${nodeExe}" "${openspecJs}" ${args}`;
        const result = await execAsync(cmd, {
            cwd: this.getCwd(),
            maxBuffer: 10 * 1024 * 1024
        });
        return { stdout: result.stdout, stderr: result.stderr };
    }

    async listChanges(): Promise<ListResult> {
        try {
            const { stdout } = await this.run('list --json');
            const data = JSON.parse(stdout);
            const errorStatus = data.status?.find((s: { severity: string }) => s.severity === 'error');
            if (errorStatus) {
                return { changes: [], error: errorStatus.message, initialized: false };
            }
            return { changes: data.changes ?? [], initialized: true };
        } catch (err) {
            return { changes: [], error: (err as Error).message, initialized: false };
        }
    }

    async getStatus(changeName: string): Promise<ChangeStatus | null> {
        try {
            const { stdout } = await this.run(`status --change "${changeName}" --json`);
            const data = JSON.parse(stdout);
            return {
                changeName: data.changeName,
                isComplete: data.isComplete,
                artifacts: data.artifacts ?? [],
                nextSteps: data.nextSteps ?? [],
                applyRequires: data.applyRequires ?? [],
                artifactPaths: data.artifactPaths ?? {}
            };
        } catch {
            return null;
        }
    }

    async validate(changeName: string): Promise<{ ok: boolean; output: string }> {
        try {
            const { stdout } = await this.run(`validate "${changeName}" --json --no-interactive`);
            const data = JSON.parse(stdout);
            const ok = data.valid !== false && !data.errors?.length;
            return { ok, output: stdout };
        } catch (err) {
            return { ok: false, output: (err as Error).message };
        }
    }

    async archive(changeName: string): Promise<{ ok: boolean; output: string }> {
        try {
            const { stdout } = await this.run(`archive "${changeName}" -y --json`);
            return { ok: true, output: stdout };
        } catch (err) {
            return { ok: false, output: (err as Error).message };
        }
    }
}
