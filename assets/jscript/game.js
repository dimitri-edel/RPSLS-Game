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

outcome_images = [
    "lizard_eats_paper.jpg",
    "paper_covers_rock.jpg",
    "rock_crushes_scissors.jpg",
    "scissors_cut_paper.jpg",
    "spock_smashes_scissors.jpg",
    "scissors_dicapitates_lizard.jpg",
    "lizard_poisons_spock.jpg",
    "spock_vaporizes_rock.jpg",
    "rock_crushes_lizard.jpg",
    "paper_disproves_spock.jpg"
]

class GameResult {
    static getOutcomeImageFor(player, computer) {
        // If openent picked the same pick
        if (computer === player) {
            return undefined;
        }
        for (let image of outcome_images) {
            // Remove underscores and replace with spaces
            const imageName = image.replace(/_/g, " ");
            // If the image name contains both picks, return the image name
            if (imageName.includes(player.name) && imageName.includes(computer.name)) {
                return image;
            }
        }
        return undefined;
    }

    /* Returns the corresponding message, which explains the outcome, like "lirrad eats paper!" */
    static checkOutcomeMessageAgainst(player, computer) {
        // If openent picked the same pick
        if (computer === player) {
            return "It's a draw! You both picked Rock.";
        }
        for (let rule of rules) {
            const ruleLower = rule.toLowerCase();
            if (ruleLower.includes(player.name) && ruleLower.includes(computer.name)) {
                return rule;
            }
        }
        return undefined;
    }
}

// The following messages will be displayed at the top of the page. These are motivational phrases.
const starting_message = "Welcome! May the force be with you!";
const winning_message = "You are winning! Keep going!";
const losing_message = "Do not give up! Luck never gives; it only lends.";
const tie_message = "The game is tied. You can still win!";
const win_message = "Congratulations! You did awsome! The force was on your side!";
const loss_message = "Sorry! You have lost. Better luck next time!";
const draw_message = "Not bad! Not bad, at all!";


class Rock {
    static imageFileName = "rock.webp";
    static name = "rock";
    // Checks the outcome of playing it against Paper, Scissorrs, etc.
    // If Rock wins the return value is "win" else "loss" or "draw"
    static checkOutcomeAgainst(oponentsPick) {
        let wins_against = [Scissors, Lizard];
        if (wins_against.includes(oponentsPick)) {
            return "win";
        } else if (oponentsPick === this) {
            return "draw";
        } else {
            return "loss";
        }
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
    static imageFileName = "paper.webp";
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

    static getCheat() {
        let number = Math.floor(Math.random() * 3);
        let arr = [Rock, Scissors, Paper];
        return arr[number];
    }
}

class Scissors {
    static imageFileName = "scissors.webp";
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

    static getCheat() {
        let number = Math.floor(Math.random() * 3);
        let arr = [Paper, Lizard, Scissors];
        return arr[number];
    }
}

class Lizard {
    static imageFileName = "lizard.webp";
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

    static getCheat() {
        let number = Math.floor(Math.random() * 3);
        let arr = [Spock, Scissors, Lizard];
        return arr[number];
    }
}

class Spock {
    static imageFileName = "spock.webp";
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

    static getCheat() {
        let number = Math.floor(Math.random() * 3);
        let arr = [Scissors, Rock, Spock];
        return arr[number];
    }
}

// Player contains information on the player, such as the score and the current pick
class Player {
    static score = 0;
    static pick = null;

    // Increases the current score by 1
    static increaseScore() {
        this.score++;
    }
}

class ComputerPlayer {
    static score = 0;
    static pick = null;

    // Increases the current score by 1
    static increaseScore() {
        this.score++;
    }
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
/* Game contains the game logic. */
class Game {
    static numberOfRoundsSetting = 3; // Default setting
    // The number of rounds left to play
    static roundsLeft = this.numberOfRoundsSetting;
    // The current round number
    static currentRound = 0;
    static computerPlayer = ComputerPlayer;
    static userPlayer = Player;

