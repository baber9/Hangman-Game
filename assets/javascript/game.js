var hangman = function () {
    // Variables
    var lettersGuessed = [];
    var guessesRemaining = document.getElementById("guesses-remaining");
    var wins = document.getElementById("wins");
    var answer = document.getElementById("answer");
    
    var answerBank = [
    {mascot: "Texas Longhorns", identifier: "ut"},   
    {mascot: "Notre Dame Fighting Irish", identifier: "nd"},
    {mascot: "Houston Cougars", identifier: "hou"},
    {mascot: "SMU Mustangs", identifier: "smu"},
    {mascot: "Texas Tech Red Raiders", identifier: "ttc"},
    {mascot: "TCU Horned Frogs", identifier: "tcu"},
    {mascot: "Texas AM Aggies", identifier: "tam"},
    {mascot: "Florida Gators", identifier: "flo"},
    {mascot: "Miami Hurricanes", identifier: "mia"},
    {mascot: "Georgia Tech Yellowjackets", identifier: "gte"}];

    //Randomly select answer, make uppercase, make it an array
    var randomNum = Math.floor(Math.random() * 10);
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
    }

    // Initial Display of Blanks as Answer
    function displayBlanks(word) {
        var blanks = '';
        var blanksArray = [];
        word.forEach(element => {
            if (element === " ") {
                blanks += "\xa0\xa0";
                blanksArray.push("\xa0\xa0");
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
                        gameOver();
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
            if (word.indexOf(element) !== -1 && word.indexOf(element) !== " ")
                newWord += element + "\xa0";
            else if (element === " ")
                newWord += "\xa0";
            else   
                newWord += "_ ";
        });
        answer.textContent = newWord;
        checkForWin();
    }

    function checkForWin() {
        if (answer.textContent.indexOf("__") === -1) {
            console.log("YOU WIN!");
            wins.textContent++;
            console.log(currentAnswer);
            console.log(answerBank[randomNum].identifier);
            var teamImage = document.createElement('img');
            teamImage.src = "assets/images/" + answerBank[randomNum].identifier + ".jpg";
            document.getElementById("win-banner").appendChild(teamImage);
            resetGame();
        }
    }
    
    // GAME OVER FUNCTION
    function gameOver() {
        if (guessesRemaining.textContent === "0") {
            console.log("Game Over");
            resetGame();
        }
    }

    // Reset Game Function (after win/loss)
    function resetGame(status) {
        lettersGuessed = [];
        document.getElementById("letters-guessed").textContent = "";
        guessesRemaining.textContent = 9;
        // pickRandomAnswer();
    }
}();

