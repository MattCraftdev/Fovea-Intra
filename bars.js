// Class OOP for progress bars
class ProgressBar {
    constructor(elementId, speed = 1, maxprogress = 100, expoincrease) {
        this.elementId = elementId;
        this.progress = 0;
        this.maxprogress = maxprogress;
        this.level = 0;
        this.speed = speed;
        this.element = document.getElementById(elementId);
        this.expoincrease = expoincrease;
    };
    
    update() {
        if (this.progress < this.maxprogress) {
            this.progress += this.speed;
            let widthPercent = Math.min((this.progress / this.maxprogress) * 100, 100);
            this.element.style.width = widthPercent + "%";
        } else {
            this.level++;
            this.progress = 0;
            console.log(`${this.progress}/${this.maxprogress}. Speed is ${this.speed}`)
            // Expo increase value
            this.maxprogress = this.maxprogress*this.expoincrease;
            track(this.elementId)
            if (this.elementId === "matter") {
                player.matter += 1;
            }
            
        };
        updateAllSpeeds();
    };

    reset() {
        this.progress = 0;
        this.level = 1;
    };

    getSaveData() {
        return {
            elementId: this.elementId,
            level: this.level,
            maxprogress: this.maxprogress,
            progress: this.progress,
        };
    }

    loadSaveData(savedData) {
        if (savedData) {
            this.level = savedData.level;
            this.maxprogress = savedData.maxprogress;
            this.progress = savedData.progress;
            if (this.elementId) {
                document.getElementById(`${this.elementId}LevelDisplay`).innerText = `${barInfo[this.elementId][1]} Level: ${this.level}`;
                let widthPercent = Math.min((this.progress / this.maxprogress) * 100, 100);
                this.element.style.width = widthPercent + "%";
            }
        }
            
    }
};

// Progress Bars
const vitBar = new ProgressBar("vit", 10, 1000, 1.15);
const flexBar = new ProgressBar("flex", 10, 500, 1.1);
const mediateBar = new ProgressBar("mediate", 10, 2000, 1.2);
const martialBar = new ProgressBar("martial", 10, 3500, 1.2);
const hitBar = new ProgressBar("hit", 10, 5000, 1.25);
const taichiBar = new ProgressBar("taichi", 10, 4000, 1.15);

const knowledgeBar = new ProgressBar("knowledge", 10, 10000, 1.15);
const wisdomBar = new ProgressBar("wisdom", 10, 4000, 1.25);

const magicBar = new ProgressBar("magic", 10, 5000, 1.2);
const magicstudyBar = new ProgressBar("magicstudy", 10, 10000, 1.15);
const magiclearnerBar = new ProgressBar("magiclearner", 10, 25000, 1.3);
const abyssalBar = new ProgressBar("abyssal", 10, 10000, 1.25);

const moodBar = new ProgressBar("mood", 0, 0, 0); // Do not mark. Placeholder Bar!!!
const matterBar = new ProgressBar("matter", 10, 2500, 1.0003);

const barInfo = { // activebar id, then says their bar then name to DISPLAY
    vit: [vitBar, "Vitality"],
    flex: [flexBar, "Flexability"],
    knowledge: [knowledgeBar, "Knowledge"],
    mediate: [mediateBar, "Mediate"],
    martial: [martialBar, "Martial Arts"],
    hit: [hitBar, "HIT"],
    taichi: [taichiBar, "Tai Chi"],
    magic: [magicBar, "Magic"],
    magicstudy: [magicstudyBar, "Magic Study"],
    magiclearner: [magiclearnerBar, "Magic Learner"],
    abyssal: [abyssalBar, "Abyssal"],
    matter: [matterBar, "Matter"],
    wisdom: [wisdomBar, "Wisdom Bar"],
}   

// Vars
let flexbuff = 0;
let mediatebuff = 0;
let magicbuff = 0;
let magicstudybuff = 0;
let taichinerf = 0;
let hitbuff = 0;
let magiclearnerbuff = 0;

let activeBar = null;
let matterBarActive = false;

// Update Progress Bars
function updateProgress() {
    
    const chosenBar = barInfo[activeBar]

    if (chosenBar) {
        chosenBar[0].update();
        document.getElementById(`${activeBar}LevelDisplay`).innerText = `${chosenBar[1]} Level: ${chosenBar[0].level}`

        document.querySelectorAll(".progress-container").forEach(bar => bar.classList.remove("selectedTab"));
        document.getElementById(`${activeBar}btn`).classList.add("selectedTab");
    }

    if (matterBarActive) {
        matterBar.update();
        document.getElementById(`matterLevelDisplay`).innerText = `Matter Level: ${matterBar.level}`
    }

    // Buffs by speed
    flexbuff = flexBar.level*2;
    mediatebuff = mediateBar.level*2
    magicbuff = magicBar.level
    magicstudybuff = magicstudyBar.level*2
    taichinerf = taichiBar.level*3
    hitbuff = hitBar.level*2
    magiclearnerbuff = magiclearnerBar.level*3

    recalcBuffs();
};


// Updates all speeds quickly
function updateAllSpeeds() {
    const currentProgress = mood/player.cap;
    const mooddiff = 0.5 - currentProgress;
    const baseSpeed = 10

    // Total Mood diff between (5 and -5). BTW bMs is the total average and affects ALL Bars. Careful.
    const baseMoodspeed = (baseSpeed + mooddiff*10)+magiclearnerbuff
    let magicsum = (magicbuff-10)+mediatebuff
    let healthsum = taichinerf-hitbuff;

    if (healthsum+baseMoodspeed<1) {
        healthsum = -5;
    }
    if (magicsum+baseMoodspeed<1) {
        magicsum = -5;
    }

    vitBar.speed = baseMoodspeed + flexbuff + healthsum
    flexBar.speed = baseMoodspeed + healthsum
    mediateBar.speed = baseMoodspeed + healthsum
    martialBar.speed = baseMoodspeed + healthsum
    hitBar.speed = baseMoodspeed + healthsum

    knowledgeBar.speed = baseMoodspeed + magicstudybuff;

    magicBar.speed = baseMoodspeed;
    magicstudyBar.speed = baseMoodspeed + magicsum
    magiclearnerBar.speed = baseMoodspeed + magicsum
    abyssalBar.speed = baseMoodspeed + magicsum

}

// Setting interval higher = worse transitioning rate. Currently 
setInterval(updateProgress, 20);

// Gets the progress
const progressContainers = document.getElementsByClassName('progress-container');
for (const all of progressContainers) {
    all.addEventListener("click", () => {
        activeBar = all.id.replace("btn", "")
    });
};

// Recalculates buffs
function recalcBuffs() {
    if (matterBarActive === true) {
        player.matterCapNerf = 0.5
    } else {
        player.matterCapNerf = 1;
    }

    player.cap = Math.floor((100+(vitBar.level*5)+(martialBar.level*10)+(taichiBar.level*100)-(mediateBar.level)+player.capBonus)*player.matterCapNerf)
    
    player.lifespan = 50;

    player.wisdomClickPower = wisdomBar.level+1;
    player.matterCapNerf = 0.5

    if (vitBar.level>=10) {document.getElementById("flexContainer").classList.remove("hidden");}

    player.baseKnowledgeIncrease = (knowledgeBar.level) + 1;
    document.getElementById("createKnowledge").innerText = `Create ${player.baseKnowledgeIncrease} Knowledge`;
    player.pitMulti = 1+(abyssalBar.level/50)
};