    // The method is called when the user chooses their next move
    // The parameter pick is of Type Pick(Rock, Paper, Scissors, Lizard, Spock) and contains information on the option the user picked
    static userMakesMove(pick) {
        let result = "";
        let result_message = "";
        this.userPlayer.pick = pick;

        // Now, either let the computer pick randomly or let it cheat if the round setting is higher than 3
        if (this.numberOfRoundsSetting > 3) {
            // The higher the number of rounds setting, the more often the computer will cheat
            let number = 4;
            if (this.numberOfRoundsSetting == 7) {
                number = 3;
            } else if (this.numberOfRoundsSetting == 11) {
                number = 2;
            }
            // Every now and then the computer will cheat
            if (this.roundsLeft % number == 0) {
                this.computerPlayer.pick = this.userPlayer.pick.getCheat();
            }
        } else {
            this.computerPlayer.pickRandom();
        }

        // Check the outcome of the move made by the player
        result = this.userPlayer.pick.checkOutcomeAgainst(this.computerPlayer.pick);
        // The corresponding message that explains the outcome
        result_message = GameResult.checkOutcomeMessageAgainst(this.userPlayer.pick, this.computerPlayer.pick);
        // Get the image that explains the outcome. The return value is the name of the image file
        // that will be displayed in the outcome panel. Or undefined if the outcome is a draw.
        // No image will be displayed in the outcome panel.
        let outcomeImage = GameResult.getOutcomeImageFor(this.userPlayer.pick, this.computerPlayer.pick);
        // Asign score
        if (result === "win") {
            this.userPlayer.increaseScore();
        } else if (result === "loss") {
            this.computerPlayer.increaseScore();
        } else if (result === "draw") {
            this.userPlayer.increaseScore();
            this.computerPlayer.increaseScore();
        }
        // Transfer the score to the scoreboard
        view.updateScore(this.userPlayer, this.computerPlayer);
        // Count down the rounds
        this.roundsLeft--;
        this.currentRound++;
        // Show the result of the last move to the player
        view.displayOutComeResults(result, result_message, outcomeImage, this.userPlayer, this.computerPlayer);
    }

    // Set number of rounds before game over
    static setNumberOfRounds(number) {
        // If not a number set to default
        if (isNaN(number)) {
            number = 5;
        }
        this.numberOfRoundsSetting = number;
        this.roundsLeft = number;
    }

    // Resets the game 
    static startOver() {
        this.roundsLeft = this.numberOfRoundsSetting;
        this.computerPlayer.score = 0;
        this.userPlayer.score = 0;
        this.currentRound = 0;

        // view.displayStartWindow(this.userPlayer, this.computerPlayer);
        view.updateScore(this.userPlayer, this.computerPlayer);
    }
}

/*
    View contains all methods that display changes in the process of the game.
    It also harbors the methods that will be called when the user clicks on an html element that has the onclick event listener.

    PURPOSE:
    Separate the game logic from the presentation logic.
*/
class View {
    // IDs of images whose setting need to be restored after every round
    static restoreComputerImageId = null;
    static restoreUserImageId = null;
    // Copy of the HTML code of the settings-panel, so it can be reset later on
    static initialSettingsHTML = "<label for='number-of-attempts-setting'>Number of possible attempts:</label><input id='number-of-attempts-setting' type='text'>";

    // List of optionPickerIds
    static optionPickerIds = ["user-rock-button", "user-paper-button",
        "user-scissors-button", "user-lizard-button",
        "user-spock-button", "computer-rock-button",
        "computer-paper-button", "computer-scissors-button",
        "computer-lizard-button", "computer-spock-button"
    ];


