// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-extension-demo" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('vscode-extension-demo.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from vscode-extension-demo!');
	});

	// 在 VS Code 界面中创建一个状态栏项
	// 参数说明：
	// - vscode.StatusBarAlignment.Left: 将项目放置在状态栏的左侧
	// - 100: 优先级值（数字越大，项目位置越靠左）
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	
	// 设置状态栏中显示的文本
	// $(rocket) 是一个 codicon（VS Code 图标），在文本前显示一个火箭图标
	// 你可以使用不同的图标，如 $(heart)、$(star)、$(check) 等
	statusBarItem.text = "$(rocket) Hello World";
	
	// 设置鼠标悬停在状态栏项上时显示的提示文本
	// 这有助于用户理解该项的功能
	statusBarItem.tooltip = "点击运行 Hello World 命令";
	
	// 将状态栏项与命令关联
	// 当用户点击状态栏项时，将执行此命令
	// 命令 ID 必须与 package.json 中定义的一致
	statusBarItem.command = 'vscode-extension-demo.helloWorld';
	
	// 使状态栏项在 UI 中可见
	// 没有这个调用，项目将被创建但不会显示
	statusBarItem.show();

	// 将命令和状态栏项都添加到扩展上下文的订阅中
	// 这确保它们在扩展被停用时正确处理
	// 正确的处理可以防止内存泄漏并确保扩展干净地关闭
	context.subscriptions.push(disposable, statusBarItem);
}

// This method is called when your extension is deactivated
export function deactivate() {}
