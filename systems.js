// Calculates cost relating to the bonuses (WILL DO SUBTRACTION BUT NOT RESULT, 
function calcCost(resourceCost) {
    let overallCanBuy = true;

    for (const costObject of resourceCost) {
        const [resourceType, cost] = costObject;
        let totalAmount = 0;

        if (resources[`${resourceType}Bonus`]) {
            totalAmount = resources[resourceType] + resources[`${resourceType}Bonus`]
        } else {
            totalAmount = resources[resourceType]
        }


        console.log(`Resource: ${resourceType}. Cost: ${cost}. Player amount with Bonus: ${totalAmount}`)

        costObject.payWithBonus = false;

        if (resources[resourceType]>=cost) {
            costObject.payWithBonus = false;

        } else if (totalAmount>=cost) {
            costObject.payWithBonus = true;

        } else {
            console.log(`Cannot buy, because player only has ${resources[resourceType]} ${resourceType}, which is less than ${cost} ${resourceType}`)
            overallCanBuy = false;
        }
        
    }
    if (overallCanBuy === true) {
        for (const costObject of resourceCost) { // Rechecks each object if they're all yes and ready to sell
            
            const [resourceType, cost] = costObject

            if (!costObject.payWithBonus) {
                resources[resourceType] -= cost;
            } else {
                const difference = cost - resources[resourceType];
                resources[resourceType] = 0;
                resources[`${resourceType}Bonus`] -= difference;
            }

        }        
    }

    return overallCanBuy;
}

// Display Loops
function displayLoop(timestamp) {
    solveMood(); // Updates Mood
    updateLifespan(); // Updates Lifespan
    displays(); // Displays
    updateMineshaft();

    checkIfUnlocked(); // Checks Upgrades/unlocks
    checkAchievements();

    recalcBuffs(); // For bars
    recalcBoosts(); // For anything boosts affect
    updateAllSpeeds();

    checkDeltaTime(timestamp);

    requestAnimationFrame(displayLoop);
}

let timeInterval = 500
const intervalTimers = [
    {
        id: "UpdateProgress",
        interval: 20,
        lastChecked: 20,
        execute: () => updateProgress(),
    },

    {
        id: "UpdateTime",
        interval: timeInterval,
        lastChecked: 500,
        execute: () => updateTime(),
    },

    {
        id: "UpdateMiners",
        interval: player.mine.minerInterval,
        lastChecked: 1000,
        execute: () => minerUpdate(),
    },
]

let timerintervalChecker = 0;

function checkDeltaTime(timeChanged) {
    for (const timer of intervalTimers) {
        const lastTimeTotal = timeChanged - timer.lastChecked
        if (lastTimeTotal>timer.interval) {
            timer.execute();
            timer.lastChecked = timeChanged
        }

        if (timer.id === "UpdateMiners") {
            timerintervalChecker = timeChanged - timer.lastChecked
        }
    }
}



let boosts = [
    {know: 1},
    {time: 1},
    {wis: 1},
    {speed: 1},
]

