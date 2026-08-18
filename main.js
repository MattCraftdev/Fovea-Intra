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
    pitResetTime: 60000,
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

- Maybe make some upgrades unlock 2 bars

- When knowledge/wisdom above cap, actively it slowly removes excess resources and mildly drains a bit of lifespan

- Process gloop/goop change to switch upgrade (COMPLETE IT WITH CALC)
- Make upgrades able to take more than 1 cost

- Add potions III

- Add inventions helptext for each upgrade (on what they do like bars)
- Make bars say their progress,speed, etc.

- mass wisdom conversion upgrade, and better wisdom conversion (same thing with energy)

- Add images
*/

// Knowledge addition system + wisdom sys
document.getElementById("createKnowledge").addEventListener("click", () => {
    if (mood<player.cap) {
        player.knowledge += player.baseKnowledgeIncrease;
    } else {
        console.log(`knowledge is ${player.knowledge}. Mood is ${mood}. Currently MOOD is BAD!`)
    }
});

document.getElementById("switchtoWisdom").addEventListener("click", () => {
    player.reflection += player.wisdomClickPower;

    if (player.reflection>=player.wisdomRate) {
        const leftOverAcc = player.reflection % player.wisdomRate;
        player.wisdom += Math.floor(player.reflection/player.wisdomRate);
        player.reflection = leftOverAcc;
        
    } 

    document.getElementById("switchtoWisdom").innerText = `Create 1 wisdom (${player.reflection}/${player.wisdomRate})`
});

// Energy Systems
document.getElementById("collectGoop").addEventListener("click", () => {
    if (calcCost("knowledge", 5)) {
        player.rawgoop += 1;
    } else {
        say("Not enough smarts up there laddy!")
    }
});

document.getElementById("processGloop").addEventListener("click", () => {
    if (player.knowledge>4 && player.rawgoop>1) {
        player.knowledge -= 5;
        player.rawgoop -= 2;
        player.processedgloop += 1;
    } else {
        say("need more bucko!")
    }
});

document.getElementById("packageEnergy").addEventListener("click", () => {
    if (player.wisdom>1 && player.processedgloop>1) {
        player.wisdom -= 2;
        player.processedgloop -= 2;
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
    matterBarActive = true;
});


// Prevents clicking enter IMPORTANT!
window.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.keyCode === 13) {
    e.preventDefault();
  }
}, true);