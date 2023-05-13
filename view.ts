import {ItemView, TextComponent, WorkspaceLeaf} from "obsidian";
import {testFunc} from "./networkGenerator";

export const VIEW_TYPE_CYBERPUNK = "cyberpunk-assistant-view";

export class CyberpunkView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_CYBERPUNK;
	}

	getDisplayText() {
		return "Cyberpunk Assistant";
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();
		container.createEl("h4", {text: "Cyberpunk Assistant"});

		// Network config
		const configEl = this.contentEl.createDiv("cpunk-network-config");

			// Header
		const networkHeaderEl = configEl.createDiv("cpunk-network-header");
		networkHeaderEl.createEl("h5", {text: "Network Generator"});

			// Floors
		const floorEl = configEl.createDiv("cpunk-network-floors");
		floorEl.createSpan({text:"Floors: "})
		const floorComponent = new TextComponent(floorEl);

			// Generate button
		const netGenEl = this.contentEl.createDiv("cpunk-network-button");
		const networkButton = netGenEl.createEl("button", {text: "Generate Network"})
		networkButton.onClickEvent(function() {

			testFunc(floorComponent.getValue());
		});
	}

	async onClose() {
		// Nothing to clean up.
	}
}
