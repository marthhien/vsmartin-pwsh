import { ExtensionContext, commands, window, workspace } from 'vscode';
import Provider from './data/Provider';
import pwshHandle from './data/Handle';

export function activate(context: ExtensionContext) {
  let interval = workspace.getConfiguration().get('pwsh-watch.interval', 2);
  if (interval < 2) {
    interval = 2;
  }

  const provider = new Provider();

  window.registerTreeDataProvider('pwsh-list', provider);

  setInterval(() => {
    provider.refresh();
  }, interval * 1000);

  context.subscriptions.push(
    commands.registerCommand(`pwsh.add`, () => {
      provider.addpwsh();
    }),
    commands.registerCommand(`pwsh.order`, () => {
      provider.changeOrder();
    }),
    commands.registerCommand(`pwsh.refresh`, () => {
      provider.refresh();
    }),
    commands.registerCommand('pwsh.item.remove', (pwsh) => {
      const { code } = pwsh;
      pwshHandle.removeConfig(code);
      provider.refresh();
    })
  );
}

export function deactivate() {}
