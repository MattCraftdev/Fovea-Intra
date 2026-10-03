const player = {
    matterCapNerf: 0.5,

    baseKnowledgeIncrease: 1,

    wisdomRate: 20,
    reflection: 0,
    wisdomClickPower:1,

    lifespan: 50,
    day: 0,
    year: 0,

    totalpitrolls: 0,
    pitTimer: 0,
    pitUsable: false,
    pitResetTime: 30000,
    pitMulti: 0,

    miners: 0,

    currentDealer: null,
    currentDealerSwitchable: false,
    currentPotionCost: null,

    currentPotionBuyable: false,

    saveInterval: 10000,

    mine: {
        minerCost: 100,
        minerlevel: 1,
        minerlevelProgress: 0,
        minerlevelMax: 200,
        minerInterval: 5000, // ms
    },

    inventory: {
        head: "empty",
        main: "empty",
        pants: "empty",
        hand: "empty",
    },

    marketStocks: 2,
    marketResetInterval: 60,

    structures: {
        hut: 0,
        shack: 0,
        house: 0,
        apartment: 0,

        shed: 0,
        storage_unit: 0,
        warehouse: 0,
    },

    settings: {
        extraStats: false,
    }
}

const potionStock = {
    stocks: [knowledge1 = 0, knowledge2 = 0, knowledge3 = 0, knowledge4 = 0,
        speed1 = 0, speed2 = 0, speed3 = 0, speed4= 0,
        wisdom1 = 0, wisdom2 = 0, wisdom3 = 0, wisdom4 = 0,
        slow1 = 0, slow2 = 0, slow3 = 0, slow4 = 0
    ],

    "Knowledge I": 0,
    "Knowledge II": 0,
    "Knowledge III": 0,
    "Knowledge IV": 0,
    "Speed I": 0,
    "Speed II": 0,
    "Speed III": 0,
    "Speed IV": 0,
    "Wisdom I": 0,
    "Wisdom II": 0,
    "Wisdom III": 0,
    "Wisdom IV": 0,
    "Slow I": 0,
    "Slow II": 0,
    "Slow III": 0,
    "Slow IV": 0,
}

