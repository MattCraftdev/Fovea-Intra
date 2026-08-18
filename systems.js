// Calculates cost relating to the bonuses (WILL DO SUBTRACTION BUT NOT RESULT, 
function calcCost(resourceType, cost) {

    const totalAmount = player[resourceType] + player[`${resourceType}Bonus`]

    console.log(totalAmount)

    if (player[resourceType]>=cost) {

        player[resourceType] -= cost
        return true;

    } else if (totalAmount>=cost) {
        const difference = cost - player[resourceType];
        player[resourceType] = 0;
        player[`${resourceType}Bonus`] -= difference;

        return true;

    } else {
        console.log("cannot buy because not enough lol")
        return false;
    }
    
}

// Display Loops
setInterval(() => {
    document.getElementById("displayKnowledge").innerText = "Knowledge: " + player.knowledge;
    document.getElementById("displayKnowledgeBonus").innerText = ` (+${player.knowledgeBonus})`

    document.getElementById("displayWisdom").innerText = "Wisdom: " + player.wisdom;
    document.getElementById("displayWisdomBonus").innerText = ` (+${player.wisdomBonus})`

    document.getElementById("displayMatter").innerText = "Matter: " + player.matter;
    document.getElementById("displayMatterBonus").innerText = ` (+${player.matterBonus})`

    document.getElementById("displayGoop").innerText = "Goop: " + player.rawgoop;
    document.getElementById("displayGloop").innerText = "Gloop: " + player.processedgloop;
    document.getElementById("displayEnergy").innerText = "Energy: " + player.energy;

    document.getElementById("displayThePitTimer").innerText = `Time until reset: ${player.pitTimer}`
    
    solveMood();
    updateLifespan();
}, 50);


// Mood system
let mood = 0;
let moodStatus = "Ok";

function solveMood() {
    const ratio = Math.min(Math.max(player.knowledge+player.wisdom*2, 0)/player.cap, 1)
    mood = ratio*player.cap
    
    if (mood>=player.cap) {
        mood = player.cap;
        moodStatus = "Death awaits."
    }

    else if (mood>=(player.cap*0.9)) { moodStatus = "Depressed." }
    else if (mood>(player.cap*0.6) && mood<(player.cap*0.9)) { moodStatus = "Sad." }
    else if (mood>(player.cap*0.4) && mood<(player.cap*0.6)) { moodStatus = "Alright." }
    else if (mood>(player.cap*0.1) && mood<(player.cap * 0.4)) { moodStatus = "Happy" }
    else if (mood<=(player.cap*0.1)) { moodStatus = "Overjoyed"; }
    else { moodStatus = "Ok" }

    

    if (mood<0) { mood = 0; }

    const fillratio = mood/player.cap
    if (document.getElementById("moodContainer").classList.contains("hidden")) {
        document.getElementById("displayMood").innerText = "Mood: " + moodStatus;
    } else {
        moodBar.element.style.width = fillratio*100 + "%";
        document.getElementById("moodBarDisplay").innerText =`Mood: ${moodStatus} (${Math.floor(mood.toFixed(0))}/${player.cap})`;
        moodBar.element.style.backgroundColor = `hsl(${(1-fillratio)*120}, 100%, 45%)`;

        if (!document.getElementById("displayMood").classList.contains("hidden")) {
            document.getElementById("displayMood").classList.add("hidden")
        }
    }

};

// Time System
function updateTime() {
    player.day += 1;
    if (player.day > 365) {
        player.day = 0;
        player.year += 1;
    };
    if (player.year>=player.lifespan) {
        initiateDeath();
    }
    document.getElementById("displayDay").innerText = "Day: " + player.day;
    document.getElementById("displayYear").innerText = "Age: " + player.year;
};

function updateLifespan() {
    const lifespanReal = player.lifespan.toFixed(2) // Sets decimals to max 0.XX
    document.getElementById("displayLifespan").innerText = `/${lifespanReal} (Time left.)`
}

setInterval(() => {
    updateTime();
}, 500); // Day per X, in this case 2 days per sec

function initiateDeath() {
    console.log("Player has died, end.");
    document.getElementById("youDied").classList.remove("hidden");
    document.getElementById("hideDeath").classList.remove("hidden");
    document.getElementById("tryAgain").classList.remove("hidden");
}

document.getElementById("tryAgain").addEventListener("click", () => {
    hardReset();
})

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
const TabButtons = document.querySelectorAll(".tab-button");



TabButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Hides all tabs
        const tabId = button.dataset.tab;
        
        TabButtons.forEach(btn => btn.classList.remove("selectedTab"));
        
        document.querySelectorAll(".tab-content").forEach(tab => {
            tab.style.display = "none";
        });

        // Shows selected tab
        document.getElementById(tabId).style.display = "block";

        if (tabId == "Inventions") {
            inventionsBtn.classList.remove("glow");
        };
        console.log(`Clicking on ${tabId}`);
        
        button.classList.add("selectedTab");
       
    });
});