
const pitrolls = [
    {
        rollmin:0,
        rollmax:10,
        flavortext: "The pit shakes slightly, but is not impressed you stingy bum!",
        knowledgemax:0,
        wisdommax:0,
        moodcapadd:0,
    },

    {
        rollmin:10,
        rollmax:20,
        flavortext: "The pit still is not satisfied. Try throwing more.",
        knowledgemax:0,
        wisdommax:0,
        moodcapadd:0,
    },

    {
        rollmin:20,
        rollmax:30,
        flavortext: "A sour smell fills the air, but alas nothing comes from thee pit.",
        knowledgemax:0,
        wisdommax:0,
        moodcapadd:0,
    },

    {
        rollmin:30,
        rollmax:40,
        flavortext: "A little chime plays from the pit, and a neat package hits you in the head.",
        knowledgemax:20,
        wisdommax:2,
        moodcapadd:0,
    },

    {
        rollmin:40,
        rollmax:50,
        flavortext: "A small box floats out of the pit somehow, lightly hovering into your hands.",
        knowledgemax:50,
        wisdommax:5,
        moodcapadd:0,
    },

    {
        rollmin:50,
        rollmax:60,
        flavortext: "A bunch of thoughts fill your head, and suddenly you know. The pit laughs.",
        knowledgemax:75,
        wisdommax:10,
        moodcapadd:0,
    },

    {
        rollmin:60,
        rollmax:70,
        flavortext: "A bigger box is chucked at you from deep inside the pit.",
        knowledgemax:100,
        wisdommax:10,
        moodcapadd:0,
    },

    {
        rollmin:70,
        rollmax:80,
        flavortext: "The pit has a mild conversation with you, and gives you a hug.",
        knowledgemax:125,
        wisdommax:15,
        moodcapadd:0,
    },

    {
        rollmin:80,
        rollmax:90,
        flavortext: "The pit thanks you for playing this game",
        knowledgemax:150,
        wisdommax:15,
        moodcapadd:0,
    },

    {
        rollmin:90,
        rollmax:95,
        flavortext: "A beautiful song plays, leaving a tear on your cheek.",
        knowledgemax:175,
        wisdommax:20,
        moodcapadd:0,
    },

    {
        rollmin:95,
        rollmax:96,
        flavortext: "A massive amount of knowledge floods your brain",
        knowledgemax:1000,
        wisdommax:0,
        moodcapadd:0,
    },

    {
        rollmin:96,
        rollmax:97,
        flavortext: "Wisdom fills you, and calm resides.",
        knowledgemax:0,
        wisdommax:250,
        moodcapadd:0,
    },

    {
        rollmin:97,
        rollmax:98,
        flavortext: "The pit takes away the strain of life.",
        knowledgemax:0,
        wisdommax:0,
        moodcapadd:25,
    },

    {
        rollmin:98,
        rollmax:99,
        flavortext: "You get nothing. Wait what, this is supposed to be a rare roll!?? DEVELOPER YOU-",
        knowledgemax:0,
        wisdommax:0,
        moodcapadd:0,
    },
    
    {
        rollmin:99,
        rollmax:100,
        flavortext: "You feel lucky. A shower of items fall onto you",
        knowledgemax:500,
        wisdommax:100,
        moodcapadd:25,
    },

    {
        rollmin:100,
        rollmax:110,
        flavortext: "A deep laugh echoes from the pit, followed by a dull emptiness from deep inside you. Nothing.",
        knowledgemax:0,
        wisdommax:0,
        moodcapadd:0,
    },

    {
        rollmin:110,
        rollmax:1000,
        flavortext: "A whole lotta luck you're feeling",
        knowledgemax:1000,
        wisdommax:200,
        moodcapadd:0,
    },
]


// THE PIT
document.getElementById("the-pit").addEventListener("click", () => {
    if (player.knowledge > 0 || player.wisdom > 0) {
        console.log("throwing")

        const addbuff = player.knowledge + player.wisdom*6

        player.knowledge = 0;
        player.wisdom = 0;

        const roll = Math.random()*100 + (addbuff/100); //addbuff directly adds to the roll improving roll ceiling, be careful

        const fitroll = pitrolls.find(tier => tier.rollmin<=roll && tier.rollmax>roll );

        if (!fitroll) {
            console.log("Roll number fitting in bracket not found!");
            say("The pit warps reality just to say no. LOL");
            return;
        }

        say(fitroll.flavortext);
        player.knowledge = roundto1(Math.max(Math.random()*fitroll.knowledgemax,0))
        player.cap += roundto1(Math.max(fitroll.moodcapadd,0))
        if (fitroll.moodcapadd>0) {
            say("Mood is calmed")
        }

        if (player.knowledge > 0) {
            say(`It has gifted you ${player.knowledge} knowledge. Be grateful.`);
        }

        if (!document.getElementById("unlockwisdombtn").classList.contains("hidden")) {
            player.wisdom = roundto1(Math.max(Math.random()*fitroll.wisdommax, 0))
            if (player.wisdom > 0) {
                say(`It has gifted you ${player.wisdom} wisdom. Be grateful.`);
            }
        }

        player.totalpitrolls += 1;
    } else {
        say("You can't throw nothing into a pit idiot...")
    }
});

function roundto1(varib) {
    return parseFloat(varib.toFixed(0));
};
