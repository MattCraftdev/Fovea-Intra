const player = {
    knowledge: 0,
    cap: 100,
    capBonus: 0,
    baseKnowledgeIncrease: 1,
    wisdom: 0,
    wisdomRate: 5,
    lifespan: 50,
    day: 0,
    year: 0,
    totalpitrolls: 0,
    rawgoop: 0,
    processedgloop: 0,
    energy: 0,
    potionStock: [knowledge1 = 0, knowledge2 = 0, knowledge3 = 0, knowledge4 = 0,
        speed1 = 0, speed2 = 0, speed3 = 0, speed4= 0,
    ],
    currentDealer: null,



    get vitLevel () {
        return vitBar.getLevel();
    },
    get flexLevel () {
        return flexBar.getLevel();
    },
    get fitnessLevel () {
        return fitnessBar.getLevel();
    },
    get magicLevel () {
        return magicBar.getLevel();
    },
    get martialLevel () {
        return martialBar.getLevel();
    },
    get magicstudyLevel () {
        return magicstudyBar.getLevel();
    },
    get hitLevel() {
        return hitBar.getLevel();
    },
    get taichiLevel () {
        return taichiBar.getLevel();
    },

    saveInterval: 10000,
}

/*
Ideas:
- Pit of sacrifice where better loot thrown = better stuff back
- Reduce effectiveness of simply throwing with low knowledge (maybe add when player.cap is = knowledge+wisdom, etc.)
- Free pit rolls (Like a token)
- Add timer to pit (1 Hour, btw timer runs when game closes )
- The pit maybe works only when you have mood capped
- Better pit algorithim

- When knowledge/wisdom above cap, actively it slowly removes excess resources and mildly drains a bit of lifespan
- Make mood (happy, sad, etc.) fit into bar aswell and not appear on side

- mass wisdom conversion upgrade, and better wisdom conversion (same thing with energy)

- Cleanup mess with allBars vs barInfo
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
    if (player.knowledge>player.wisdomRate-1) {
        player.knowledge -= player.wisdomRate;
        player.wisdom += 1;
    }
});

// Energy Systems
document.getElementById("collectGoop").addEventListener("click", () => {
    if (player.knowledge>4) {
        player.knowledge -= 5;
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