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
            
            if (this.elementId === "creation") {
                player.matter += 1;
            } else {
                track(this.elementId)
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
            console.log(this.elementId)
            this.element = document.getElementById(this.elementId);
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

const studyBar = new ProgressBar("study", 10, 10000, 1.15);
const peaceBar = new ProgressBar("peace", 10, 4000, 1.25);
const insightBar = new ProgressBar("insight", 10, 6000, 1.2);

const magicBar = new ProgressBar("magic", 10, 5000, 1.2);
const magicstudyBar = new ProgressBar("magicstudy", 10, 10000, 1.15);
const magiclearnerBar = new ProgressBar("magiclearner", 10, 25000, 1.3);
const abyssalBar = new ProgressBar("abyssal", 10, 10000, 1.25);

const moodBar = new ProgressBar("mood", 0, 0, 0); // Do not mark. Placeholder Bar!!!
const creationBar = new ProgressBar("creation", 10, 2500, 1.0003);

const barInfo = { // activebar id, then says their bar then name to DISPLAY
    vit: [vitBar, "Vitality", "Vitality increases mood tolerance, meaning you can hold more resources"],
    flex: [flexBar, "Flexability", "Flexability increases the speed of vitality"],
    study: [studyBar, "Study", "Studying increases the base knowledge gain"],
    mediate: [mediateBar, "Mediate", "Mediate increases all magic bar speeds but lowers mood tolerance by 1"],
    martial: [martialBar, "Martial Arts", "Martial Arts greatly increases mood tolerance"],
    hit: [hitBar, "HIT", "HIT increases all health bar speeds"],
    taichi: [taichiBar, "Tai Chi", "Tai chi decreases all health bar speeds but gives immense amounts of mood tolerance"],
    magic: [magicBar, "Magic", "Increases all magic bar speeds."],
    magicstudy: [magicstudyBar, "Magic Study", "Increases the study learning speed"],
    magiclearner: [magiclearnerBar, "Magic Learner", "Increases the base speed of all bars. (Yes it's OP)"],
    abyssal: [abyssalBar, "Abyssal", "Increases the pit loot by boosting what you throw in there"],
    creation: [creationBar, "Matter", ""],
    peace: [peaceBar, "Peace", "Increases the power of wisdom clicks +1."],
    insight: [insightBar, "Insight", "Increases peace bar speed"],
}   

// Vars
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
        creationBar.update();
        document.getElementById(`creationLevelDisplay`).innerText = `Matter Level: ${creationBar.level}`
    }

    recalcBuffs();
};


// Updates all speeds quickly
function updateAllSpeeds() {
    const currentProgress = mood/player.cap;
    const mooddiff = 0.5 - currentProgress;
    const baseSpeed = 10

    let boostSpeed = baseSpeed

    if (potionStock["Speed I"]>0) {
        boostSpeed = boostSpeed*1.25
    } 
    if (potionStock["Speed II"]>0) {
        boostSpeed = boostSpeed*1.5
    }
    if (potionStock["Speed III"]>0) {
        boostSpeed = boostSpeed*2
    }
    if (potionStock["Speed IV"]>0) {
        boostSpeed = boostSpeed*3
    }


    const mediateBuff = mediateBar.level*2
    // Total Mood diff between (5 and -5). BTW bMs is the total average and affects ALL Bars. Careful.
    const baseMoodspeed = (boostSpeed + mooddiff*10)+magiclearnerBar.level*3
    const magicsum = (magicBar.level-10)+mediateBuff
    const healthsum = (taichiBar.level*3)-(hitBar.level*2);

    if (healthsum+baseMoodspeed<1) {
        healthsum = -5;
    }
    if (magicsum+baseMoodspeed<1) {
        magicsum = -5;
    }

    // Speed applications
    vitBar.speed = baseMoodspeed + (flexBar.level*2) + healthsum
    flexBar.speed = baseMoodspeed + healthsum
    mediateBar.speed = baseMoodspeed + healthsum
    martialBar.speed = baseMoodspeed + healthsum
    hitBar.speed = baseMoodspeed + healthsum

    studyBar.speed = baseMoodspeed + magicstudyBar.level*2;
    peaceBar.speed = baseMoodspeed + insightBar.level*2;
    insightBar.speed = baseMoodspeed

    magicBar.speed = baseMoodspeed + mediateBuff // Magic does not boost itself but gets boosted by other bars!
    magicstudyBar.speed = baseMoodspeed + magicsum
    magiclearnerBar.speed = baseMoodspeed + magicsum
    abyssalBar.speed = baseMoodspeed + magicsum

    if (barInfo[activeBar].speed<0) { // Prevents negative speeds
        barInfo[activeBar].speed = 1;
    }
}

// Setting interval higher = worse transitioning rate. Currently 
setInterval(updateProgress, 20);

// Creates Barz
function renderBars() {
    const createBars = document.getElementById("barHolder");
    createBars.innerHTML = ""

    Object.keys(barInfo).forEach(bar => {
        const containerDiv = document.createElement("div")
        const progressContainer = document.createElement("div")
        const progressBar = document.createElement("div")
        const progressText = document.createElement("span")
        const infoContainer = document.createElement("div")
        const infoText = document.createElement("p")

        containerDiv.classList.add("hidden")
        containerDiv.classList.add("skill-row")
        containerDiv.id = `${bar}Container`

        progressContainer.classList.add("progress-container")
        progressContainer.id = `${bar}btn`

        progressBar.classList.add("progress-bar")
        progressBar.id = bar

        progressText.classList.add("progress-text")
        progressText.id = `${bar}LevelDisplay`

        infoContainer.classList.add("skill-info")
        infoContainer.id = `${bar}Info`

        infoText.innerText = barInfo[bar][2];

        createBars.appendChild(containerDiv)
        containerDiv.appendChild(progressContainer)
        containerDiv.appendChild(infoContainer)
        infoContainer.appendChild(infoText)
        progressContainer.appendChild(progressBar)
        progressContainer.appendChild(progressText)

        progressContainer.addEventListener("click", () => { activeBar = progressContainer.id.replace("btn", "")})
    });
    
    console.log("Bar rendering completed")

}

// Recalculates buffs
function recalcBuffs() {
    if (matterBarActive === true) {
        player.matterCapNerf = 0.5
    } else {
        player.matterCapNerf = 1;
    }

    player.cap = Math.floor((100+(vitBar.level*5)+(martialBar.level*10)+(taichiBar.level*100)-(mediateBar.level)+player.capBonus)*player.matterCapNerf)
    
    player.lifespan = 50;

    player.wisdomClickPower = peaceBar.level+1;
    player.matterCapNerf = 0.5

    if (vitBar.level>=10) {document.getElementById("flexContainer").classList.remove("hidden");}

    player.baseKnowledgeIncrease = (studyBar.level) + 1;

    player.pitMulti = 1+(abyssalBar.level/50)
};
