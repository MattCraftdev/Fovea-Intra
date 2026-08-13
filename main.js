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
    potionStock: [knowledge1 = 0, knowledge2 = 0, knowledge3 = 0],

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

- Add timer to pit (1 Hour, btw timer runs when game closes )
- Upgrades that cost a resource to fill up bar
- Bar leveling that gives you a resource every time the bar fills

- When knowledge/wisdom above cap, actively it slowly removes excess resources and mildly drains a bit of lifespan
- Make mood (happy, sad, etc.) fit into bar aswell and not appear on side and change bar color

- Added suggestions on what button was last clicked (tabs, bars)

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


// Potion creation system

document.getElementById("createPotion").addEventListener("click", () => {
    const resources = Math.random()*100+100;

    player.knowledge -= parseFloat(resources.toFixed(0));

    const randomPotion = Math.random()*100
    
    console.log(player.potionStock)

    const rollPotion = potionOdds.find(tier => tier.rollmin<=randomPotion && tier.rollmax>randomPotion );

    player.potionStock[rollPotion.Num] += 1;
    say(`You got ${rollPotion.Name} from Bobby!`)
});

const potionOdds = [
    {
        Num: 0,
        Name: "Knowledge Potion I",
        rollmin: 0,
        rollmax: 60,
    },

    {
        Num: 1,
        Name: "Knowledge Potion II",
        rollmin: 60,
        rollmax: 90,
    },


    {
        Num: 2,
        Name: "Knowledge Potion III",
        rollmin: 90,
        rollmax: 100,
    },

];