    // Applies changes to the html document to show the outcome of the current round
    static displayOutComeResults(outcome, outcome_message, outcome_image, user, computer) {

        let messageText = "";
        this.restoreComputerImageId = "";
        this.restoreUserImageId = "";
        switch (outcome) {
            case "win":
                messageText = "YOU WIN!";
                break;
            case "loss":
                messageText = "YOU LOSE!";
                break;
            case "draw":
                messageText = "DRAW!";
                break;
            default:
                break;
        }

        document.getElementById("outcome-text").innerHTML = messageText;
        document.getElementById("message-text").innerHTML = outcome_message;
        document.getElementById("settings-panel").style = "display:none;";
        document.getElementById("rounds-counter-panel").style = "display:block;";
        document.getElementById("rounds-counter").innerHTML = game.currentRound;

        if (outcome_image === undefined) {
            document.getElementById("user-pick-image").src = "./assets/images/webp/" + game.userPlayer.pick.imageFileName;
            document.getElementById("user-pick-image").style = "display:block;";
            document.getElementById("computer-pick-image").src = "./assets/images/webp/" + game.computerPlayer.pick.imageFileName;
            document.getElementById("computer-pick-image").style = "display:block;";
            document.getElementById("outcome-image").style = "display:none;";
            document.getElementById("versus-text").style = "display:flex;";
        } else {
            document.getElementById("outcome-image").src = "./assets/images/" + outcome_image;
            document.getElementById("outcome-image").style = "display:block;";
            document.getElementById("user-pick-image").style = "display:block;";
            document.getElementById("user-pick-image").src = "./assets/images/webp/" + game.userPlayer.pick.imageFileName;
            document.getElementById("computer-pick-image").style = "display:block;";
            document.getElementById("computer-pick-image").src = "./assets/images/webp/" + game.computerPlayer.pick.imageFileName;
            document.getElementById("versus-text").style = "display:none;";
        }
        if (game.roundsLeft > 0) {
            if (game.userPlayer.score > game.computerPlayer.score) {
                document.getElementById("message-display").innerHTML = winning_message;
            } else if (game.userPlayer.score < game.computerPlayer.score) {
                document.getElementById("message-display").innerHTML = losing_message;
            } else {
                document.getElementById("message-display").innerHTML = tie_message;
            }
        }

        if (game.roundsLeft <= 0) {
            this.displayGameOver();
        }
    }

    // Applies changes to the html document once the game is over
    static displayGameOver() {
        document.getElementById("outcome-text").innerHTML = "GAME OVER!";
        let messageText = "";
        if (game.computerPlayer.score > game.userPlayer.score) {
            messageText = "You have lost this game!";
            document.getElementById("message-display").innerHTML = loss_message;
        } else if (game.computerPlayer.score < game.userPlayer.score) {
            messageText = "You have won this game!";
            document.getElementById("message-display").innerHTML = win_message;
        } else {
            messageText = "This game came up a draw!";
            document.getElementById("message-display").innerHTML = draw_message;
        }
        document.getElementById("message-text").innerHTML = messageText;
        this.clearOptionPickerEventListeners();
    }

    // Is triggered when the 'restart' icon is clicked
    static startOverOnClick() {
        game.startOver();
        this.hookUpOptionPickerEventListeners();
        document.getElementById("message-display").innerHTML = starting_message;
        document.getElementById("outcome-text").innerHTML = "GO!";
        document.getElementById("message-text").innerHTML = "Starting a new Game!";
        document.getElementById("user-pick-image").src = "./assets/images/webp/question.webp";
        document.getElementById("user-pick-image").style = "display:block;";
        document.getElementById("computer-pick-image").src = "./assets/images/webp/question.webp";
        document.getElementById("computer-pick-image").style = "display:block;";
        document.getElementById("outcome-image").style = "display:none;";
        document.getElementById("settings-panel").style = "display:block;";
        document.getElementById("rounds-counter-panel").style = "display:none;";
        document.getElementById("versus-text").style = "display:flex;";
    }

