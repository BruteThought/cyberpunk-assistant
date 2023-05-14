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
		const networkConfigEl = this.contentEl.createDiv("cpunk-network-config");

			// Header
		const networkHeaderEl = networkConfigEl.createDiv("cpunk-network-header");
		networkHeaderEl.createEl("h5", {text: "Network Generator"});

			// Floors
		networkConfigEl.createDiv({cls:"cpunk-option-header", text:"Number of Floors"});
		const floorSpan = networkConfigEl.createSpan();
		const rngRadio = floorSpan.createEl("input", {type: "radio", attr: {"id":"cpunk-random", "name":"floor_num_rng", "checked":"true"}})
		floorSpan.createEl("label", {text: "Random (3d6)\n", attr:{"for":"cpunk-random"}, })
		const definedRadio = floorSpan.createEl("input", {type: "radio", attr: {"id":"cpunk-defined", "name":"floor_num_rng"}})

		const floorText = floorSpan.createEl("label")
		const floorComponent = new TextComponent(floorText);
		floorComponent.setDisabled(true);
		// Doesn't look like you can limit the input via TextComponents :(


		rngRadio.onClickEvent(function () {
			floorComponent.setDisabled(true);
		});
		definedRadio.onClickEvent(function () {
			floorComponent.setDisabled(false);
		});


			// Generate button
		const netGenEl = this.contentEl.createDiv("cpunk-network-button");
		const networkButton = netGenEl.createEl("button", {text: "Generate Network"})
		networkButton.onClickEvent(function() {
			testFunc(floorComponent.getValue());
		});

		// Character Generator
		const characterEl = this.contentEl.createDiv("character-creator");

			// Header
		const characterHeaderEl = networkConfigEl.createDiv("cpunk-character-header");
		characterHeaderEl.createEl("h5", {text: "Character Creator"});
	}

	async onClose() {
		// Nothing to clean up.
	}
}
