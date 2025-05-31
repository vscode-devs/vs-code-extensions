import * as vscode from 'vscode';

/**
 * 执行HelloWorld命令的具体实现
 */
function executeHelloWorldCommand(): void {
    // 显示信息提示
    vscode.window.showInformationMessage('Hello World from vscode-ext-dev!');
}

/**
 * 创建状态栏项
 * @returns 创建的状态栏项
 */
function createStatusBarItem(): vscode.StatusBarItem {
    // 创建状态栏项
    const statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left, 
        100
    );
    
    // 配置状态栏项
    statusBarItem.text = "$(rocket) Hello World";
    statusBarItem.tooltip = "点击运行 Hello World 命令";
    statusBarItem.command = 'vscode-ext-dev.helloWorld';
    
    return statusBarItem;
}

/**
 * 注册HelloWorld命令和相关功能
 * @param context 扩展上下文
 */
export function registerHelloWorldCommand(context: vscode.ExtensionContext): void {
    // 注册命令
    const disposable = vscode.commands.registerCommand(
        'vscode-ext-dev.helloWorld', 
        executeHelloWorldCommand
    );
    
    // 创建并显示状态栏项
    const statusBarItem = createStatusBarItem();
    statusBarItem.show();
    
    // 将命令和状态栏项添加到上下文订阅中
    context.subscriptions.push(disposable, statusBarItem);
}