    // Is triggered when the 'home' icon is clicked
    static homeButtonOnClick() {
        window.open("index.html", "_self");
    }
    // Removes onclick event listeners from the user option picker panel. Used when the game is over, to prevent the
    // user from continueing the game. After that it becomes necessary to click the restart icon to start a new game.    
    static clearOptionPickerEventListeners() {
        const userOptionPickerIds = ["user-rock-button", "user-paper-button",
            "user-scissors-button", "user-lizard-button",
            "user-spock-button"
        ];
        document.getElementById(userOptionPickerIds[0]).removeEventListener("click", this.userRockOptionPickerOnClick);

        document.getElementById(userOptionPickerIds[1]).removeEventListener("click", this.userPaperOptionPickerOnClick);

        document.getElementById(userOptionPickerIds[2]).removeEventListener("click", this.userScissorsOptionPickerOnClick);

        document.getElementById(userOptionPickerIds[3]).removeEventListener("click", this.userLizzardOptionPickerOnClick);

        document.getElementById(userOptionPickerIds[4]).removeEventListener("click", this.userSpockOptionPickerOnClick);
    }

    // Sets event listeners on each all buttons that the user can click to play the game
    static hookUpOptionPickerEventListeners() {
        const userOptionPickerIds = ["user-rock-button", "user-paper-button",
            "user-scissors-button", "user-lizard-button",
            "user-spock-button"
        ];

        document.getElementById(userOptionPickerIds[0]).addEventListener("click", this.userRockOptionPickerOnClick);

        document.getElementById(userOptionPickerIds[1]).addEventListener("click", this.userPaperOptionPickerOnClick);

        document.getElementById(userOptionPickerIds[2]).addEventListener("click", this.userScissorsOptionPickerOnClick);

        document.getElementById(userOptionPickerIds[3]).addEventListener("click", this.userLizzardOptionPickerOnClick);

        document.getElementById(userOptionPickerIds[4]).addEventListener("click", this.userSpockOptionPickerOnClick);
    }

    /* EventListners for the panel with buttons from which the user can pick his move */
    static userRockOptionPickerOnClick() {
        game.userMakesMove(Rock);
    }

    static userPaperOptionPickerOnClick() {
        game.userMakesMove(Paper);
    }

    static userScissorsOptionPickerOnClick() {
        game.userMakesMove(Scissors);
    }

    static userLizzardOptionPickerOnClick() {
        game.userMakesMove(Lizard);
    }

    static userSpockOptionPickerOnClick() {
        game.userMakesMove(Spock);
    }

    // Updates the score of each player and colors them accordingly
    static updateScore(user, computer) {
        let user_tag = document.getElementById("user-score");
        let computer_tag = document.getElementById("computer-score");

        // set colors to the numbers red for loss, green for win
        if (user.score > computer.score) {
            user_tag.style = "color: green;";
            computer_tag.style = "color: red;";
        } else if (user.score < computer.score) {
            user_tag.style = "color: red;";
            computer_tag.style = "color: green;";
        } else {
            user_tag.style = "color: green;";
            computer_tag.style = "color: green;";
        }
        // update the score numbers
        computer_tag.innerHTML = game.computerPlayer.score;
        user_tag.innerHTML = game.userPlayer.score;
    }

    // Retrieves the number of rounds setting
    static getNumberOfRoundsSetting() {
        let val = document.getElementById("number-of-attempts-setting").value;
        // If not a number set to default
        if (isNaN(val)) {
            val = 5;
        }

        return val;
    }
}

// Initialize global objects
// The game object is initialized with 3 rounds as initial setting
let game = Game;
// The view object will be used to relay view events
let view = View;
view.hookUpOptionPickerEventListeners();
// Set the initial message to the #message-display
document.getElementById("message-display").innerHTML = starting_message;
// It is necessary to intialize the computer player with a random pick
game.computerPlayer.pickRandom();