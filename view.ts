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

			// Number of Floors
		networkConfigEl.createDiv({cls:"cpunk-option-header", text:"Number of Floors", attr:{"id":"cpunk-top-header"}});
		const floorSpan = networkConfigEl.createSpan();
		const rngRadio = floorSpan.createEl("input", {type: "radio", attr: {"id":"cpunk-random", "name":"floor_num_rng", "checked":"true"}})
		floorSpan.createEl("label", {text: "Random (3d6)", attr:{"for":"cpunk-random"}, })
		floorSpan.createEl("br");
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

			// Difficulty
		networkConfigEl.createDiv({cls:"cpunk-option-header", text:"Difficulty"});
		const difficultyDiv = networkConfigEl.createDiv("cpunk-network-difficulty");
		const diffEasy = difficultyDiv.createEl("input", {type: "radio", attr: {"id":"cpunk-easy", "name":"floor_diff"}})
		difficultyDiv.createEl("label", {text: "Easy", attr:{"for":"cpunk-easy"}, })
		difficultyDiv.createEl("br");
		const diffMedium = difficultyDiv.createEl("input", {type: "radio", attr: {"id":"cpunk-medium", "name":"floor_diff", "checked":"true"}})
		difficultyDiv.createEl("label", {text: "Medium", attr:{"for":"cpunk-medium"}, })
		difficultyDiv.createEl("br");
		const diffHard = difficultyDiv.createEl("input", {type: "radio", attr: {"id":"cpunk-hard", "name":"floor_diff"}})
		difficultyDiv.createEl("label", {text: "Hard", attr:{"for":"cpunk-hard"}, })

			// Boss Floors
		networkConfigEl.createDiv();
		const bossDiv = networkConfigEl.createDiv({text:"Boss Floors: "});
		const bossComponent = new TextComponent(bossDiv);
		bossComponent.setValue("0");


			// Generate button
		const netGenEl = networkConfigEl.createDiv("cpunk-network-button");
		const networkButton = netGenEl.createEl("button", {text: "Generate Network"})
		networkButton.onClickEvent(function() {
			testFunc(floorComponent.getValue());
		});

		// Character Generator
		const characterEl = this.contentEl.createDiv("character-creator");

			// Header
		const characterHeaderEl = characterEl.createDiv("cpunk-character-header");
		characterHeaderEl.createEl("h5", {text: "Character Creator"});
	}

	async onClose() {
		// Nothing to clean up.
	}
}
