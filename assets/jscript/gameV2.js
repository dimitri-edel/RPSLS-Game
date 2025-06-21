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

class Scissors {
    static image = "scissors.webp";
    static name = "scissors";
    static checkOutcomeAgainst(oponentsPick) {
        let wins_against = [Paper, Lizard];
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
            return "It's a draw! You both picked Scissors.";
        }
        rules.forEach((rule) => {
            if (rule.toLowerCase().includes(this.name) && rule.toLowerCase().includes(oponentsPick.name)) {
                return rule;
            }
        });
    }

    static getCheat() {
        let number = Math.floor(Math.random() * 3);
        let arr = [Paper, Lizard, Scissors];
        return arr[number];
    }
}

class Lizard {
    static image = "lizard.webp";
    static name = "lizard";
    static checkOutcomeAgainst(oponentsPick) {
        let wins_against = [Spock, Paper];
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
            return "It's a draw! You both picked Lizard.";
        }
        rules.forEach((rule) => {
            if (rule.toLowerCase().includes(this.name) && rule.toLowerCase().includes(oponentsPick.name)) {
                return rule;
            }
        });
    }

    static getCheat() {
        let number = Math.floor(Math.random() * 3);
        let arr = [Spock, Scissors, Lizard];
        return arr[number];
    }
}

class Spock {
    static image = "spock.webp";
    static name = "spock";
    static checkOutcomeAgainst(oponentsPick) {
        let wins_against = [Scissors, Rock];
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
            return "It's a draw! You both picked Spock.";
        }
        rules.forEach((rule) => {
            if (rule.toLowerCase().includes(this.name) && rule.toLowerCase().includes(oponentsPick.name)) {
                return rule;
            }
        });
    }

    static getCheat() {
        let number = Math.floor(Math.random() * 3);
        let arr = [Scissors, Rock, Spock];
        return arr[number];
    }
}

// Player contains information on the player, such as the score and the current pick
class Player {
    static score = 0;
    static pick = none;

    // Increases the current score by 1
    static increaseScore() {
        this.score++;
    }
}

class ComputerPlayer extends Player {
    // Computer picks a random move
    // Pick a ramdom move for the player. Used for the computer player.
    static pickRandom() {
        // Assigns a random integer from 0 to 4:
        let number = Math.floor(Math.random() * 5);
        switch (number) {
            case 0:
                this.pick = Rock;
                break;
            case 1:
                this.pick = Paper;
                break;
            case 2:
                this.pick = Scissors;
                break;
            case 3:
                this.pick = Lizard;
                break;
            case 4:
                this.pick = Spock;
                break;
            default:
                this.pick = Rock;
        }
    }
}


function testAPick() {
    let pick = Rock;
    let oponentsPick = Scissors;
    pick.checkOutcomeAgainst(oponentsPick);
    let outcomeMessage = pick.checkOutcomeMessageAgainst(oponentsPick);
    console.log(outcomeMessage);
    console.log("Testing pick: " + pick.name);
}

testAPick();
console.log("Test completed.");