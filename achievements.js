const achievementStack = [
    {
        name: "Independent Thinker",
        reqs: [["knowledge", 100]],
        id: "K1",
        descript: "Imagine thinking for yourself, what a generic person",
        give: [["barcoins", 5]],
        unlocked: false,
    },

    {
        name: "Big Thinker",
        reqs: [["knowledge", 1000]],
        id: "K2",
        descript: "Thinking like a boss",
        give: [["barcoins", 5]],
        unlocked: false,
    },

    {
        name: "Young sprout of wisdom",
        reqs: [["wisdom", 75]],
        id: "W1",
        descript: "Thinking like a boss",
        give: [["cap", 10]],
        unlocked: false,
    },

    {
        name: "Sage lover",
        reqs: [["wisdom", 200]],
        id: "W2",
        descript: "Embrace the sage (even if it's not actually wise)",
        give: [["cap", 25]],
        unlocked: false,
    },
]

const resourcesMaxReached = {
    knowledge: 0,
    knowledgeBonus: 0,

    matter: 0,

    cap: 0,
    capBonus: 0,

    wisdom: 0,
    wisdomBonus: 0,

    rawgoop: 0,
    processedgloop: 0,
    energy: 0,

    barcoins: 0,

    stone: 0,
    blackCrystal: 0,
    blueGem: 0,
    darkPyrite: 0,
}

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
    button.innerText = `${btns.name} - ${btns.unlocked} `;

    document.getElementById(button.id).addEventListener("click", () => { say(btns.descript); });
};


function checkAchievements() {

    const allThings = Object.keys(resources)

    for (const loop of allThings) {
        if (loop[resourcesMaxReached] <= player[resourcesMaxReached]) {
            console.log("ye")
            loop[resourcesMaxReached] = player[resourcesMaxReached];
        }
    }


    for (const loop of achievementStack) {
        let allReqsMet = true;

        for (const req of loop.reqs) {

            const [reqType, reqAmount] = req;

            if (loop.unlocked === false) {
                if (reqType in resources) {
                    if (!(resources[reqType] >= reqAmount)) {
                        allReqsMet = false;
                    }
                    
                } else {
                    if (!(barInfo[reqType][0].level >= reqAmount)) { allReqsMet = false; }
                }
                
            } else {
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

        if (loop.unlocked == true) {
            document.getElementById(loop.id).style.backgroundColor = `#1b851b`;
            document.getElementById(loop.id).innerText = `${loop.name} - ${loop.unlocked}`;
        }
    };
};