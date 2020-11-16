class Question {
    //Building our questions contructor
    constructor(question, options, id, picture, audio) {
        this.question = question,
            this.options = options,
            this.id = id,
            this.picture = picture,
            this.audio = audio
    }
}

//Declaring some global variables
let usedNumbers = [];
let qArr = [];
let score = 0;
let mistakes = 0;
let currentNumber;

//Accessing DOM properties
const heading = document.querySelector('.heading');
const answersWrapper = document.querySelector('.answers-wrapper');
const musicIcon1 = document.querySelector('.wrong-1');
const musicIcon2 = document.querySelector('.wrong-2');
const musicIcon3 = document.querySelector('.wrong-3');
const newGameButton = document.querySelector('#new-game');
const displayScore = document.querySelector('.score');
const container = document.querySelector('.container');
const correctAnswerImage = document.querySelector('.correctAnswerImage');

//Declaring new questions
qArr[0] = new Question('Who has the "God\'s Son" tattoo across the belly?', ['Nas', 'Notorious B.I.G.', 'Q-Tip', 'Tupac'],'a', './img/nas.jpg', './sound/nas.mp3');
qArr[1] = new Question('Guess The Rapper by Lyrics: That\'s when Ron vanished, came back, speaking Spanish', ['RZA', 'Black Thought', 'Inspectah Deck', 'Notorious B.I.G.'],'d', './img/big.jpg', './sound/big.mp3');
qArr[2] = new Question('Who holds the mic and your attention like 2 swords?', ['Capppadonna', 'Method Man', 'Price Rakeem', 'MF DOOM'],'d', './img/doom.jpg', './sound/allCaps.mp3');
qArr[3] = new Question('Who of the following is not a Wu-Tang member?', ['Ghostface Killah', 'Redman', 'Raekwon', 'Masta Killa'],'b', './img/redman.jpg', './sound/redman.mp3');
qArr[4] = new Question('Which one of the following is an album title by A Tribe Called Quest?', ['The Score','Mass Appeal','The Low End Theory', 'Paid In Full'],'c', './img/atcq.jpg', './sound/atcq.mp3');
qArr[5] = new Question('What is the name of OutKast\'s second album?', ['Stakonia', 'ATLiens', 'Payday', 'The Infamous'],'b', './img/ok.jpg', './sound/ok.mp3');
qArr[6] = new Question('In which year Eric B and Rakim releases Paid In Full?', ['1988', '1984', '1989', '1987'], 'd', './img/pif.jpg', './sound/pif.mp3');
qArr[7] = new Question('Guess The Rapper By Lyrics: "Shake that body, party that body', ['50 Cent', 'Kanye West', 'Ghostface Killah', 'Mos Def'], 'c', './img/gfk.jpg', './sound/gfk.mp3');
qArr[8] = new Question('Mobb Deep are made up of two members - Prodigy and who?', ['Q-Tip', 'Big Noyd', 'Pete Rock', 'Havoc'], 'd', './img/mbdp.jpg', './sound/mbdp.mp3');
qArr[9] = new Question('What is the name of Jay-Z\'s record label?', ['Bad Boy', 'RCA', 'Def Jam', 'Rockafella'], 'd', './img/jz.jpg', './sound/jz.mp3');
qArr[10] = new Question('Who was the first hip hop artist to ever win a grammy?', ['DJ Jazzy Jeff & The Fresh Prince', 'Kendrick Lamar', 'Notorious B.I.G.', 'Lauren Hill'], 'a', './img/frp.jpg', './sound/frp.mp3');

newGameButton.style.visibility = 'hidden'; //Hiding the START AGAIN button

//Will play the given audio
let audioPlay = (audio) => {
    let newAudio = new Audio(audio);
    newAudio.play();
}

//Will display the given image
let imgDisplay = (img) => {
    container.style.visibility = 'hidden';
    displayScore.style.visibility = 'hidden';
    correctAnswerImage.style.display = 'block';

    correctAnswerImage.innerHTML = `<img src="${img}" alt="" class="heading-display-pic"></img>`
}

//Keeping count of our score
let scoreFunction = () => {
    score++;
    displayScore.textContent = `Your Score: ${score}`
}

//If the answer was correct:
let correctAnswer = (number) => {
    answersWrapper.style.visibility = 'hidden'
    scoreFunction();
    audioPlay(qArr[number].audio); //Play the audio
    imgDisplay(qArr[number].picture); //Show the image

    setTimeout(() => {
    correctAnswerImage.style.display = 'none';
    container.style.visibility = 'visible';
    displayScore.visibility = 'visible';
    }, 3000)

    if (usedNumbers.length != qArr.length) { //validating if the game is finished
    setTimeout(function () {
        answersWrapper.style.visibility = 'visible'
        generateNewQuestion(qArr, randomNumber()); //Generate a new random questions!
    }, 3000);
}

//Baiscally if the player won the game
else { //The game is finished (qArr == usedArr)
    scoreFunction();  //Give the player +1 score
    newGameOption();  //Ask the play for another round
}
}

let mistakeCount = () =>{
    mistakes++;
    return mistakes;
}

