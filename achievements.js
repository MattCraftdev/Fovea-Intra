const achievementStack = [
    {
        name: "Independent Thinker",
        reqs: [["knowledge", 100]],
        id: "knowledge",
        descript: "Imagine thinking for yourself, what a generic person",
        hint: "This one's easy.",
        give: [["barcoins", 5]],
        unlocked: false,
    },

    {
        name: "Big Thinker",
        reqs: [["knowledge", 1000]],
        id: "knowledge2",
        descript: "Thinking like a boss",
        hint: "This one's a bit harder.",
        give: [["barcoins", 5]],
        unlocked: false,
    },

    {
        name: "Elitius Brainaus",
        reqs: [["knowledge", 9999]],
        id: "knowledge3",
        descript: "Explody brain (+1000 cap)",
        hint: "This one is concerning. Some could say mindblowing.",
        give: [["capBonus", 1000]],
        unlocked: false,
    },

    {
        name: "The power of Destruction",
        reqs: [["knowledge", 100000]],
        id: "knowledge4",
        descript: "You know all. You see all. You are...God.",
        hint: "This one is something you probably don't want to achieve. Knowing is painful.",
        give: [["matter", 1000]],
        unlocked: false,
    },


    {
        name: "Young sprout of wisdom",
        reqs: [["wisdom", 75]],
        id: "wisdom1",
        descript: "Thinking like a boss",
        hint: "This one's wiser.",
        give: [["capBonus", 10]],
        unlocked: false,
    },

    {
        name: "Sage lover",
        reqs: [["wisdom", 200]],
        id: "wisdom2",
        descript: "Embrace the sage (even if it's not actually wise)",
        hint: "This is pretty simple.",
        give: [["capBonus", 25]],
        unlocked: false,
    },

    {
        name: "Great Wise one",
        reqs: [["wisdom", 1000]],
        id: "wisdom3",
        descript: "People have started to come to you for help (+10 miners)",
        hint: "Become zen.",
        give: [["miners", 10]],
        unlocked: false,
    },

    {
        name: "Freedom",
        reqs: [["wisdom", 10000]],
        id: "wisdom4",
        descript: "You have always been free from the mortal world. And you remember your origin. (+250 energy)",
        hint: "Do not become zen. Go above it.",
        give: [["energy", 250]],
        unlocked: false,
    },


    {
        name: "Pitty Nice",
        reqs: [["totalpitrolls", 10]],
        id: "Pit1",
        descript: "It's supposed to be a pun on 'pretty nice' and 'the pit'. Laugh now. Har har har!",
        hint: "This one is stranger.",
        give: [["knowledgeBonus", 25]],
        unlocked: false,
    },

    {
        name: "Pitty Please?",
        reqs: [["totalpitrolls", 20]],
        id: "Pit2",
        descript: "Another pun, this time for 'pretty please' and 'the pit'. Laugh again. Hardy har har!",
        hint: "A bad pun for sure.",
        give: [["wisdomBonus", 10]],
        unlocked: false,
    },

    {
        name: "Stinky Pits",
        reqs: [["totalpitrolls", 50]],
        id: "Pit3",
        descript: "Just one more pun, this time for your armpits being stinky in relation to the pit. Go shower!",
        hint: "Smelly.",
        give: [["matter", 10]],
        unlocked: false,
    },

    {
        name: "Pit Master",
        reqs: [["totalpitrolls", 100]],
        id: "Pit4",
        descript: "No more puns. I've got no pits left to give. 'ha ha ha' you can leave now ",
        hint: "This one's very hard.",
        give: [["capBonus", 10]],
        unlocked: false,
    },

    {
        name: "Deal Done-r",
        reqs: [["totalTrades", 10]],
        id: "Market1",
        descript: "Seal your 10th deal through the hard & difficult market! (+200 barcoins)",
        hint: "Deals come and go",
        give: [["barcoins", 200]],
        unlocked: false,
    },

    {
        name: "Side hustler",
        reqs: [["totalTrades", 25]],
        id: "Market2",
        descript: "You wonder if it really is worth it",
        hint: "Even if it's bad...",
        give: [["matter", 10]],
        unlocked: false,
    },

    {
        name: "Day Trader",
        reqs: [["totalTrades", 100]],
        id: "Market3",
        descript: "You understand how the market works. Still, you lose money every while. (+1000 bonus knowledge)",
        hint: "Continue.",
        give: [["knowledgeBonus", 1000]],
        unlocked: false,
    },

    {
        name: "The Dog of Wall Street",
        reqs: [["totalTrades", 999]],
        id: "Market4",
        descript: "You don't predict the market. The market predicts you. (+1000 Wisdom bonus)",
        hint: "They don't control you. You control them.",
        give: [["wisdomBonus", 1000]],
        unlocked: false,
    },

    {
        name: "Mining away..",
        reqs: [["miners", 5]],
        id: "Mining1",
        descript: "I'm proud you got here. Have +250 mental capacity, free of charge. You earned it.",
        hint: "This one's not too hard or easy really.",
        give: [["capBonus", 250]],
        unlocked: false,
    },

    {
        name: "DIAMONDS DIAMONDS!!",
        reqs: [["miners", 10]],
        id: "Mining2",
        descript: "(+10 Blue gems) It wasn't diamonds. It never is, because diamonds are extremely rare, and happen when carbon is pressurized at s...",
        hint: "You'll never see the day again.",
        give: [["blueGem", 10]],
        unlocked: false,
    },

    {
        name: "Eeny Meeny Miner Moe",
        reqs: [["miners", 25]],
        id: "Mining3",
        descript: "A tiger did not bite his toe, thankfully. But you DO get +500 energy ",
        hint: "blah blah no hint for you...",
        give: [["energy", 500]],
        unlocked: false,
    },

    {
        name: "The ultimate enslaver",
        reqs: [["miners", 100]],
        id: "Mining4",
        descript: "I mean, it's not slavery if you pay them and they can leave. So thanks for paying them their daily bar coins!! (+10000 barcoins)",
        hint: "You are a bit of a menance to society..",
        give: [["barcoins", 10000]],
        unlocked: false,
    },

    {
        name: "Stoned",
        reqs: [["stone", 100]],
        id: "Stone1",
        descript: "You're pretty hard to talk to (Another pun and +25 barcoins because why not)",
        hint: "This one's very very hard. A rock persay.",
        give: [["barcoins", 25]],
        unlocked: false,
    },

    {
        name: "Apprentice",
        reqs: [["magic", 20]],
        id: "Magic1",
        descript: "Generic as hell. Your actual title is 'Dumbeldorian the 2nd'.",
        hint: "Don't be like other players. Use your brain and wonder why that's there.",
        give: [["capBonus", 200]],
        unlocked: false,
    },

    {
        name: "Initiate",
        reqs: [["magic", 50]],
        id: "Magic2",
        descript: "Mastering it has never been harder. You're feeling like quicking as progress slows. (+10 blue gems at least)",
        hint: "Work on it",
        give: [["blueGem", 10]],
        unlocked: false,
    },

    {
        name: "Archmage",
        reqs: [["magic", 100]],
        id: "Magic3",
        descript: "It's been getting better. You've gotten your old talents back, that's for sure. And you start to remember it..those days.",
        hint: "No hint! Nada!",
        give: [["blueGem", 50]],
        unlocked: false,
    },

    {
        name: "Return of the great monarch",
        reqs: [["magic", 999]],
        id: "Magic4",
        descript: "You've finally figuired it out. You remember it all. And you're angry.",
        hint: "Learn some magic or something.",
        give: [["blueGem", 100], ["darkPyrite", 250]],
        unlocked: false,
    },
]

function createAchievementButtons() {
    document.getElementById("achievementContainer").innerHTML = "";

    let amountRan = player.settings.achievementDisplay+10;
    let containerId = 0;
    
    for (const btns of achievementStack) {
        amountRan += 1;

        if (amountRan>=player.settings.achievementDisplay) {
            const container = document.createElement("div");

            container.id = `${containerId}Container`;
            container.classList.add("achievementFlexer");

            document.getElementById("achievementContainer").appendChild(container);
            containerId += 1;
            amountRan = 0;
        }
    
        const button = document.createElement("button");
        button.id = btns.id;
        if (btns.unlocked) {
            button.style.backgroundColor = `#1b851b`;
        } else {
            button.style.backgroundColor = `#717171`;
        }

        button.classList.add("upgrade");
        button.innerText = `??? - ${btns.unlocked}`;

        document.getElementById(`${(containerId-1)}Container`).appendChild(button);
        button.addEventListener("click", () => { if (btns.unlocked) {say(btns.descript)} else {say(btns.hint); }});
    };
}

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