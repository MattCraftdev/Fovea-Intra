const player = {
    knowledge: 0,
    knowledgeBonus: 0,

    matter: 0,
    matterBonus: 0,
    matterCapNerf: 0.5,

    baseKnowledgeIncrease: 1,

    cap: 100,
    capBonus: 0,

    wisdom: 0,
    wisdomBonus: 0,
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

    rawgoop: 0,
    processedgloop: 0,
    energy: 0,

    potionStock: [knowledge1 = 0, knowledge2 = 0, knowledge3 = 0, knowledge4 = 0,
        speed1 = 0, speed2 = 0, speed3 = 0, speed4= 0,
    ],
    currentDealer: null,

    saveInterval: 10000,
}

/*
Ideas:
- Free pit rolls (Like a token)
- The pit emits radiation or something that over time hurts the player. Can be removed to "dump sites"
- Add trash pit that rarely gives pit coins (used mainly for dumping)

- Maybe make some upgrades unlock 2 bars
- Cheap helptext upgrades
- Upgrade that reveals max resources reached on each resource
- Make story able to be hidden and have different chat types (flavortext, storytext, pittext, etc.)

- Add potions III

- Add inventions helptext for each upgrade (on what they do like bars)
- Make bars say their progress,speed, etc.
- Make mood say it's affect on the overall speed (Or just do the bars...lol)

- mass wisdom conversion upgrade
- mass energy conversion upgrade

- Fix issue with unlocker (It adds and at the start of sentence)

- Add images
*/

// Knowledge addition system + wisdom sys
document.getElementById("createKnowledge").addEventListener("click", () => {
    if (player.baseKnowledgeIncrease+mood<player.cap) {
        player.knowledge += player.baseKnowledgeIncrease;
    } else {
        say("You got too much knowledge per click, so basically your mood can't support it.")
    }
});

document.getElementById("switchtoWisdom").addEventListener("click", () => {
    if (mood+4<player.cap) {    
        player.reflection += player.wisdomClickPower;
        if (player.reflection>=player.wisdomRate) {
            const leftOverAcc = player.reflection % player.wisdomRate;
            player.wisdom += Math.floor(player.reflection/player.wisdomRate);
            player.reflection = leftOverAcc;
        } 
    } else {
        say("There's not enough mood capacity, so you can't have more wisdom. Damn developer doing this, we should overthrown him together!")
    }
});

// Energy Systems
document.getElementById("collectGoop").addEventListener("click", () => {
    if (calcCost([["knowledge", 5]])) {
        player.rawgoop += 1;
    } else {
        say("Not enough smarts up there laddy!")
    }
});

document.getElementById("processGloop").addEventListener("click", () => {
    if (calcCost([["knowledge", 5], ["rawgoop", 2]])) {
        player.processedgloop += 1;
    } else {
        say("need more bucko!")
    }
});

document.getElementById("packageEnergy").addEventListener("click", () => {
    if (calcCost([["wisdom", 2], ["processedgloop", 2]])) {
        player.energy += 1;
    } else {
        say("Not enough shtuff brochacho")
    }
});

// Matter System
document.getElementById("disableMatter").addEventListener("click", () => {
    matterBarActive = false;
});

document.getElementById("enableMatter").addEventListener("click", () => {
    if (mood>(player.cap*0.5)) {
        say("Mood is too high! Lower it to less than half to enable the matterbar!")
    } else {
        matterBarActive = true;
    }
});

// Umami Tracking for detailed analytics to improve game (yeah well i need to know what to improve)
function track(event, data) {
    if (typeof umami !== "undefined") {
        umami.track(event, data);
    }
}

setInterval(() => track("60_secondsStayed"), 60000); // 60 secs

// Clear console
setInterval(() => console.clear() , 120000); // 2 Minutes every clear

// Prevents clicking enter IMPORTANT!
window.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.keyCode === 13) {
    e.preventDefault();
  }
}, true);

// Changelog embed iframe
document.getElementById("getChangelog").addEventListener("click", () => {
    if (document.getElementById("changelog").classList.contains("hidden")) {
        document.getElementById("changelog").classList.remove("hidden")
    } else {
        document.getElementById("changelog").classList.add("hidden")
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
