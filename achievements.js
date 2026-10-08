const achievementStack = [
    {
        name: "Independent Thinker",
        reqs: [["knowledge", 100]],
        id: "K1",
        descript: "Imagine thinking for yourself, what a generic person",
        hint: "This one's easy.",
        give: [["barcoins", 5]],
        unlocked: false,
    },

    {
        name: "Big Thinker",
        reqs: [["knowledge", 1000]],
        id: "K2",
        descript: "Thinking like a boss",
        hint: "This one's a bit harder.",
        give: [["barcoins", 5]],
        unlocked: false,
    },

    {
        name: "Elitius Brainaus",
        reqs: [["knowledge", 9999]],
        id: "K3",
        descript: "Explody brain (+1000 cap)",
        hint: "This one is concerning. Some could say mindblowing.",
        give: [["capBonus", 1000]],
        unlocked: false,
    },

    {
        name: "Young sprout of wisdom",
        reqs: [["wisdom", 75]],
        id: "W1",
        descript: "Thinking like a boss",
        hint: "This one's wiser.",
        give: [["capBonus", 10]],
        unlocked: false,
    },

    {
        name: "Sage lover",
        reqs: [["wisdom", 200]],
        id: "W2",
        descript: "Embrace the sage (even if it's not actually wise)",
        hint: "This is pretty simple.",
        give: [["capBonus", 25]],
        unlocked: false,
    },

    {
        name: "Pitty Nice",
        reqs: [["totalpitrolls", 10]],
        id: "P1",
        descript: "It's supposed to be a pun on 'pretty nice' and 'the pit'. Laugh now. Har har har!",
        hint: "This one is stranger.",
        give: [["knowledgeBonus", 25]],
        unlocked: false,
    },

    {
        name: "Pitty Please?",
        reqs: [["totalpitrolls", 20]],
        id: "P2",
        descript: "Another pun, this time for 'pretty please' and 'the pit'. Laugh again. Hardy har har!",
        hint: "A bad pun for sure.",
        give: [["wisdomBonus", 10]],
        unlocked: false,
    },

    {
        name: "Stinky Pits",
        reqs: [["totalpitrolls", 50]],
        id: "P3",
        descript: "Just one more pun, this time for your armpits being stinky in relation to the pit. Go shower!",
        hint: "Smelly.",
        give: [["matter", 10]],
        unlocked: false,
    },

    {
        name: "Pit Master",
        reqs: [["totalpitrolls", 100]],
        id: "P4",
        descript: "No more puns. I've got no pits left to give. 'ha ha ha' you can leave now ",
        hint: "This one's very hard.",
        give: [["capBonus", 10]],
        unlocked: false,
    },

    {
        name: "Mining away..",
        reqs: [["miners", 10]],
        id: "Mining1",
        descript: "I'm proud you got here. Have +250 mental capacity, free of charge. You earned it.",
        hint: "This one's not too hard or easy really.",
        give: [["capBonus", 250]],
        unlocked: false,
    },

    {
        name: "Stoned",
        reqs: [["stone", 100]],
        id: "Stone1",
        descript: "You're pretty hard to talk to (Another pun and +25 stone because why not)",
        hint: "This one's very very hard. A rock persay.",
        give: [["stone", 25]],
        unlocked: false,
    },
]

for (const btns of achievementStack) {
    const button = document.createElement("button");
    button.id = btns.id;
    if (btns.unlocked == true) {
        button.style.backgroundColor = `#1b851b`;
    } else {
        button.style.backgroundColor = `#717171`;
    }

    document.getElementById("achievementContainer").appendChild(button);

    button.classList.add("upgrade");
    button.innerText = `??? - ${btns.unlocked} `;

    button.addEventListener("click", () => { if (btns.unlocked) {say(btns.descript)} else {say(btns.hint); }});
};


function checkAchievements() {
    // Checks if true
    for (const loop of achievementStack) {

        if (loop.unlocked == true) {
            document.getElementById(loop.id).style.backgroundColor = `#1b851b`;
            document.getElementById(loop.id).innerText = `${loop.name} - ${loop.unlocked}`;
        }

        if (loop.unlocked) continue;
        let allReqsMet = true;
        for (const req of loop.reqs) {

            const [reqType, reqAmount] = req;
            let inStack = null;

            if (reqType in resources) {
                inStack = resources[reqType];
            } else if (reqType in player) {
                inStack = player[reqType];
            } else if (reqType in barInfo && barInfo[reqType][0]) {
                inStack = barInfo[reqType][0].level;
            }
 
            if (inStack < reqAmount) {
                allReqsMet = false;
            }
        }

        if (allReqsMet === true) {

            loop.unlocked = true;

            for (const give of loop.give) {
                const [giveType, giveAmount] = give
                resources[giveType] += giveAmount;
            };

            say(`"${loop.name}" achievement completed! Congrats!`)
        };
    };
};