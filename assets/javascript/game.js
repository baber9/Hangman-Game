var hangman = function () {
    // Variables
        // To hold letters guessed
    var lettersGuessed = [];
        // Set to html id to track guesses remaining
    var guessesRemaining = document.getElementById("guesses-remaining");
        // Set to html id to track wins
    var wins = document.getElementById("wins");
        // Set to html id to manipulate for blanks/letters
    var answer = document.getElementById("answer");
        // Set to html id to manipulate player instructions
    var instruction = document.getElementById("instruction");
        // initialize userAnswerArray - will use this to build user's answer as they play
    var userAnswerArray = [];
        // Answer bank with identifier to build team element later
    var answerBank = [
        {mascot: "Arizona Cardinals", identifier: "ARI"},   
        {mascot: "Atlanta Falcons", identifier: "ATL"},
        {mascot: "Baltimore Ravens", identifier: "BAL"},
        {mascot: "Buffalo Bills", identifier: "BUF"},
        {mascot: "Carolina Panthers", identifier: "CAR"},
        {mascot: "Chicago Bears", identifier: "CHI"},
        {mascot: "Cincinnati Bengals", identifier: "CIN"},
        {mascot: "Cleveland Browns", identifier: "CLE"},
        {mascot: "Dallas Cowboys", identifier: "DAL"},
        {mascot: "Denver Broncos", identifier: "DEN"},
        {mascot: "Detroit Lions", identifier: "DET"},
        {mascot: "Green Bay Packers", identifier: "GB"},
        {mascot: "Houston Texans", identifier: "HOU"},
        {mascot: "Indianapolis Colts", identifier: "IND"},
        {mascot: "Jacksonville Jaguars", identifier: "JAX"},
        {mascot: "Kansas City Chiefs", identifier: "KC"},
        {mascot: "Los Angeles Chargers", identifier: "LAC"},
        {mascot: "Los Angeles Rams", identifier: "LA"},
        {mascot: "Miami Dolphins", identifier: "MIA"},
        {mascot: "Minnesota Vikings", identifier: "MIN"},
        {mascot: "New England Patriots", identifier: "NE"},
        {mascot: "New Orleans Saints", identifier: "NO"},
        {mascot: "New York Giants", identifier: "NYG"},
        {mascot: "New York Jets", identifier: "NYJ"},
        {mascot: "Oakland Raiders", identifier: "OAK"},
        {mascot: "Philadelphia Eagles", identifier: "PHI"},
        {mascot: "Pittsburgh Steelers", identifier: "PIT"},
        {mascot: "San Francisco FortyNiners", identifier: "SF"},
        {mascot: "Seattle Seahawks", identifier: "SEA"},
        {mascot: "Tampa Bay Buccaneers", identifier: "TB"},
        {mascot: "Tennessee Titans", identifier: "TEN"},
        {mascot: "Washington Redskins", identifier: "WAS"}
    ];

        // Randomly select answer, make uppercase, make it an array
    var randomNum = Math.floor(Math.random() * 32);
    var currentAnswer = answerBank[randomNum].mascot.toUpperCase().split("");
        
    getBlanks(currentAnswer, userAnswerArray);
    console.log(currentAnswer);

    // FUNCTION: To build blanks for puzzle (pushes blanks in place of answer letters)
    function getBlanks (currAnsArr, userAnsArr) {
        currAnsArr.forEach(element => {
            if (element === " ")
                userAnsArr.push(" ");
            else    
                userAnsArr.push("__");
        });
        displayWord(userAnsArr);

    }

    // INIT:  onKeyUp Function
    document.onkeyup = function(event) {

        // change input to uppercase
        var inputLetter = event.key.toUpperCase();   
        // find keycode
        var inputWhich = event.which;
        
        // send keycode & letter to input Handler               
        inputHandler(inputWhich, inputLetter);
    }

    // FUNCTION: INPUT HANDLER
    function inputHandler(keyWhich, letter) {
    
            // Make sure it's a letter
        if (keyWhich >= 65 && keyWhich <= 90) { 
        
                // If letter is not in puzzle
            if (currentAnswer.indexOf(letter) === -1 && letter != " ") {
                    // Check if letter has alread been guessed
                if (lettersGuessed.indexOf(letter) === -1) {
                        // Add to lettersGuessed array
                    lettersGuessed.push(letter);
                        // Display letters guessed
                    displayLettersGuessed();
                        // Decrement guesses remaining
                    guessesRemaining.textContent--;
                        // Check if any guesses remaining, if not game over-lose
                    if (guessesRemaining.textContent === "0")
                        gameOver("lose");
                }
            }
                // Letter is in puzzle
            else if (currentAnswer.indexOf(letter) !== -1 && letter != " ") {
                    // Call inputLetter
                inputLetter(letter, userAnswerArray);
            }
        }
    }


    // FUNCTION to input correctly answered letters into userAnswerArray
    function inputLetter(letter, arr) {
        for (var i = 0; i < currentAnswer.length; i++) {
            if (currentAnswer[i] === letter)
                arr[i] = letter;
        }
        displayWord(arr);
    }

    // FUNCTION to Display Letters Guessed (not in answer)
    function displayLettersGuessed() {
        var divLettersGuessed = "";
        lettersGuessed.forEach(element => {
            divLettersGuessed += element + " ";
        });
        document.getElementById("letters-guessed").textContent = divLettersGuessed;
    }

    // FUNCTION to display letters from array (for blanks or to input letter)
    function displayWord(arr) {
            // Dec variable to build string for display
        var newWord = '';
            // ForEach el in array, display " ", "__", or letter (if any in array)
        arr.forEach(element => {
            if (element === " ") {
                newWord += "\r\n";
            }
            else if (element === "__")  {
                newWord += "__ ";
            }
                // This will not run if we're displaying blanks (only when letters are guessed)
            else if (arr.indexOf(element) !== -1 && arr.indexOf(element) !== " "){
                newWord += element + "\xa0";
            }
                // For error check
            else
                console.log("Something went wrong");
        });
            // make puzzle answer equal newWord
        answer.textContent = newWord;
        checkForWin();
    }

    // FUNCTION to simply check if there are any blanks left (win)
    function checkForWin() {
        if (answer.textContent.indexOf("__") === -1) {
            gameOver("win");
        }
    }
    
    // FUNCTION - handles all outcomes of the game
    function gameOver(outcome) {
            // Set variable to build img element for win/loss
        var teamImage = document.createElement('img'); 
            // if 'win' add img src for team image using identifier from answerBank
        if (outcome === "win") {
                // Build "identifier.svg"
            teamImage.src = "assets/images/teams/" + answerBank[randomNum].identifier + ".svg";
                // Increment Win
            wins.textContent++;
                // JQuerty to display trophies
            $("#trophy-right").css("visibility", "visible");
            $("#trophy-left").css("visibility", "visible");
            
        } else {
                // Build "lose.svg"
            teamImage.src = "assets/images/" + outcome + ".svg";
        }
            // Display outcome banner
        document.getElementById("outcome-banner").appendChild(teamImage);
            
        
        setTimeout(() => {
            instruction.textContent = "Press SPACE to play again..."
            }, 2000);
        
            //RE INIT:  User must press SPACE to start
        document.onkeyup = function(evt) {
            if (evt.keyCode == 32) {
                resetGame();
    }
}
        
    }

    // Reset Game Function (after win/loss)
    function resetGame() {
        lettersGuessed = [];
        instruction.textContent = "Choose a Letter...";
        document.getElementById("letters-guessed").textContent = "";
        guessesRemaining.textContent = 9;
        document.getElementById("outcome-banner").textContent= "";
        $("#trophy-right").css("visibility", "hidden");
        $("#trophy-left").css("visibility", "hidden");
        hangman();
    }
}

//INIT:  User must press SPACE to start
document.onkeyup = function(evt) {
    if (evt.keyCode == 32) {
        instruction.textContent = "Choose a Letter...";
        hangman();
    }
}

// JQuery - when document loads
$(document).ready ( function() {
        // Display nfl logo after 1 sec
    setTimeout(() => {
        $("#nfl-logo").animate({ opacity: "1" });
    }, 1000);
        // JQuery animation to NLF Logo (grow -> shrink)
    setTimeout(() => {
        $("#nfl-logo").animate({ top: 0, width: "150px", height: "197" }, "normal")}, 1000);
    setTimeout(() => {
        $("#nfl-logo").animate({ top: 50, width: "100px", height: "131.6px"  }, "normal")}, 1600);

});