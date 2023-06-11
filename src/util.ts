import {App, MarkdownView, Editor} from "obsidian";
let editor: Editor;

function writeToFile(text:String) {
	let app: App;
	console.log(this);
	const view = app.workspace.getActiveViewOfType(MarkdownView);
	console.log(view);
	// Make sure the user is editing a Markdown file.
	if (view) {
		const cursor = view.editor.getCursor();
	}
}

export {writeToFile}
