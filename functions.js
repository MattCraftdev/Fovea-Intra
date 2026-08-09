// Display Loops
setInterval(() => {
    document.getElementById("displayKnowledge").innerText = "Knowledge: " + player.knowledge;
    document.getElementById("displayWisdom").innerText = "Wisdom: " + player.wisdom;
    solveMood();
    updateLifespan();
}, 20);


function solveMood() {
    let ratio = Math.min(Math.max(player.knowledge+player.wisdom*player.wisdomRate, 1)/player.cap, 1)
    mood = ratio*player.cap
    
    if (mood>=player.cap) {
        mood = player.cap;
        moodStatus = "Death awaits."
    }

    else if (mood>=(player.cap*0.9)) {
        moodStatus = "Depressed."
    }

    else if (mood>(player.cap*0.6) && mood<(player.cap*0.9)) {
        moodStatus = "Sad."
    }
    
    else if (mood>(player.cap*0.4) && mood<(player.cap*0.6)) {
        moodStatus = "Alright."
    }

    else if (mood>(player.cap*0.1) && mood<(player.cap * 0.4)) {
        moodStatus = "Happy"
    }

    else if (mood<=(player.cap*0.1)) {
        moodStatus = "Overjoyed";
    }

    else {
        moodStatus = "Ok"
    }

    document.getElementById("displayMood").innerText = "Mood: " + moodStatus;
    

    if (mood<0) {
        mood = 0;
    }
};



// Time System
let day = 0;
let year = 0;

function updateTime() {
    day += 1;
    if (day > 365) {
        day = 0;
        year += 1;
    };

    if (year>=player.lifespan) {
        initiateDeath();
    }

    document.getElementById("displayDay").innerText = "Day: " + day;
    document.getElementById("displayYear").innerText = "Age: " + year;
};

function updateLifespan() {
    const lifespanReal = player.lifespan.toFixed(2) // Sets decimals to max 0.XX
    document.getElementById("displayLifespan").innerText = "Lifespan: " + lifespanReal;
}

setInterval(() => {
    updateTime();
}, 500); // Day per X

function initiateDeath() {
    console.log("Player has died, end.")
    document.getElementById("youDied").classList.remove("hidden")
    document.getElementById("hideDeath").classList.remove("hidden")
}