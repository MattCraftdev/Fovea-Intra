
let mood = 0;
let moodStatus = "Ok";

const player = {
    knowledge: 0,
    knowledgeCap: 1000,
    baseKnowledgeIncrease: 1,
    wisdom: 0,
    lifespan: 50,




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

}


/*
Ideas:
- Knowledge Cap through mood
- Add coping mech which increases mood tolerance/knowledgecap
- Add chatbox message multiple
- Potiental change to mood sys (ratio*1000)
- Add more to upgrade system
- Group sections more thouroughly
*/

// Knowledge accumilination system
document.getElementById("createKnowledge").addEventListener("click", () => {
    if (mood<player.knowledgeCap) {
        player.knowledge += player.baseKnowledgeIncrease;
    } else {
        console.log(`knowledge is ${player.knowledge}. Mood is ${mood}`)
    }
});

document.getElementById("switchtoWisdom").addEventListener("click", () => {
    if (player.knowledge>4) {
        player.knowledge -= 5;
        player.wisdom += 1;
    }
});

// Chatbox creation to send a message
function say(message) {
    document.getElementById("messageplaceholder").innerText = message;
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