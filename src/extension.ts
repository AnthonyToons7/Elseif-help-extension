import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  let disposable = vscode.commands.registerCommand('noifelse--.stopType', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
      const text = document.getText();
      const regex = /else\s+if/g;
      const matches = text.match(regex);

      if (matches && matches.length >= 2) {
        vscode.commands.executeCommand("editor.action.selectAll"); // Select everything
        vscode.commands.executeCommand("deleteLeft"); // press Backspace
        vscode.commands.executeCommand("workbench.action.files.save"); // press Ctrl+S to save
        vscode.window.showErrorMessage("You fool, you have used more than one else if, and this is your punishment.");
      }
    }
  });

  context.subscriptions.push(disposable);
  // Register an event listener for document changes
  vscode.workspace.onDidChangeTextDocument(event => {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor && event.document === activeEditor.document) {
      const text = event.document.getText();
      const regex = /else\s+if/g;
      const matches = text.match(regex);

      if (matches && matches.length >= 2) {
        vscode.commands.executeCommand('noifelse--.stopType');
      }
    }
  });
}

export function deactivate() {}
