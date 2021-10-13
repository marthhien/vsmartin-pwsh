"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");

function activate(context) {
    let disposable = vscode.commands.registerCommand('vsmartin-pwsh-practice.registerDataProvider', () => {
         vscode.window.showInformationMessage('Hello World from treeview practice!');
     });
     vscode.window.registerTreeDataProvider('pwsh-list', new TreeDataProvider());
     context.subscriptions.push(disposable);
 }
  
exports.activate = activate;
class TreeDataProvider {
    constructor() {
        this.data = [new TreeItem('Commandes', [
                new TreeItem('Powershell', [new TreeItem('cmd pwsh1'), new TreeItem('cmd pwsh2'), new TreeItem('cmd pwsh3')]),
                new TreeItem('VM', [new TreeItem('horizon1'), new TreeItem('horizon2'), new TreeItem('horizon3')])
            ])];
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element === undefined) {
            return this.data;
        }
        return element.children;
    }
}
class TreeItem extends vscode.TreeItem {
    constructor(label, children) {
        super(label, children === undefined ? vscode.TreeItemCollapsibleState.None :
            vscode.TreeItemCollapsibleState.Expanded);
        this.children = children;
    }
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map