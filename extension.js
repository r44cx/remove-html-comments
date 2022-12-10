const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    console.log('Congratulations, your extension "remove-html-comments" is now active!');

    let disposable = vscode.commands.registerCommand('remove-html-comments.removeAll', function() {

        const editor = vscode.window.activeTextEditor;
        if (!editor || !editor.document) return;

        // Use a regular expression to find all HTML comments in the document
        let regex = /<!--[\s\S]*?-->/g;
        let text = editor.document.getText();
        let matches = text.match(regex);

        // Replace each HTML comment with an empty string
        let replacePromises = [];
        for (let match of matches) {
            let startPos = editor.document.positionAt(text.indexOf(match));
            let endPos = editor.document.positionAt(text.indexOf(match) + match.length);
            replacePromises.push(editor.edit(editBuilder => {
                editBuilder.replace(startPos, endPos, '');
            }));
        }

        // Wait for all replaces to complete before saving the document
        Promise.all(replacePromises).then(() => {
            editor.document.save();
        });
    });
    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}