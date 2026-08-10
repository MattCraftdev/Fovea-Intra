const player = {
    knowledge: 0,
    cap: 100,
    baseKnowledgeIncrease: 1,
    wisdom: 0,
    wisdomRate: 5,
    lifespan: 50,
    day: 0,
    year: 0,
    totalpitrolls: 0,


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
let mood = 0;
let moodStatus = "Ok";

/*
Ideas:
- Pit of sacrifice where better loot thrown = better stuff back
- Add more to upgrade system
- Add timer to pit
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


const pitrolls = [
    {
        rollmin:0,
        rollmax:10,
        flavortext: "The pit shakes slightly, but is not impressed you stingy bum!",
        knowledgemax:0,
        wisdommax:0,
        moodcapadd:0,
    },

    {
        rollmin:10,
        rollmax:20,
        flavortext: "The pit still is not satisfied. Try throwing more.",
        knowledgemax:0,
        wisdommax:0,
        moodcapadd:0,
    },

    {
        rollmin:20,
        rollmax:30,
        flavortext: "A sour smell fills the air, but alas nothing comes from thee pit.",
        knowledgemax:0,
        wisdommax:0,
        moodcapadd:0,
    },

    {
        rollmin:30,
        rollmax:40,
        flavortext: "A little chime plays from the pit, and a neat package hits you in the head.",
        knowledgemax:20,
        wisdommax:2,
        moodcapadd:0,
    },

    {
        rollmin:40,
        rollmax:50,
        flavortext: "A small box floats out of the pit somehow, lightly hovering into your hands.",
        knowledgemax:50,
        wisdommax:5,
        moodcapadd:0,
    },

    {
        rollmin:50,
        rollmax:60,
        flavortext: "A bunch of thoughts fill your head, and suddenly you know. The pit laughs.",
        knowledgemax:75,
        wisdommax:10,
        moodcapadd:0,
    },

    {
        rollmin:60,
        rollmax:70,
        flavortext: "A bigger box is chucked at you from deep inside the pit.",
        knowledgemax:100,
        wisdommax:10,
        moodcapadd:0,
    },

    {
        rollmin:70,
        rollmax:80,
        flavortext: "The pit has a mild conversation with you, and gives you a hug.",
        knowledgemax:125,
        wisdommax:15,
        moodcapadd:0,
    },

    {
        rollmin:80,
        rollmax:90,
        flavortext: "The pit has a mild conversation with you, and gives you a hug.",
        knowledgemax:125,
        wisdommax:15,
        moodcapadd:0,
    },

    {
        rollmin:90,
        rollmax:95,
        flavortext: "The pit has a mild conversation with you, and gives you a hug.",
        knowledgemax:125,
        wisdommax:15,
        moodcapadd:0,
    },

    {
        rollmin:95,
        rollmax:96,
        flavortext: "A massive amount of knowledge floods your brain",
        knowledgemax:1000,
        wisdommax:0,
        moodcapadd:0,
    },

    {
        rollmin:96,
        rollmax:97,
        flavortext: "Wisdom fills you, and calm resides.",
        knowledgemax:0,
        wisdommax:250,
        moodcapadd:0,
    },

    {
        rollmin:97,
        rollmax:98,
        flavortext: "The pit takes away the strain of life.",
        knowledgemax:0,
        wisdommax:0,
        moodcapadd:25,
    },

    {
        rollmin:98,
        rollmax:99,
        flavortext: "You get nothing. Wait what, this is supposed to be a rare roll!?? DEVELOPER YOU-",
        knowledgemax:0,
        wisdommax:0,
        moodcapadd:0,
    },
    
    {
        rollmin:99,
        rollmax:100,
        flavortext: "You feel lucky. A shower of items fall onto you",
        knowledgemax:500,
        wisdommax:100,
        moodcapadd:25,
    },

    {
        rollmin:100,
        rollmax:1000,
        flavortext: "A whole lotta luck you're feeling",
        knowledgemax:1000,
        wisdommax:200,
        moodcapadd:0,
    },
]


// THE PIT
document.getElementById("the-pit").addEventListener("click", () => {
    if (player.knowledge > 0 || player.wisdom > 0) {
        console.log("throwing")

        const addbuff = player.knowledge + player.wisdom*6

        player.knowledge = 0;
        player.wisdom = 0;

        const roll = Math.random()*100 + (addbuff/100);

        const fitroll = pitrolls.find(tier => tier.rollmin<=roll && tier.rollmax>roll );

        if (!fitroll) {
            console.log("Roll number fitting in bracket not found!");
            say("The pit warps reality just to say no. LOL");
            return;
        }

        say(fitroll.flavortext);
        player.knowledge = roundto1(Math.max(Math.random()*fitroll.knowledgemax,0))
        player.cap += roundto1(Math.max(fitroll.moodcapadd,0))
        if (fitroll.moodcapadd>0) {
            say("Mood is calmed")
        }

        if (player.knowledge > 0) {
            say(`It has gifted you ${player.knowledge} knowledge. Be grateful.`);
        }

        if (!document.getElementById("unlockwisdombtn").classList.contains("hidden")) {
            player.wisdom = roundto1(Math.max(Math.random()*fitroll.wisdommax, 0))
            if (player.wisdom > 0) {
                say(`It has gifted you ${player.wisdom} wisdom. Be grateful.`);
            }
        }

        player.totalpitrolls += 1;
    } else {
        say("You can't throw nothing into a pit idiot...")
    }
});

function roundto1(varib) {
    return parseFloat(varib.toFixed(0));
};

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
const TabButtons= document.querySelectorAll(".tab-button");

TabButtons.forEach(button => {
    button.addEventListener("click", () => {
        const tabId = button.dataset.tab;

        // Hides all tabs
        document.querySelectorAll(".tab-content").forEach(tab => {
            tab.style.display = "none";

        });

        // Shows selected tab
        document.getElementById(tabId).style.display = "block";

        if (tabId == "Inventions") {
            inventionsBtn.classList.remove("glow");
        }
        console.log(`Clicking on ${tabId}`)

    });
});

// Save system (IMPORTANT!)
document.getElementById("saveGame").addEventListener("click", () => {
    saveGame();
    say("Game saved! (Hopefully)")
});

document.getElementById("loadGame").addEventListener("click", () => {
    loadGame();
    say("Game loaded! (Hopefully)")
});

document.getElementById("resetGame").addEventListener("click", () => {
    hardReset();
});


function hardReset() {
    if (confirm("Are you sure you want to erase your lifetime progress and start over?")) {
        localStorage.removeItem("gameSave");
        location.reload();
    }
}

const savenotif = document.getElementById("savingnotif")

function saveGame() {

    console.log("Saving game...")

    const allBars = [vitBar, flexBar, fitnessBar, magicBar, martialBar, magicstudyBar, hitBar, taichiBar];
    let state = {
            player: {
                knowledge: player.knowledge,
                day: player.day,
                year: player.year,
                cap: player.cap,
                baseKnowledgeIncrease: player.baseKnowledgeIncrease,
                wisdom: player.wisdom,
                wisdomRate: player.wisdomRate,
                lifespan: player.lifespan,
                totalpitrolls: player.totalpitrolls,
            },
            upgrades: upgrades.map(u => ({ id: u.id, unlocked: u.unlocked, purchased: u.purchased })),
            bars: allBars.map(b => ({ id: b.elementId, level: b.level, maxprogress: b.maxprogress, progress: b.progress}))
    };
    localStorage.setItem("gameSave", JSON.stringify(state));
    savenotif.classList.remove("hidden");
    setTimeout(() => {
        savenotif.classList.add("hidden");
    }, 1000); 
}

function loadGame() {
    let savedGame = localStorage.getItem("gameSave");
    if (savedGame) {
        let state = JSON.parse(savedGame);
        const allBars = [vitBar, flexBar, fitnessBar, magicBar, martialBar, magicstudyBar, hitBar, taichiBar];

        if (state.player) {
            player.knowledge = state.player.knowledge ?? player.knowledge;
            player.day = state.player.day ?? player.day;
            player.year = state.player.year ?? player.year;
            player.cap = state.player.cap ?? player.cap;
            player.baseKnowledgeIncrease = state.player.baseKnowledgeIncrease ?? player.baseKnowledgeIncrease;
            player.wisdom = state.player.wisdom ?? player.wisdom;
            player.wisdomRate = state.player.wisdomRate ?? player.wisdomRate;
            player.lifespan = state.player.lifespan ?? player.lifespan;
            player.totalpitrolls = state.player.totalpitrolls ?? player.totalpitrolls;
        }
    

        if (state.upgrades) {
            state.upgrades.forEach(savedU => {
                let realU = upgrades.find(u => u.id === savedU.id);
                if (realU) {
                    realU.unlocked = savedU.unlocked;
                    realU.purchased = savedU.purchased;
                }
            });
        }

        if (state.bars) {
            state.bars.forEach(savedB => {
                let realB = allBars.find(b => b.elementId === savedB.id);
                if (realB) {
                    realB.loadSaveData(savedB);
                }
            });
        }
    } else {
        console.log("no save found")
    }
};


window.addEventListener('DOMContentLoaded', () => {
    loadGame();
    setInterval(saveGame, 10000);
});