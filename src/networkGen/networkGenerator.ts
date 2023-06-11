import {writeToFile} from "../util";
import {archOptions, Floor, Node, Branch} from "./floortypes";

function numberOfFloors(): number {
	let result = 0;
	for (let i = 0; i < 3; i++) {
		result += Math.floor(Math.random() * 6) + 1;
	}
	return result;
}

function numberOfBranches(): number {
	let branches = 0;
	while (true) {
		const roll = Math.floor(Math.random() * 10) + 1;
		if (roll < 7) {
			break;
		} else {
			branches++;
		}
	}
	return branches;
}

function splitFloors(branchCount:number, floorCount:number):number[]{
	// If we have more branches than floors, limit it.
	if(branchCount >= floorCount){
		console.log("Not enough floors to populate branches.\rLimiting branches.")
		branchCount = floorCount - 1;
	}
	// Guarantee at least one room per branch.
	let remainingFloors = floorCount - branchCount;
	let branchLens:number[] = [];

	// For each branch, take away a random number of the remaining amount.
	for(let i= 0; i < branchCount; i++) {
		let floorsInBranch = Math.floor(Math.random() * remainingFloors);
		branchLens[i] = floorsInBranch + 1; // Must have at least 1 floor.
		remainingFloors = remainingFloors - floorsInBranch;
	}
	branchLens.push(remainingFloors); // Left over floors, must have at least 1.
	return branchLens;
}

function generateBranches(difficulty:number, floorsPerBranch:number[], idPrefix = ""): Branch[] {
	// Make a copy of correct options based on difficulty.
	let options = archOptions[difficulty].slice();

	let branches:Branch[] = [];
	let floorid = 0;
	for(let floors of floorsPerBranch) {
		// Setup
		const setupIndex = Math.floor(Math.random() * options.length);
		const setupOption = options[setupIndex];
		let branchRoot:Node = {id: idPrefix + floorid, floorType: setupOption, children:[]}
		let currentNode:Node = branchRoot;

		// Gen remaining floors
		for (let i = 1; i < floors; i++) {
			// Pick an option at random for each floor.
			const optionIndex = Math.floor(Math.random() * options.length);
			const chosenOption = options[optionIndex];
			currentNode.children.push({id: idPrefix + floorid, floorType: chosenOption, children:[]});
			currentNode = currentNode.children[0];
			floorid++;
			// Remove the chosen option from the options array to prevent duplicates
			options.splice(optionIndex, 1);
		}
		branches.push({branch: branchRoot, branchLen: floors});
	}
	return branches;
}

function createTree(branches:Branch[]):Node {

	while(branches.length > 1) {
		let all1 = true;
		let smallestLen = null;
		let selectedBranch:Branch = branches[0]; //default to first branch.
		let branchIndex = -1;

		// Find the smallest branch
		for (let i = 0; i < branches.length; i++) {
			if(branches[i].branchLen != 1){
				all1 = false;
			}
			if(smallestLen == null || branches[i].branchLen < smallestLen){
				branchIndex = i;
				smallestLen = branches[i].branchLen;
				selectedBranch = branches[i];
			}
		}
		if(all1){
			//todo: do... something if all the branches are "1" in size. Maybe just attach all to lobby?
		}
		// remove the smallest branch from the list
		branches.splice(branchIndex, 1);

		// Filter out branches with len of 1, randomly select one of them to attach to.
		let filteredBranches = branches.filter(branch => branch.branchLen !=1)
		let attachBranch = Math.floor(Math.random() * filteredBranches.length);
		let attachPoint = Math.floor(Math.random() * filteredBranches[attachBranch].branchLen);
		let attachNode = filteredBranches[attachBranch].branch;
		for(let i=0;i<attachPoint;i++){
			attachNode = attachNode.children[0];
		}
		attachNode.children.push(selectedBranch.branch);
	}
	//Return the last branch.
	return branches[0].branch;
}

function generateNetwork(numFloors:number, difficulty:number, bossFloors:number): void {
	// Create Lobby
	let lobbyFloors = generateBranches(0, [2], "lobby")[0]; // generate lobby

	let numBranches = numberOfBranches();
	if(numFloors == 0) {
		numFloors = numberOfFloors() -2;
	}
	// Todo: if any "required" floors are listed, add these to the list, then take away len from floors.
	// Todo: if bossfloor is selected, generate 1 from "higher" tier list, -1 from number of floors.

	let branchLengths = splitFloors(numBranches, numFloors);

	let branches = generateBranches(difficulty, branchLengths, "id");
	let postLobby = createTree(branches);

	// Attach lobby rooms to front
	lobbyFloors.branch.children[0].children.push(postLobby);

	let tree = lobbyFloors.branch;
	printTree(lobbyFloors.branch);
	toMermaid(tree);
	writeToFile("test123");
}

function printTree(tree: Node, prepend = ""): void {
	console.log("%s %s", prepend, tree.floorType);
	for(let child of tree.children) {
		printTree(child, prepend);
		prepend = prepend + "\t";
	}
}

function genMermaidNodes(tree: Node) {
	// Loop through nodes, list them out as mermaid vars.
	let nodes = "";
	nodes += tree.id + "[" + tree.floorType.name;
	if(tree.floorType.dv != null) {
		nodes += " " + tree.floorType.dv;
	}
	nodes += "]\n";
	for(let child of tree.children) {
		nodes = nodes + genMermaidNodes(child);
	}
	return nodes;
}

function linkMermaidNodes(tree: Node){
	let links = "";
	// Loop through nodes, list them out as mermaid vars.
	for(let child of tree.children) {
		links += tree.id + "-->" + child.id + "\n";
		links += linkMermaidNodes(child);
	}
	return links;
}

function toMermaid(tree: Node, id=0) {
	let mermaidNodes = genMermaidNodes(tree);
	let mermaidLinks = linkMermaidNodes(tree);
	console.log("```mermaid  \ngraph TD;")
	console.log(mermaidNodes);
	console.log(mermaidLinks);
	console.log("````")

}


export {generateNetwork}
