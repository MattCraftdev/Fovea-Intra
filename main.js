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
}

/*
Ideas:
- Pit of sacrifice where better loot thrown = better stuff back
- Add more to upgrade system
- Add timer to pit (1 Hour, btw timer runs when game closes for ca;c)
- potientally add a bar that fills up when lifespan/maxlifespan
- Upgrades that cost a resource to fill up bar
- Bar leveling that gives you a resource every time the bar fills
- When knowledge/wisdom above cap, actively it slowly removes excess resources
- Make mood (happy, sad, etc.) fit into bar aswell and not appear on side
- Have a way to easily increase moodcap!
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
