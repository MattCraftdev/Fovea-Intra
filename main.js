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

/*
Ideas:
- Pit of sacrifice where better loot thrown = better stuff back
- Add more to upgrade system
- Add timer to pit
- FIX ERROR
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