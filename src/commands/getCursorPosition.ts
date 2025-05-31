import * as vscode from 'vscode';

/**
 * 创建并配置状态栏项
 * @param context 扩展上下文，用于管理订阅和资源清理
 * @returns 创建的状态栏项实例
 */
function createStatusBarItem(context: vscode.ExtensionContext) {
    // 创建状态栏项（左侧对齐，优先级100）
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    // 设置初始显示文本
    statusBarItem.text = "光标位置: 未获取";
    // 设置悬停提示信息
    statusBarItem.tooltip = "当前光标位置信息";
    // 显示状态栏项
    statusBarItem.show();
    
    // 订阅光标位置变化事件
    const selectionDisposable = vscode.window.onDidChangeTextEditorSelection(e => {
        const pos = e.textEditor.selection.active;
        const editor = e.textEditor;
        const tabSize = editor.options.tabSize as number || 4;
        const lineText = editor.document.lineAt(pos.line).text;
        
        // 复用计算逻辑
        let actualColumn = 0;
        for (let i = 0; i < pos.character; i++) {
            actualColumn += lineText[i] === '\t' ? tabSize : 1;
        }
        
        statusBarItem.text = `行:${pos.line+1} 列:${actualColumn + 1}`;
    });
    
    context.subscriptions.push(
        selectionDisposable,
        statusBarItem
    );
    
    return statusBarItem;
}

export function registerCursorPositionCommand(context: vscode.ExtensionContext) {
    const statusBarItem = createStatusBarItem(context);
    
    let disposable = vscode.commands.registerCommand('vscode-ext-dev.getCursorPosition', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const position = editor.selection.active;
            const tabSize = editor.options.tabSize as number || 4;
            const lineText = editor.document.lineAt(position.line).text;
            
            // 计算实际列位置（将tab转换为空格）
            let actualColumn = 0;
            for (let i = 0; i < position.character; i++) {
                actualColumn += lineText[i] === '\t' ? tabSize : 1;
            }
            
            const message = `行:${position.line + 1} 列:${actualColumn + 1} (原始位置:${position.character + 1})`;
            vscode.window.showInformationMessage(message);
            statusBarItem.text = message;
        }
    });
    
    context.subscriptions.push(disposable);
}
