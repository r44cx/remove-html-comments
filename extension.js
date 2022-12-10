const vscode = require('vscode');

function activate(context) {
    console.log('Congratulations, remove-html-comments is now active!');

    let disposable = vscode.commands.registerCommand('extension.removeHtmlComments', function() {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            return;
        }

        // Get the current selection
        const selection = editor.selection;

        // Get the selected text
        const text = editor.document.getText(selection);

        // Use a regular expression to match HTML comments
        const commentRegex = /<!--(.|\n)*?-->/g;

        // Replace the comments with an empty string
        const updatedText = text.replace(commentRegex, '');

        // Replace the selected text with the updated text
        editor.edit(editBuilder => {
            editBuilder.replace(selection, updatedText);
        });
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;