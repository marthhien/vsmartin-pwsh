import * as vscode from "vscode";

class TreeViewItem extends vscode.TreeItem {
	constructor(label: string, collapsibleState?: vscode.TreeItemCollapsibleState) {
		super(label, collapsibleState);
	}
}

class DataProvider implements vscode.TreeDataProvider<TreeViewItem> {
	getTreeItem(element: TreeViewItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}
	getChildren(element?: TreeViewItem): vscode.ProviderResult<TreeViewItem[]> {
		return Promise.resolve([
			new TreeViewItem('TreeItem-01'),
			new TreeViewItem('TreeItem-02'),
			new TreeViewItem('TreeItem-03'),
		]);
	}
}
export function activate(context: vscode.ExtensionContext) {

  let disposable = vscode.commands.registerCommand('vsmartin-pwsh-practice.registerDataProvider', () => {
		vscode.window.registerTreeDataProvider('vsmartin-pwsh-welcome', new DataProvider());
  	vscode.window.showInformationMessage('Hello World from treeview practice!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
