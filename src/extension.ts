import * as vscode from "vscode";
import * as validateMenuItems from "./validateMenu.json";

export class ValidateMenuProvider
  implements vscode.TreeDataProvider<ValidateMenu> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    ValidateMenu | undefined | void
  > = new vscode.EventEmitter<ValidateMenu | undefined | void> ();
  readonly onDidChangeTreeData: vscode.Event<ValidateMenu | undefined | void> = this
    ._onDidChangeTreeData.event;

  constructor() {}

  refresh(): void { 
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: ValidateMenu): vscode.TreeItem {
    if(element) {
      console.log(`element: ${element}`);
      return element;
    }

    return element;
  }

  getChildren(element?: ValidateMenu): Thenable<ValidateMenu[]> {
    if (element) {
      return Promise.resolve([]);
    } else {
      return Promise.resolve(this.getValidateMenu());
    }
  }

  private getValidateMenu(): ValidateMenu[] {
    const toMenu = (
      menuTitle: string,
      collapsibleState: vscode.TreeItemCollapsibleState
    ): ValidateMenu => {
      return new ValidateMenu(menuTitle, collapsibleState);
    };

    let menuItems: any = []; 
    let menuHeadings: any = validateMenuItems.children;

    let j: number = 0;
    for (var i in menuHeadings) {
      // send the parent as a menu item
      if (menuHeadings[i] !== null && typeof menuHeadings[i] === "object") {
        let firstChildLabel: string = Object.keys(validateMenuItems.children)[
          j
        ];
        let parentMenuItem = toMenu(
          firstChildLabel,
          vscode.TreeItemCollapsibleState.Collapsed 
        );
        menuItems.push(parentMenuItem);

        // send each child object to the view
        for (var k = 0; k < menuHeadings[i].length; k++) {
          if (
            menuHeadings[i][k] !== null &&
            typeof menuHeadings[i][k] === "object"
          ) {
            let secondChildLabel: string = menuHeadings[i][k].name;
            let childMenuItem = toMenu(
              secondChildLabel,
              vscode.TreeItemCollapsibleState.None
            );
            menuItems.push(childMenuItem);
          } else {
            return [];
          }
        }
      } else {
        return [];
      }
      j++;
    }

    return menuItems;
  }
}

export class ValidateMenu extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
  }
}