import {ItemView, Notice, TextComponent, WorkspaceLeaf} from "obsidian";
import {generateNetwork} from "./src/networkGen/networkGenerator";

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
		const diffEasy = difficultyDiv.createEl("input", {type: "radio", attr: {"id":"cpunk-easy", "name":"floor_diff", "value":"0"}})
		difficultyDiv.createEl("label", {text: "Easy", attr:{"for":"cpunk-easy"}, })
		difficultyDiv.createEl("br");
		const diffMedium = difficultyDiv.createEl("input", {type: "radio", attr: {"id":"cpunk-medium", "name":"floor_diff", "value":"1", "checked":"true"}})
		difficultyDiv.createEl("label", {text: "Medium", attr:{"for":"cpunk-medium"}, })
		difficultyDiv.createEl("br");
		const diffHard = difficultyDiv.createEl("input", {type: "radio", attr: {"id":"cpunk-hard", "name":"floor_diff", "value":"2"}})
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
			let floorNo;
			let difficulty = Number(diffEasy.checked ? diffEasy.value : diffMedium.checked ? diffMedium.value : diffHard.value);
			let bossFloors;

			if(floorComponent.disabled) {
				floorNo = 0;
			} else {
				// Check user input for floor number.
				let floorsUserInput = floorComponent.getValue()
				if(Number.isInteger(floorsUserInput) && Number(floorsUserInput) > 0 && Number(floorsUserInput) <=50) {
					floorNo = Number(floorsUserInput);
				} else {
					new Notice("Number of floors is invalid! (0-50)");
					return;
				}
			}
			let bossUserInput = Number(bossComponent.getValue());
			// Check boss floors is a number over -1.
			if(Number.isInteger(bossUserInput) && Number(bossUserInput) > -1) {
				// If user defined, make sure we aren't making more boss floors than floor total.
				if(!floorComponent.disabled && Number(bossUserInput) <=floorNo) {
					new Notice("Num of Boss floors > total floors!");
					return;
				}
				bossFloors = Number(bossUserInput);
			} else {
				new Notice("Number of boss floors is invalid! (Not a number or < 0)");
				return;
			}

			generateNetwork(floorNo, difficulty, bossFloors);
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
