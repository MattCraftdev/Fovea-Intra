// Class OOP for progress bars
class ProgressBar {
    constructor(elementId, speed = 1, maxprogress = 100, expoincrease) {
        this.elementId = elementId;
        this.progress = 0;
        this.maxprogress = maxprogress;
        this.level = 1;
        this.speed = speed;
        this.element = document.getElementById(elementId);
        this.expoincrease = expoincrease;
    };
    
    update() {

        if (this.progress < this.maxprogress) {
            this.progress += this.speed;
            let widthPercent = Math.min((this.progress / this.maxprogress) * 100, 100);
            this.element.style.width = widthPercent + "%";
            updateAllSpeeds();
        } else {
            this.level++;
            this.progress = 0;
            console.log(`${this.progress}/${this.maxprogress}. Speed is ${this.speed}`)
            updateAllSpeeds();
            
            // Expo increase value
            this.maxprogress = this.maxprogress*this.expoincrease;

            if (this.elementId == "vit") {
                player.lifespan += 0.1;
                
                if (this.level == 10) {
                    document.getElementById("flexContainer").classList.remove("hidden");
                }

            } else if (this.elementId == "knowledge") {
                player.baseKnowledgeIncrease = knowledgeBar.getLevel();

            } else if (this.elementId == "fitness") {
                player.lifespan += 1;
                player.knowledgeCap -= 1;

            } else if (this.elementId == "martial") {
                player.knowledgeCap += 5;
            }
            
        };
    };

    reset() {
        this.progress = 0;
        this.level = 1;

    };  

    getLevel() {
        return this.level;
    };
};

// Progress Bars
const vitBar = new ProgressBar("vit", 10, 1000, 1.15);
const flexBar = new ProgressBar("flex", 10, 1000, 1.1);
const fitnessBar = new ProgressBar("fitness", 10, 2500, 1.25)
const martialBar = new ProgressBar("martial", 10, 3500, 1.3)

const knowledgeBar = new ProgressBar("knowledge", 10, 10000, 1.2);

const magicBar = new ProgressBar("magic", 10, 25000, 1.25);
const magicstudyBar = new ProgressBar("magicstudy", 10, 10000, 1.15);

// Vars
let flexbuff = 0;
let martialbuff = 0;
let magicbuff = 0;
let magicstudybuff = 0;

let activeBar = null;
// Update Progress Bars
function updateProgress() {

    if (activeBar === "vit") {
        vitBar.update();
        document.getElementById("vitLevelDisplay").innerText = "Vitality Level: " + vitBar.getLevel();
    } else if (activeBar === "flex") {
        flexBar.update();
        document.getElementById("flexLevelDisplay").innerText = "Flexibility Level: " + flexBar.getLevel();
    } else if (activeBar === "knowledge") {
        knowledgeBar.update();
        document.getElementById("knowledgeLevelDisplay").innerText = "Knowledge Level: " + knowledgeBar.getLevel();
    } else if (activeBar === "fitness") {
        fitnessBar.update();
        document.getElementById("fitnessLevelDisplay").innerText = "Fitness Level: " + fitnessBar.getLevel();
    } else if (activeBar === "magic") {
        magicBar.update();
        document.getElementById("magicLevelDisplay").innerText = "Magic Accumination Level: " + magicBar.getLevel();
    } else if (activeBar === "martial") {
        martialBar.update();
        document.getElementById("martialLevelDisplay").innerText = "Martial Arts Level: " + martialBar.getLevel();
    } else if (activeBar === "magicstudy") {
        magicstudyBar.update();
        document.getElementById("magicstudyLevelDisplay").innerText = "Magic Study Level: " + magicstudyBar.getLevel();
    }



    flexbuff = player.flexLevel*2;
    martialbuff = player.martialLevel*2
    magicbuff = player.magicLevel
    magicstudybuff = player.magicstudyLevel*2

};


// Updates all speeds quickly
function updateAllSpeeds() {
    const currentProgress = mood/player.knowledgeCap;
    const mooddiff = 0.5 - currentProgress;
    const baseSpeed = 10

    const baseMoodspeed = baseSpeed + mooddiff*10
    vitBar.speed = baseMoodspeed + flexbuff;
    flexBar.speed = baseMoodspeed + martialbuff;
    knowledgeBar.speed = baseMoodspeed + magicstudybuff;
    fitnessBar.speed = baseMoodspeed;
    magicBar.speed = baseMoodspeed;
    martialBar.speed = baseMoodspeed;
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