var hangman = function () {
    // Variables
    var lettersGuessed = [];
    var guessesRemaining = document.getElementById("guesses-remaining");
    var wins = document.getElementById("wins");
    var answer = document.getElementById("answer");
    
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

    //Randomly select answer, make uppercase, make it an array
    var randomNum = Math.floor(Math.random() * 32);
    var currentAnswer = answerBank[randomNum].mascot.toUpperCase().split("");
    console.log(currentAnswer);

    var blanks = displayBlanks(currentAnswer);


    // INIT:  onKeyUp Function
    document.onkeyup = function(event) {
        // change input to uppercase
        var inputLetter = event.key.toUpperCase();   
        // find keycode
        var inputWhich = event.which;
        
        // send keycode & letter to input Handler               
        inputHandler(inputWhich, inputLetter);
        console.log(randomNum);
  
    }

    // Initial Display of Blanks as Answer
    function displayBlanks(word) {
        console.log(word);
        var blanks = '';
        var blanksArray = [];
        word.forEach(element => {
            if (element === " ") {
                blanks +=   "\r\n";     //"\xa0\xa0";
                blanksArray.push(" ");
            }
            else {
                blanks += "__ ";
                blanksArray.push("__");
            }
        });
        answer.textContent = blanks;
        return blanksArray;
    }

    // INPUT HANDLER FUNCTION
    function inputHandler(keyWhich, letter) {
    
        // Make sure it's a letter
        if (keyWhich >= 65 && keyWhich <= 90) { 
        
            // If letter is not in puzzle
            if (currentAnswer.indexOf(letter) === -1 && letter != " ") {
                // Check if letter has alread been guessed
                if (lettersGuessed.indexOf(letter) === -1) {
                    // add to lettersGuessed array
                    lettersGuessed.push(letter);
                    // display letters guessed
                    displayLettersGuessed();
                    // decrement guesses remaining
                    guessesRemaining.textContent--;
                    if (guessesRemaining.textContent === "0")
                        gameOver("lose");
                }
            }
            // letter is in puzzle
            else if (currentAnswer.indexOf(letter) !== -1 && letter != " ") {
                // call displayLetter
                displayLetter(letter, blanks);
            }
            
        }
    }


    // Function to Display Letters - calls displayWord
    function displayLetter(letter, blanks) {
        for (var i = 0; i < currentAnswer.length; i++) {
            if (currentAnswer[i] === letter)
                blanks[i] = letter;
        }
        displayWord(blanks);
    }

    // Function to Display Letters Guessed (not in answer)
    function displayLettersGuessed() {
        var divLettersGuessed = "";
        lettersGuessed.forEach(element => {
            divLettersGuessed += element + " ";
        });
        document.getElementById("letters-guessed").textContent = divLettersGuessed;
    }

    // Function to display word/blanks after successful guesses
    function displayWord(word) {
        console.log(word);
        var newWord = '';
        word.forEach(element => {
            if (element === " ") {
                newWord += "\r\n";
            }
            else if (word.indexOf(element) !== -1 && word.indexOf(element) !== " "){
                newWord += element + "\xa0";
            }
            else   {
                newWord += "__ ";
            }
        });
        answer.textContent = newWord;
        checkForWin();
    }

    function checkForWin() {
        if (answer.textContent.indexOf("__") === -1) {
            gameOver("win");
            
        }
    }
    
    // GAME OVER FUNCTION
    function gameOver(outcome) {
        var teamImage = document.createElement('img'); 
        if (outcome === "win") {
            // Display "identifier.svg"
            teamImage.src = "assets/images/teams/" + answerBank[randomNum].identifier + ".svg";
            
        } else {
            // DISPLAY "lose.svg"
            teamImage.src = "assets/images/teams/" + outcome + ".svg";
        }
        console.log(outcome);
        document.getElementById("win-banner").appendChild(teamImage);
            wins.textContent++;
            // setTimeout(() => {
            //     resetGame()
            // }, 5000);
        
    }

    // Reset Game Function (after win/loss)
    function resetGame() {
        lettersGuessed = [];
        document.getElementById("letters-guessed").textContent = "";
        guessesRemaining.textContent = 9;
        document.getElementById("win-banner").textContent= "";
        hangman();
        // pickRandomAnswer();
    }
}

//INIT:  User must press SPACE to start
document.onkeyup = function(evt) {
    if (evt.keyCode == 32) {
        document.getElementById("instruction").textContent = "Choose a Letter...";
        // JQuery animation to NLF Logo (grow -> shrink)
        $("#nfl-logo").animate({ width: "150px", height: "197"}, "normal");
        setTimeout(() => {
            $("#nfl-logo").animate({ width: "100px", height: "131.6px"}, "normal")}, 500);
        hangman();
    }
}