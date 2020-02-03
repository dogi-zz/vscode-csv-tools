import * as vscode from 'vscode';

export class CsvExtension {

    format(code: string) {
        let lines = code.split('\n').map(line => line.split(';'));
        let colWiths: number[] = [];
        lines.forEach(line => {
            line.forEach((col, idx) => {
                while (colWiths.length <= idx) { colWiths.push(0); }
                colWiths[idx] = Math.max(colWiths[idx], col.length);
            });
        });
        lines.forEach(line => {
            line.forEach((col, idx) => {
                while (col.length < colWiths[idx]) { col += ' '; }
                line[idx] = col;
            });
        });
        return lines.map(line => line.join(';')).join('\n');
    }

    
    compress(code: string) {
        let lines = code.split('\n').map(line => line.split(';').map(col => col.trim()));
        return lines.map(line => line.join(';')).join('\n');
    }

}