function recalcBoosts() {

    boosts.time = 1;
    boosts.wis = 1;
    boosts.speed = 1;
    boosts.know = 1;

    if (potionStock["Slow I"]>0) {
        boosts.time = boosts.time*0.8
    }
    if (potionStock["Slow II"]>0) {
        boosts.time = boosts.time*0.7
    }
    if (potionStock["Slow III"]>0) {
        boosts.time = boosts.time*0.6
    }
    if (potionStock["Slow IV"]>0) {
        boosts.time = boosts.time*0.4
    }

    if (potionStock["Slow I"] === 0 && potionStock["Slow II"] === 0 && potionStock["Slow III"] === 0 && potionStock["Slow IV"] === 0) {
        boosts.time = 1;
    }

    timeInterval = boosts.time*500

    if (potionStock["Knowledge I"]>0) {
        boosts.know = boosts.know*1.5
    }
    if (potionStock["Knowledge II"]>0) {
        boosts.know = boosts.know*2
    }
    if (potionStock["Knowledge III"]>0) {
        boosts.know = boosts.know*3
    }
    if (potionStock["Knowledge IV"]>0) {
        boosts.know = boosts.know*5
    }

    if (potionStock["Knowledge I"] === 0 && potionStock["Knowledge II"] === 0 && potionStock["Knowledge III"] === 0 && potionStock["Knowledge IV"] === 0) {
        boosts.know = 1;
    }

    document.getElementById("createKnowledge").innerText = `Create ${Math.floor(player.baseKnowledgeIncrease*boosts.know)} Knowledge`;

    if (potionStock["Wisdom I"]>0) {
        boosts.wis = boosts.wis*1.5
    }
    if (potionStock["Wisdom II"]>0) {
        boosts.wis = boosts.wis*2
    }
    if (potionStock["Wisdom III"]>0) {
        boosts.wis = boosts.wis*3
    }
    if (potionStock["Wisdom IV"]>0) {
        boosts.wis = boosts.wis*4
    }

    if (potionStock["Wisdom I"] === 0 && potionStock["Wisdom II"] === 0 && potionStock["Wisdom III"] === 0 && potionStock["Wisdom IV"] === 0) {
        boosts.wis = 1;
    } else {
        boosts.wis = Math.floor(boosts.wis); 
    }

    document.getElementById("createWisdom").innerText = `Create 1 wisdom +${Math.floor(player.wisdomClickPower*boosts.wis)}(${player.reflection}/${player.wisdomRate})`

}

function displays() {
    document.getElementById("displayKnowledge").innerText = "Knowledge: " + resources.knowledge;
    document.getElementById("displayKnowledgeBonus").innerText = ` (+${resources.knowledgeBonus})`

    document.getElementById("displayWisdom").innerText = "Wisdom: " + resources.wisdom;
    document.getElementById("displayWisdomBonus").innerText = ` (+${resources.wisdomBonus})`

    document.getElementById("displayMatter").innerText = "Matter: " + resources.matter;

    document.getElementById("displayBarcoins").innerText = `Barcoins: ${resources.barcoins}`
    document.getElementById("displayStone").innerText = `Stone: ${resources.stone}`
    document.getElementById("displayblackCrystal").innerText = `Black Crystal: ${resources.blackCrystal}`
    document.getElementById("displaydarkPyrite").innerText = `Dark Pyrite: ${resources.darkPyrite}`
    document.getElementById("displayblueGem").innerText = `Blue Gem: ${resources.blueGem}`

    document.getElementById("displayTotalMiners").innerText = `Total Miners: ${player.miners}`
    document.getElementById("buyMiner").innerText = `Buy a miner for ${player.mine.minerCost} Barcoins`

    document.getElementById("displayGoop").innerText = "Goop: " + resources.rawgoop;
    document.getElementById("displayGloop").innerText = "Gloop: " + resources.processedgloop;
    document.getElementById("displayEnergy").innerText = "Energy: " + resources.energy;

    document.getElementById("displayThePitTimer").innerText = `Time until reset: ${player.pitTimer}`
}


// Mood system
let mood = 0;
let moodStatus = "Ok";

function solveMood() {
    const ratio = Math.max(resources.knowledge+resources.wisdom*4, 0)/resources.cap
    mood = ratio*resources.cap
    
    if (mood>=resources.cap) {
        moodStatus = "Death awaits."
    }

    if (mood>resources.cap) {
        if (resources.knowledge>resources.wisdom*4) { // IF numerically more knowledge that wisdom contributes to moodcap
            if (resources.knowledge>0) {
                resources.knowledge -= 1;
            }  
        } else {
            if (resources.wisdom>0) {
                resources.wisdom -= 1;
            }
        }

    }

    else if (mood>=(resources.cap*0.9)) { moodStatus = "Depressed." }
    else if (mood>(resources.cap*0.6) && mood<(resources.cap*0.9)) { moodStatus = "Sad." }
    else if (mood>(resources.cap*0.4) && mood<(resources.cap*0.6)) { moodStatus = "Alright." }
    else if (mood>(resources.cap*0.1) && mood<(resources.cap * 0.4)) { moodStatus = "Happy" }
    else if (mood<=(resources.cap*0.1)) { moodStatus = "Overjoyed"; }
    else { moodStatus = "Ok" }

    if (document.getElementById("moodContainer").classList.contains("hidden")) {
        document.getElementById("displayMood").innerText = "Mood: " + moodStatus;
    } else {
        document.getElementById("moodBarDisplay").innerText =`Mood: ${moodStatus} (${Math.floor(mood.toFixed(0))}/${resources.cap})`;
        if (!document.getElementById("displayMood").classList.contains("hidden")) {
            document.getElementById("displayMood").classList.add("hidden")
        }
    }
};

