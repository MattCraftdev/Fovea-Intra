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
        };
        updateAllSpeeds();
    };

    reset() {
        this.progress = 0;
        this.level = 1;

    };  

    getLevel() {
        return this.level;
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
const fitnessBar = new ProgressBar("fitness", 10, 2500, 1.25);
const martialBar = new ProgressBar("martial", 10, 3500, 1.3);
const hitBar = new ProgressBar("hit", 10, 5000, 1.25);
const taichiBar = new ProgressBar("taichi", 10, 4000, 1.15);

const knowledgeBar = new ProgressBar("knowledge", 10, 10000, 1.2);

const magicBar = new ProgressBar("magic", 10, 25000, 1.25);
const magicstudyBar = new ProgressBar("magicstudy", 10, 10000, 1.15);

const moodBar = new ProgressBar("mood", 0, 0, 0)

const barInfo = { // activebar id, then says their bar then name to DISPLAY
    vit: [vitBar, "Vitality"],
    flex: [flexBar, "Flexability"],
    knowledge: [knowledgeBar, "Knowledge"],
    fitness: [fitnessBar, "Fitness"],
    magic: [magicBar, "Magic"],
    martial: [martialBar, "Martial Arts"],
    magicstudy: [magicstudyBar, "Magic Study"],
    hit: [hitBar, "HIT"],
    taichi: [taichiBar, "Tai Chi"]
}   

// Vars
let flexbuff = 0;
let fitnessbuff = 0;
let magicbuff = 0;
let magicstudybuff = 0;
let taichinerf = 0;
let hitbuff = 0;

let activeBar = null;

// Update Progress Bars
function updateProgress() {
    
    const chosenBar = barInfo[activeBar]

    if (chosenBar) {
        chosenBar[0].update();
        document.getElementById(`${activeBar}LevelDisplay`).innerText = `${chosenBar[1]} Level: ${chosenBar[0].getLevel()}`

        document.querySelectorAll(".progress-container").forEach(bar => bar.classList.remove("selectedTab"));
        document.getElementById(`${activeBar}btn`).classList.add("selectedTab");
    }



    flexbuff = flexBar.getLevel()*2;
    fitnessbuff = fitnessBar.getLevel()*2
    magicbuff = magicBar.getLevel()
    magicstudybuff = magicstudyBar.getLevel()*2
    taichinerf = taichiBar.getLevel()*3
    hitbuff = hitBar.getLevel()*2

    recalcBuffs();
};


// Updates all speeds quickly
function updateAllSpeeds() {
    const currentProgress = mood/player.cap;
    const mooddiff = 0.5 - currentProgress;
    const baseSpeed = 10

    const baseMoodspeed = baseSpeed + mooddiff*10
    const healthsum = taichinerf-hitbuff;

    vitBar.speed = baseMoodspeed + flexbuff + healthsum
    flexBar.speed = baseMoodspeed + fitnessbuff + healthsum
    fitnessBar.speed = baseMoodspeed + healthsum
    martialBar.speed = baseMoodspeed + healthsum
    hitBar.speed = baseMoodspeed + healthsum

    knowledgeBar.speed = baseMoodspeed + magicstudybuff;

    magicBar.speed = baseMoodspeed;
    magicstudyBar.speed = baseMoodspeed + magicbuff - 10;
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
    player.cap = 100+(vitBar.level*5)+(martialBar.level*10)+(taichiBar.level*100)-(fitnessBar.level*2)+player.capBonus;
    player.lifespan = 50;

    if (vitBar.level>=10) {document.getElementById("flexContainer").classList.remove("hidden");}

    player.baseKnowledgeIncrease = (knowledgeBar.level) + 1;
    document.getElementById("createKnowledge").innerText = `Create ${player.baseKnowledgeIncrease} Knowledge`;
};
