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
        this.element = document.getElementById(this.elementId);
        let speed = this.speed
        if (this.elementId !== "creation") {
            if (activeBar === this.elementId) {
                speed = this.speed
            } else {
                speed = (this.speed*magicmultiBar.level)/100 // Basically if the magicmulti bar goes to level 100 the bar fills like normal        
            }

            if (speed<0) {
                speed = 1;
            }
        } 


        if (this.progress < this.maxprogress) {
            this.progress += speed;
            let widthPercent = Math.min((this.progress / this.maxprogress) * 100, 100);
            this.element.style.width = widthPercent + "%";

        } else {
            this.level++;
            this.progress = 0;
            console.log(`${this.progress}/${this.maxprogress}. Speed is ${speed}, base speed is ${this.speed}`)
            // Expo increase value
            this.maxprogress = this.maxprogress*this.expoincrease;
            
            if (this.elementId === "creation") {
                player.matter += 1;
            } else {
                track(this.elementId)
            }
        };

        if (this.elementId !== "creation") {
            updateAllSpeeds();            
        }

        document.querySelectorAll(".progress-container").forEach(bar => bar.classList.remove("selectedTab"));
        if (activeBar) {
            document.getElementById(`${activeBar}btn`).classList.add("selectedTab");            
        }

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
            this.element = document.getElementById(this.elementId);
            this.level = savedData.level;
            this.maxprogress = savedData.maxprogress;
            this.progress = savedData.progress;
            if (this.elementId) {
                if (this.elementId !== "creation") {
                    document.getElementById(`${this.elementId}LevelDisplay`).innerText = `${barInfo[this.elementId][1]} Level: ${this.level}`;
     
                } else {
                    document.getElementById(`creationLevelDisplay`).innerText = `Matter Level: ${creationBar.level}`
                    let widthPercent = Math.min((this.progress / this.maxprogress) * 100, 100);
                    this.element.style.width = widthPercent + "%";                                                
                }
            }
        }
    }
};

// Progress Bars: ID, speed(Doesn't matter), Max Progress, Exponentional
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
const magicmultiBar = new ProgressBar("magicmulti", 10, 50000, 1.4);
const abyssalBar = new ProgressBar("abyssal", 10, 10000, 1.25);

const moodBar = new ProgressBar("mood", 0, 0, 0); // Do not mark. Placeholder Bar!!!
const creationBar = new ProgressBar("creation", 10, 2500, 1.0003);

const barInfo = { // activebar id, then says their bar then name to DISPLAY. These also create the bars+containers
    // ID: Bar, Name, Description, Type
    study: [studyBar, "Study", "Studying increases the base knowledge gain", "na"],
    peace: [peaceBar, "Peace", "Increases the power of wisdom clicks +1.", "na"],
    insight: [insightBar, "Insight", "Increases peace bar speed", "na"],

    vit: [vitBar, "Vitality", "Vitality increases mood tolerance, meaning you can hold more resources", "health"],
    flex: [flexBar, "Flexability", "Flexability increases the speed of vitality", "health"],
    mediate: [mediateBar, "Mediate", "Mediate increases all magic bar speeds but lowers mood tolerance by 1", "health"],
    martial: [martialBar, "Martial Arts", "Martial Arts greatly increases mood tolerance", "health"],
    hit: [hitBar, "HIT", "HIT increases all health bar speeds", "health"],
    taichi: [taichiBar, "Tai Chi", "Tai chi decreases all health bar speeds but gives immense amounts of mood tolerance", "health"],
    
    magic: [magicBar, "Magic", "Increases all magic bar speeds.", "magic"],
    magicstudy: [magicstudyBar, "Magic Study", "Increases the study learning speed", "magic"],
    magiclearner: [magiclearnerBar, "Magic Learner", "Increases the base speed of all bars. (Yes it's OP)", "magic"],
    magicmulti: [magicmultiBar, "Magic Multitasker", "Passively increases all bars by flat 1% of their normal speed (Very OP)", "magic"],
    abyssal: [abyssalBar, "Abyssal", "Increases the pit loot by boosting what you throw in there", "magic"],
}   

// Vars
let activeBar = null;
let matterBarActive = false;

// Update Progress Bars
function updateProgress() {
    Object.keys(barInfo).forEach(bar => {
        const specificBar = barInfo[bar]
        specificBar[0].update()
        document.getElementById(`${bar}LevelDisplay`).innerText = `${specificBar[1]} Level: ${specificBar[0].level}`
    })

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
}

// Setting interval higher = worse transitioning rate. Currently 
setInterval(updateProgress, 20);

// Creates Barz
function renderBars() {
    const naHolder = document.getElementById("naHolder");
    naHolder.innerHTML = ""

    const healthHolder = document.getElementById("healthHolder");
    healthHolder.innerHTML = ""

    const magicHolder = document.getElementById("magicHolder");
    magicHolder.innerHTML = ""

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

        let holder = null;
        if (barInfo[bar][3] === "health") {
            holder = healthHolder
            progressBar.style.backgroundColor = `#274c29`;

        } else if (barInfo[bar][3] === "na") {
            holder = naHolder
            progressBar.style.backgroundColor = `#494949`;
        } else if (barInfo[bar][3] === "magic") {
            holder = magicHolder
            progressBar.style.backgroundColor = `#1c3a5c`;
        } else {
            console.log(barInfo[bar][3])
        }
    
        holder.appendChild(containerDiv)
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