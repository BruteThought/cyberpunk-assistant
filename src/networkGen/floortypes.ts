type Floor = {
    name: string,
    dv: number | null,
}

type Node = {
    id: string;
    floorType: Floor,
    children: Node[];
}

type Branch = {
    branch: Node;
    branchLen: number;
};

const lobbyOptions: Floor[] = [
    { name: "File", dv: 6 },
    { name: "Password", dv: 6 },
    { name: "Password", dv: 8 },
    { name: "Skunk", dv: null },
    { name: "Wisp", dv: null },
    { name: "Killer", dv: null },
];

const basicOptions: Floor[] = [
    { name: "Hellhound", dv: null },
    { name: "Sabertooth", dv: null },
    { name: "Raven x2", dv: null },
    { name: "Hellhound", dv: null },
    { name: "Wisp", dv: null },
    { name: "Raven", dv: null },
    { name: "Password", dv: 6 },
    { name: "File", dv: 6 },
    { name: "Control Node", dv: 6 },
    { name: "Password", dv: 6 },
    { name: "Skunk", dv: null },
    { name: "Asp", dv: null },
    { name: "Scorpion", dv: null },
    { name: "Killer, Skunk", dv: null },
    { name: "Wisp x3", dv: null },
    { name: "Liche", dv: null },
];

const standardOptions: Floor[] = [
    { name: "Hellhound x2", dv: null },
    { name: "Hellhound, Killer", dv: null },
    { name: "Skunk x2", dv: null },
    { name: "Sabertooth", dv: null },
    { name: "Scorpion", dv: null },
    { name: "Hellhound", dv: null },
    { name: "Password", dv: 8 },
    { name: "File", dv: 8 },
    { name: "Control Node", dv: 8 },
    { name: "Password", dv: 8 },
    { name: "Asp", dv: null },
    { name: "Killer", dv: null },
    { name: "Liche", dv: null },
    { name: "Asp", dv: null },
    { name: "Raven x3", dv: null },
    { name: "Liche, Raven", dv: null },
];

const uncommonOptions: Floor[] = [
    { name: "Kraken", dv: null },
    { name: "Hellhound, Scorpion", dv: null },
    { name: "Hellhound, Killer", dv: null },
    { name: "Raven x2", dv: null },
    { name: "Sabertooth", dv: null },
    { name: "Hellhound", dv: null },
    { name: "Password", dv: 10 },
    { name: "File", dv: 10 },
    { name: "Control Node", dv: 10 },
    { name: "Password", dv: 10 },
    { name: "Killer", dv: null },
    { name: "Liche", dv: null },
    { name: "Dragon", dv: null },
    { name: "Asp, Raven", dv: null },
    { name: "Dragon, Wisp", dv: null },
    { name: "Giant", dv: null },
];

const advancedOptions: Floor[] = [
    { name: "Hellhound x3", dv: null },
    { name: "Asp x2", dv: null },
    { name: "Hellhound, Liche", dv: null },
    { name: "Wisp x3", dv: null },
    { name: "Hellhound, Sabertooth", dv: null },
    { name: "Kraken", dv: null },
    { name: "Password", dv: 12 },
    { name: "File", dv: 12 },
    { name: "Control Node", dv: 12 },
    { name: "Password", dv: 12 },
    { name: "Giant", dv: null },
    { name: "Dragon", dv: null },
    { name: "Killer, Scorpion", dv: null },
    { name: "Kraken", dv: null },
    { name: "Raven, Wisp, Hellhound", dv: null },
    { name: "Dragon x2", dv: null },
];

const archOptions: Floor[][] = [
    lobbyOptions,
    basicOptions,
    standardOptions,
    uncommonOptions,
    advancedOptions
]
export {archOptions};
export type { Floor, Node, Branch };
