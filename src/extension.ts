import * as vscode from 'vscode';
import { CsvExtension } from './extension/csv-extension';

const fs = require('fs');

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "dogi-scsv" is now active!');

	const csvExtension = new CsvExtension();

	let disposable1 = vscode.commands.registerCommand('dogi-scsv.unformat', (...args: any[]) => {
		if (vscode.window.activeTextEditor) {
			let document = vscode.window.activeTextEditor.document;
	
			let compressedCode = csvExtension.compress(document.getText());

			let fullRange = new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length));
			vscode.window.activeTextEditor.edit(edit => edit.replace(fullRange, <string>compressedCode));
		}
	});

	let disposable2 = vscode.commands.registerCommand('dogi-scsv.shrink', (...args: any[]) => {
		if (vscode.window.activeTextEditor) {
			let document = vscode.window.activeTextEditor.document;
	
			let compressedCode = csvExtension.compress(document.getText());
			let formatetCode = csvExtension.format(compressedCode);

			let fullRange = new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length));
			vscode.window.activeTextEditor.edit(edit => edit.replace(fullRange, <string>formatetCode));
		}
	});

	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);


	// ============================		
	// ==== FORMATTER =============
	// ============================

	vscode.languages.registerDocumentFormattingEditProvider({ scheme: 'file', language: 'scsv' }, {
		provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {

			let formatetCode = csvExtension.format(document.getText());
			let fullRange = new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length));
			return [
				vscode.TextEdit.replace(fullRange, formatetCode)
			];
		}
	});

}


// this method is called when your extension is deactivated
export function deactivate() { }

