"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateMenu = exports.ValidateMenuProvider = void 0;
const vscode = require("vscode");
const validateMenuItems = require("./validateMenu.json");
class ValidateMenuProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this
            ._onDidChangeTreeData.event;
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    getTreeItem(element) {
        if (element) {
            console.log(`element: ${element}`);
            return element;
        }
        return element;
    }
    getChildren(element) {
        if (element) {
            return Promise.resolve([]);
        }
        else {
            return Promise.resolve(this.getValidateMenu());
        }
    }
    getValidateMenu() {
        const toMenu = (menuTitle, collapsibleState) => {
            return new ValidateMenu(menuTitle, collapsibleState);
        };
        let menuItems = [];
        let menuHeadings = validateMenuItems.children;
        let j = 0;
        for (var i in menuHeadings) {
            // send the parent as a menu item
            if (menuHeadings[i] !== null && typeof menuHeadings[i] === "object") {
                let firstChildLabel = Object.keys(validateMenuItems.children)[j];
                let parentMenuItem = toMenu(firstChildLabel, vscode.TreeItemCollapsibleState.Collapsed);
                menuItems.push(parentMenuItem);
                // send each child object to the view
                for (var k = 0; k < menuHeadings[i].length; k++) {
                    if (menuHeadings[i][k] !== null &&
                        typeof menuHeadings[i][k] === "object") {
                        let secondChildLabel = menuHeadings[i][k].name;
                        let childMenuItem = toMenu(secondChildLabel, vscode.TreeItemCollapsibleState.None);
                        menuItems.push(childMenuItem);
                    }
                    else {
                        return [];
                    }
                }
            }
            else {
                return [];
            }
            j++;
        }
        return menuItems;
    }
}
exports.ValidateMenuProvider = ValidateMenuProvider;
class ValidateMenu extends vscode.TreeItem {
    constructor(label, collapsibleState, command) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.command = command;
    }
}
exports.ValidateMenu = ValidateMenu;
//# sourceMappingURL=extension.js.map