let dead = false;
// Time System
function updateTime() {
    player.day += 1;
    if (player.day > 365) {
        player.day = 0;
        player.year += 1;
    };
    if (player.year>=player.lifespan && dead === false) {
        initiateDeath();
    }
    document.getElementById("displayDay").innerText = "Day: " + player.day;
    document.getElementById("displayYear").innerText = "Age: " + player.year;
};

function updateLifespan() {
    const lifespanReal = player.lifespan.toFixed(2) // Sets decimals to max 0.XX
    document.getElementById("displayLifespan").innerText = `/${lifespanReal} (Time left.)`
}

function initiateDeath() {
    console.log("Player has died, end.");
    document.getElementById("youDied").classList.remove("hidden");
    document.getElementById("hideDeath").classList.remove("hidden");
    document.getElementById("tryAgain").classList.remove("hidden");
    track("player_died")
    dead = true;
}

document.getElementById("tryAgain").addEventListener("click", () => {
    hardReset();
})

// Chatbox code
let maxMessages = 10;
const chatbox = document.getElementById("chatbox");

function say(message) {
    const msg = document.createElement("p");
    msg.classList.add("message");
    msg.textContent = message;
    chatbox.prepend(msg);
    // Max message count (set it)
    while (chatbox.children.length > maxMessages) {
        chatbox.lastElementChild.remove();
    };

    chatbox.scrollTop = chatbox.scrollHeight;
};

// Tab code foreach
const TabButtons = document.querySelectorAll(".tab-button");

TabButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Hides all tabs
        const tabId = button.dataset.tab;
        
        TabButtons.forEach(btn => btn.classList.remove("selectedTab"));
        for (const all of DropDown) {all.classList.remove("selectedTab")}
        document.querySelectorAll(".tab-content").forEach(tab => {
            tab.style.display = "none";
        });

        // Shows selected tab
        document.getElementById(tabId).style.display = "block";

        if (tabId == "Inventions") {
            inventionsBtn.classList.remove("glow");
        } else if (tabId == "Mining") {
            miningBtn.classList.remove("glow");
        }
        console.log(`Clicking on ${tabId}`);
        
        button.classList.add("selectedTab");
       
    });
});

// Grab your dropdown menu
const DropDown = document.getElementsByClassName("selector");

for (const all of DropDown) {
    all.addEventListener("click", (event) => {
        const tabId = event.target.value; 

        TabButtons.forEach(btn => btn.classList.remove("selectedTab"));
        for (const all of DropDown) {all.classList.remove("selectedTab")}
        document.querySelectorAll(".tab-content").forEach(tab => {
            tab.style.display = "none";
        });

        if (document.getElementById(tabId)) {
            document.getElementById(tabId).style.display = "block";            
        }

        all.classList.add("selectedTab");
        console.log(`Dropdown changed to ${tabId}`);
    });

}

// Lil thingy
function gainingStuff(stuff) {
    if (player.settings.visualEffects) {

        const div = document.createElement("div")
        div.innerText = stuff;
        div.classList.add("gainingStuff");

        const randomX = Math.random()*80+10;
        const randomY = Math.random()*80+10;

        div.style.left = `${randomX}%`;
        div.style.top = `${randomY}%`;

        div.classList.remove("hidden");
        document.body.appendChild(div);
        setTimeout(() => {
            div.remove();
        }, 1000); 
    };
};

document.getElementById("visualEffects").addEventListener("click", () => {
    if (player.settings.visualEffects === true) {
        player.settings.visualEffects = false;
        document.getElementById("visualEffects").innerText = "Visual Effects: Disabled";
    } else {
        player.settings.visualEffects = true;
        document.getElementById("visualEffects").innerText = "Visual Effects: Enabled";
    };
});