let mood = 0;
let moodStatus = "Ok";

const player = {
    knowledge: 0,
    cap: 100,
    baseKnowledgeIncrease: 1,
    wisdom: 0,
    wisdomRate: 5,
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

// THE PIT
document.getElementById("the-pit").addEventListener("click", () => {
    if (player.knowledge > 0 || player.wisdom > 0) {
        console.log("throwing")

        const addbuff = player.knowledge + player.wisdom*6

        player.knowledge = 0;
        player.wisdom = 0;

        const roll = Math.random()*100 + addbuff

        if (roll<25) {

            say("The pit shakes slightly, but is not impressed you stingy bum!")

        } else if (roll>=25 && roll<50) {

            say("The pit is mildly impressed, but does not care enough.")

        } else if (roll>=50 && roll<75) {

            say("Chanting can be heard from deep inside the pit. It is pleased.")
            player.knowledge = roundto1(Math.random() * 75); 

            if (document.getElementById("unlockwisdombtn").classList.contains("hidden")) {
                player.knowledge = roundto1(Math.max(player.knowledge - (Math.random() * 10), 0)); 
                say(`It has gifted you ${player.knowledge} knowledge. Be grateful.`)

            } else {

                player.wisdom = roundto1(Math.random() * 10); 
                say(`It has gifted you ${player.knowledge} knowledge and ${player.wisdom} wisdom. Be grateful.`)
            }

        } else if (roll>=75 && roll<100) {

            say("A nice smell wafts up from the pit. It's the greatest thing you've ever smelled")
            player.knowledge = roundto1(Math.random() * 250); 

            if (document.getElementById("unlockwisdombtn").classList.contains("hidden")) {
                player.knowledge = roundto1(Math.max(player.knowledge - (Math.random() * 50), 0)); 
                say(`It has gifted you ${player.knowledge} knowledge. Be grateful.`)

            } else {

                player.wisdom = roundto1(Math.random() * 25); 
                say(`It has gifted you ${player.knowledge} knowledge and ${player.wisdom} wisdom. Be grateful.`)
            }

        } else if (roll>=100) {
            
            say("Wow you got really lucky. Too bad getting a life doesn't come with this prize")
            player.knowledge = roundto1((Math.random() * 400)+100); 

            if (document.getElementById("unlockwisdombtn").classList.contains("hidden")) {
                say(`It has gifted you ${player.knowledge} knowledge. Be grateful.`)
            } else {
                player.wisdom = roundto1(Math.random() * 50); 
                say(`It has gifted you ${player.knowledge} knowledge and ${player.wisdom} wisdom. Be grateful.`)
            }
        }


    } else {
        say("You can't throw nothing into a pit idiot...")
    }
});

function roundto1(varib) {
    return parseFloat(varib.toFixed(1));
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