const resources = {
    knowledge: 0,
    knowledgeBonus: 0,

    matter: 0,

    cap: 100,
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

/*
Ideas:
Fix error with after buying "hold" upgrade it doesn't work
Check if energy is obtainable before upgrade
Add toggle on/off for miner going (as upgrade because nun free in life)

Update ALL timers into the main reqAni fully
Update all boosts into a big pot for all (differentiate between set boosts by timers vs accumulated boosts)
Add crafting

- Free pit rolls (Like a token)
- The pit emits radiation or something that over time hurts the player. Can be removed to "dump sites"
- Add trash pit that rarely gives pit coins (used mainly for dumping)
     
- Cheap helptext upgrades

- Optimize upgrade code (merge id and name by making the id THE name but id is just without spaces)

- Automate displaying variables

- Add popup every ~10mins that asks user to give feedback (upgrade can disable it)

- Add more potion types

- Add inventions helptext for each upgrade (on what they do like bars)
- Make bars say their progress,speed, etc.
- Make mood say it's affect on the overall speed (Or just do the bars...lol)

- mass wisdom conversion upgrade
- mass energy conversion upgrade

- Add images
*/

document.getElementById("createKnowledge").addEventListener("mousedown", () => {
    holdDown("createKnowledge", "holdknowledge", knowledgeAction)
})

document.getElementById("createWisdom").addEventListener("mousedown", () => {
    holdDown("createWisdom", "holdwisdom", wisdomAction)
})


// Knowledge addition system + wisdom sys
const knowledgeAction = () => {
    const knowledgeIncrease = Math.floor(player.baseKnowledgeIncrease*boosts.know)
    if ((knowledgeIncrease+mood)<resources.cap) {
        resources.knowledge += knowledgeIncrease;
    } else {
        say("You got too much knowledge per click, so basically your mood can't support it.")
    }    
}

const wisdomAction = () => {
    if (mood+((Math.floor(player.reflection/player.wisdomRate)*4))<resources.cap) {
        const reflectionIncrease = player.wisdomClickPower*boosts.wis

        player.reflection += reflectionIncrease;
        if (player.reflection>=player.wisdomRate) {
            const leftOverAcc = player.reflection % player.wisdomRate;
            resources.wisdom += Math.floor(player.reflection/player.wisdomRate);
            player.reflection = leftOverAcc;
        } 
    } else {
        say("There's not enough mood capacity, so you can't have more wisdom. Damn developer doing this, we should overthrown him together!")
    }    
}

// Energy Systems
document.getElementById("collectGoop").addEventListener("click", () => {
    if (calcCost([["knowledge", 5]])) {
        resources.rawgoop += 1;
    } else {
        say("Not enough smarts up there laddy!")
    }
});

document.getElementById("processGloop").addEventListener("click", () => {
    if (calcCost([["knowledge", 5], ["rawgoop", 2]])) {
        resources.processedgloop += 1;
    } else {
        say("need more bucko!")
    }
});

document.getElementById("packageEnergy").addEventListener("click", () => {
    if (calcCost([["wisdom", 2], ["processedgloop", 2]])) {
        resources.energy += 1;
    } else {
        say("Not enough shtuff brochacho")
    }
});

// Matter System
document.getElementById("disableMatter").addEventListener("click", () => {
    matterBarActive = false;
});

document.getElementById("enableMatter").addEventListener("click", () => {
    if (mood>(resources.cap*0.5)) {
        say("Mood is too high! Lower it to less than half to enable the matterbar!")
    } else {
        matterBarActive = true;
    }
});

// If it's holding down
function holdDown(buttonId, upgradeId, action) {
    const element = document.getElementById(buttonId)
    let ifBought = false;
    const upgrade = upgrades.find(UP => UP.id === upgradeId);

    if (upgrade.purchased === 1) {
        ifBought = true;
    } else {
        ifBought = false;
    }

    
    if (element.hasHoldListener === true) return // Prevents stacking. Do not remove
    element.hasHoldListener = true;
    
    let timer = null;


    if (ifBought === true) {
        let pressTime = 0;
        const clickTime = 250;

        function normalClick() {
            if (Date.now()-pressTime<clickTime) {
                action()
            }
        }
        
        if (timer) {clearInterval(timer)}

        element.addEventListener("mousedown", () => {

            pressTime = Date.now()
            timer = setInterval(() => {
                action()
            }, 1000); // Runs action per 2 seconds

        })

        element.addEventListener("mouseup", () => {
            normalClick()
            clearInterval(timer)
        });

        element.addEventListener("mouseleave", () => {
            normalClick()
            clearInterval(timer)
        });


        if (timer) {
            console.log("timer is alive")
        }

    } else {
        element.addEventListener("click", () => {
            action()            
        })

        console.log("Clicking Normal")
    }
}

 
// Umami Tracking for detailed analytics to improve game (yeah well i need to know what to improve)
function track(event, data) {
    if (typeof umami !== "undefined") {
        umami.track(event, data);
    }
}

// If player is idle
let idleTime = Date.now();
let isIdle = false;
setInterval(() => {
    checkIdle()
    if (isIdle === false) {
        track("60_secondsActive")
    }
}, 60000); // Checks if idle every 60 secs

function checkIdle() {
    const timeElapsed = Date.now() - idleTime
    if (timeElapsed>(5*60000)) { // If it's been over (x) without a window tap
        isIdle = true;
    } else {
        isIdle = false;
    }
}

function resetIdleTimer() {
    idleTime = Date.now();
}

window.addEventListener('mousemove', resetIdleTimer);
window.addEventListener('keydown', resetIdleTimer);
window.addEventListener('click', resetIdleTimer);

// Clear console
setInterval(() => console.clear() , 120000); // 2 Minutes every clear

// Prevents clicking enter IMPORTANT!
window.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
}, true);

// Changelog embed iframe
document.getElementById("getChangelog").addEventListener("click", () => {
    if (document.getElementById("changelog").classList.contains("hidden")) {
        document.getElementById("changelog").classList.remove("hidden")
        document.getElementById("getChangelog").innerText = "Back"
    } else {
        document.getElementById("changelog").classList.add("hidden")
        document.getElementById("getChangelog").innerText = "Changelog"
    }
});

document.getElementById("getHelp").addEventListener("click", () => {
    if (document.getElementById("gameInfo").classList.contains("hidden")) {
        document.getElementById("gameInfo").classList.remove("hidden")
    }
});

document.getElementById("backHelp").addEventListener("click", () => {
    document.getElementById("gameInfo").classList.add("hidden")
});

document.getElementById("closeStory").addEventListener("click", () => {
    document.getElementById("Story").classList.add("hidden")
});

document.getElementById("showStory").addEventListener("click", () => {
    if (document.getElementById("Story").classList.contains("hidden")) {
        document.getElementById("Story").classList.remove("hidden")
    }
});

document.getElementById("extraStats").addEventListener("click", () => {
    if (player.settings.extraStats === true) {
        player.settings.extraStats = false;
        document.getElementById("extraStats").innerText = "Extra Stats Disabled"
    } else {
        player.settings.extraStats = true;
        document.getElementById("extraStats").innerText = "Extra Stats Enabled"
    }
})