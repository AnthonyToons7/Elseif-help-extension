import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  let disposable = vscode.commands.registerCommand('noifelse--.stopType', () => {
    vscode.commands.executeCommand("editor.action.selectAll"); // Select everything
    vscode.commands.executeCommand("deleteLeft"); // press Backspace
    vscode.commands.executeCommand("workbench.action.files.save"); // press Ctrl+S to save
    // Display message in the corner of the screen
    vscode.window.showErrorMessage("You fool, moron, you absolute bafoon, you have used more than one else if, and this is your punishment. You better have this project on your git, because you're not getting this one back.");
  });

  context.subscriptions.push(disposable);
  // Register an event listener for document changes
  vscode.workspace.onDidChangeTextDocument(event => {
    // Register your current document as your current active editor
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor && event.document === activeEditor.document) {
      const text = event.document.getText();
      // Regex so it searches all "else if"s
      const regex = /else\s+if/g;
      // Match if the regex is the same or is present in the document
      const matches = text.match(regex);
      if (matches && matches.length >= 2) {
        vscode.commands.executeCommand('noifelse--.stopType');
      }
    }
  });
}

export function deactivate() {}
