const rules = [
    "Scissors cuts paper",
    "Paper covers rock",
    "Rock crushes lizard",
    "Lizard poisons Spock",
    "Spock smashes scissors",
    "Scissors decapitates lizard",
    "Lizard eats paper",
    "Paper disproves Spock",
    "Spock vaporizes rock",
    "Rock crushes scissors"
]

class Rock {
    static image = "rock.webp";
    static name = "rock";
    // Checks the outcome of playing it against Paper, Scissorrs, etc.
    // If Rock wins the return value is "win" else "loss" or "draw"
    static checkOutcomeAgainst(oponentsPick) {
        console.log("Checking outcome of " + this.name + " against " + oponentsPick.name);
    }
    /* Returns the corresponding message, which explains the outcome, like "lirrad eats paper!" */
    static checkOutcomeMessageAgainst(oponentsPick) {
        // If openent picked the same pick
        if (oponentsPick === this) {
            return "It's a draw! You both picked Rock.";
        }
        for (let rule of rules) {
            const ruleLower = rule.toLowerCase();
            if (ruleLower.includes(this.name) && ruleLower.includes(oponentsPick.name)) {                
                return rule;
            }
            console.log("Checking rule: " + ruleLower);
        }
        return undefined;
    }
    // Returns one of the two picks that beat the Rock or an equal pick
    static getCheat() {
        // Assigns a random integer from 0 to 2:
        let number = Math.floor(Math.random() * 3);
        let arr = [Spock, Paper, Rock];

        // To conceal from the unwitting user, that the computer is cheating,
        // a random number ensures that it is not always the same choice that beats the oponent. 

        return arr[number];
    }
}

class Paper {
    static image = "paper.webp";
    static name = "paper";
    static checkOutcomeAgainst(oponentsPick) {
        let wins_against = [Rock, Spock];
        if (wins_against.includes(oponentsPick)) {
            return "win";
        } else if (oponentsPick === this) {
            return "draw";
        } else {
            return "loss";
        }
    }

    static checkOutcomeMessageAgainst(oponentsPick) {
        if (oponentsPick === this) {
            return "It's a draw! You both picked Paper.";
        }
        // Return the message that explains the outcome
        rules.forEach((rule) => {
            if (rule.toLowerCase().includes(this.name) && rule.toLowerCase().includes(oponentsPick.name)) {
                return rule;
            }
        });
    }

    static getCheat() {
        let number = Math.floor(Math.random() * 3);
        let arr = [Rock, Scissors, Paper];
        return arr[number];
    }
}

function testAPick() {
    let pick = Rock;
    let oponentsPick = Paper;
    pick.checkOutcomeAgainst(oponentsPick);
    let outcomeMessage = pick.checkOutcomeMessageAgainst(oponentsPick);
    console.log(outcomeMessage);
    console.log("Testing pick: " + pick.name);
}

testAPick();
console.log("Test completed.");