//Generating a random number that has not been in use yet
let randomNumber = () => {
    let number = Math.ceil(Math.random() * qArr.length - 1);
    if (usedNumbers.length === qArr.length) {
        number = undefined;
        newGameOption();
    } else {
        while (usedNumbers.includes(number) && usedNumbers.length !== qArr.length) {
            number = Math.ceil(Math.random() * qArr.length - 1);
        }
    }
    return number;
}

let wrongAnswer = () => { //If the answer is wrong
    mistakes++; //The player has made a mistake
    if (mistakes === 1) { //For the first mistake
        audioPlay('./sound/wrong.mp3');
        heading.textContent = 'WRONG ANSWER'; //Header that says
        musicIcon1.classList.add('wrong-answer'); //This class will make the icon look bigger and red
        answersWrapper.style.visibility = 'hidden'; //Don't show the answer buttons

        setTimeout(function () {
            answersWrapper.style.visibility = 'visible'; //Show the buttons again
            musicIcon1.style.visibility = 'hidden'; //Hide the icon
            generateNewQuestion(qArr, randomNumber()) //Generate a new question
        }, 1500);
    }

    else if(mistakes === 2){
        audioPlay('./sound/wrong.mp3');
        heading.textContent = 'WRONG ANSWER'; //Header that says
        musicIcon2.classList.add('wrong-answer'); //This class will make the icon look bigger and red
        answersWrapper.style.visibility = 'hidden'; //Don't show the answer buttons

        setTimeout(function () {
            answersWrapper.style.visibility = 'visible'; //Show the buttons again
            musicIcon2.style.visibility = 'hidden'; //Hide the icon

            generateNewQuestion(qArr, randomNumber()) //Generate a new question
        }, 1500);

    }else if (mistakes === 3) {
        audioPlay('./sound/wrong.mp3');
        heading.textContent = 'WRONG ANSWER';
        musicIcon3.classList.add('wrong-answer');
        answersWrapper.style.visibility = 'hidden';

        setTimeout(function () {
            answersWrapper.style.visibility = 'visible';
            musicIcon3.style.visibility = 'hidden';
            newGameOption(); //The game is over! User has lost
        }, 1500);
    }
}
    
    let qRenderer = (qArr, number) => { //Show the UI our new questions
    heading.textContent = qArr[number].question;
    document.getElementById('a').textContent = qArr[number].options[0];
    document.getElementById('b').textContent = qArr[number].options[1];
    document.getElementById('c').textContent = qArr[number].options[2];
    document.getElementById('d').textContent = qArr[number].options[3];

}

let checkAnswer = (qArr, number) => { //Add events listeners
    usedNumbers.push(number); //Push the given number to the used numbers
    document.getElementById('a').addEventListener('click',getIdHandler);
    document.getElementById('b').addEventListener('click',getIdHandler);
    document.getElementById('c').addEventListener('click',getIdHandler);
    document.getElementById('d').addEventListener('click',getIdHandler);
}

let getIdHandler = (e) => { //Handling the event listeners
if (e.target.id == qArr[currentNumber].id) { //If the answer is true
    correctAnswer(currentNumber); //Show is the given random number - we need it for the img and audio display
}else {
wrongAnswer();
}
}

//QUESTION GENERATOR
let generateNewQuestion = (qArr, number) => { //Baically a controller for our new questions
    if (number !== undefined) {
        currentNumber = number;
        qRenderer(qArr, number);
        checkAnswer(qArr, number);
    }
}

let scoreChecker = () => {
    if (score <= 5){
        heading.innerHTML = `You scored: ${score} out of ${qArr.length}, You can't call yourself a hip-hop junkie.`;
    }else if (score >= 5 && score < 9){
        heading.innerHTML = `You scored: ${score} out of ${qArr.length}, You know shit, but that's not enough.`;
    }else if (score >= 9) {
        heading.innerHTML = `You scored: ${score} out of ${qArr.length}, You are a real hip-hop junkie!`;
    }
}

let restoreIcons = () => {//Restore the icons when the user wants to play again
    musicIcon1.classList.remove('wrong-answer'); 
    musicIcon2.classList.remove('wrong-answer');
    musicIcon3.classList.remove('wrong-answer'); //Removing the red color of our icons
    musicIcon1.style.visibility = 'visible';
    musicIcon2.style.visibility = 'visible';
    musicIcon3.style.visibility = 'visible'; //Showing the icons again
}

let toggleButtonsVisibility = () => {//Restore the buttons when the user wants to play again
    answersWrapper.style.visibility = 'hidden'; //The answer buttons are hidden
    newGameButton.style.visibility = 'visible'; //New game button is visible
    // newGameButton.innerHTML = `<button id=new-game>Start again!</button>`; //The HTML code for the button
}

let newGameOption = () => { //New game option
    scoreChecker();
    toggleButtonsVisibility();
    document.getElementById('new-game').addEventListener('click', () => { //Initializing the game once more
        restoreIcons();
        newGameButton.style.visibility = `hidden`; //Hiding the new game button
        answersWrapper.style.visibility = 'visible'; //Showing the answers buttons
        mistakes = 0;
        score = 0;
        usedNumbers = [];
        generateNewQuestion(qArr, randomNumber()); //Starting our game once again
    });
}

generateNewQuestion(qArr, randomNumber());
