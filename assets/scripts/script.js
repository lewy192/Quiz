var questions = [
    {question:'How do you retrieve a variable named "value" from local storage?',
    answers:[{answerText:'getItem(value)',correct:true},
            {answerText:'setItem("value")', correct:false},
            {answerText:'getItem("value")',correct:false},
            {answerText:'setItem(value,"hello")',correct:false}]},
    {question:'What is the purpose of preventDefault( )?',
    answers:[
        {answerText:'To prevent code from running', correct: false},
        {answerText:'prevent a function from executing',correct:false},
        {answerText:'Prevent a broswer executing a default action',correct:true},
        {answerText:'Prevent a user from entering "default" as an input',correct:false}]},
    {question:'what is not a type in js',
    answers:[{answerText:'Boolean', correct:false},
    {answerText:'Big Int',correct:true},
    {answerText:'Number',correct:false},
    {answerText:'String',correct:false}]}
    // {question:'',
    // answers:['','','','']},
    // {question:'',
    // answers:['','','','']},
    // {question:'',
    // answers:['','','','']},
    // {question:'',
    // answers:['','','','']}
]
var questionNumber = 0;
// var shuffledArray = shuffleArray(questions);
var nextButton = document.querySelector("#next-button");
var score = 0;

/**TODO
 * when timer runs out show answers , wait 2 seconds and move on 
 * get leaderboard working
 * README 
 */


function timer(){
    window.counterValue = 100

    counterDisplay = document.querySelector("#time");
    counterDisplay.textContent = window.counterValue;
    window.intervalID = setInterval(function(){
        if (window.counterValue > 0){
        window.counterValue -= 1;
        counterDisplay.textContent = window.counterValue}
        
        else{
            // call out of time function
            return};
    },1000);
};

function runQuiz(){
    if(nextButton.innerHTML === 'Start'){
        window.shuffledArray = shuffleArray(questions);
        timer();
        toNextQuestion();
        checkAnswer();

    }else if(window.counterValue !== 0){
        to
        
        // submit scores to local storage
    }else if(questionNumber === window.shuffledArray.length){
        document.querySelector('#next-button').innerHTML = 'Submit'
        toLeaderBoardForm();
    }
}


function quizStartUp(){
    if(nextButton.innerHTML === 'Start'){
        window.shuffledArray = shuffleArray(questions);
        timer();
        toNextQuestion();
        checkAnswer();
    }
}
// run when next button clicked
var toNextQuestion = function(){
    console.log('tNQ called')
    document.querySelector('#next-button').disabled = true;
    // resets answer button text to white
    var allButtons = document.querySelectorAll('.answer-button');
    allButtons.forEach(item => item.disabled = false);
    allButtons.forEach(item => item.style.color = 'white');
    var question = document.querySelector("#question");
    document.querySelector('#next-button').innerHTML = 'Next';


    
    var selectedQuestion = window.shuffledArray[questionNumber];
    question.textContent = selectedQuestion.question;
    questionButtons();
    questionNumber +=1;
    if ((window.counterValue !== 0) && (questionNumber !== window.shuffledArray.length-1)){
        checkAnswer();
    }
    };

function questionButtons (){ 
    console.log('qB called')
    var selectedAnswers = window.shuffledArray[questionNumber].answers;
    // console.log(selectedAnswers)
    for (var i = 0; i < selectedAnswers.length;i++){
        btn = document.querySelector('#button'+i);
        btn.style.display = 'inline-block';
        btn.innerHTML = selectedAnswers[i].answerText;
        btn.dataset.correct = selectedAnswers[i].correct;
    };    
};

function checkAnswer(){
    // debugger
    var buttonContainer = document.querySelector('.button-container');
    buttonContainer.addEventListener('click', function buttonListener(e){
        e.stopPropagation();
        e.preventDefault();
        var answerButton = document.querySelectorAll('.answer-button')
        if (e.target.matches('.button')){
            // debugger
            if(e.target.dataset.correct === 'true'){
                e.target.style.color = '#00FF00';
                score +=10;
                answerButton.forEach(item => item.disabled = true);
                updateScore();
                // buttonContainer.removeEventListener('click',buttonListener)
            }else{
                e.target.style.color = "#fd0000";
                window.counterValue -= 10;
                answerButton.forEach(item => item.disabled = true);
            }
        };
        ;
        buttonContainer.removeEventListener('click',buttonListener)
        document.querySelector('#next-button').disabled = false;
    })
    toNextQuestion();

}





function toLeaderBoardForm(){
    document.querySelector('#question').innerHTML = 'Enter your namne below to be entered on the leaderboard';
    document.querySelector('.timer').style.display = 'none';
    var parentID = document.querySelector('.button-container');
    var parentIdArray= Array.from(parentID.children);
    parentIdArray.forEach(item => item.style.display = 'none');
    // creating form
    var formElement = document.createElement('input')
    formElement.className = 'leaderboard-form'
    formElement.style.display = 'inline-block'
    formElement.placeholder = 'Enter Your Username Here'
    parentID.appendChild(formElement)
}

function submitToLeaderboard(){
    var formElement = document.querySelector('.leaderboard-form')
    var usersName = formElement.value
    var usersInfo = {name:usersName,
    score:score}
    if (JSON.parse(localStorage.getItem('usersLeaderBoard'))){
        var usersArray = JSON.parse(localStorage.getItem('usersLeaderBoard'));
    }else{
        var usersArray = [];
    }
    usersArray.push(usersInfo)
    localStorage.setItem('usersLeaderBoard',JSON.stringify(usersArray));
    formElement.value ='';
    document.querySelector('#next-button').disabled = true;
    formElement.style.display ='none';
    var leaderboardButton = document.createElement('button');
    var leaderAnchor  = document.createElement('a');
    leaderAnchor.href = '/leaderboard.html';
    leaderAnchor.innerHTML = 'To Leaderboard';
    leaderboardButton.appendChild(leaderAnchor);
    leaderboardButton.className ='button';
    document.querySelector('.button-container').appendChild(leaderboardButton);
}

function shuffleArray(arr){
        var i = arr.length;
        var j;
        var temp; 
        // while i decrements to 1 execute the following for every iteration of the loop
        while(--i > 0){
            // assing j to a random index
            j = Math.floor(Math.random() * (i));
            // set temp to a temporary value of the value at index j
            temp = arr[j];
            // item at index j becomes the value at index i
            arr[j] = arr[i];
            // item at index i becomes the value at temp 
            arr[i] = temp;
            }
        return arr;
        }


        // TODO handle error 'uncaught TypeError' when leaderboard.html has loaded
        nextButton.addEventListener('click',quizStartUp)   //magic starts here

    // do nothing

var updateScore = function(){
    document.querySelector('#score').innerHTML = score;
}

function compareScore(a, b){
    var score1 = a.score;
    var score2 = b.score;

    var comparison = 0;
    if (score1 < score2){
        comparison = 1;
    
    }else if (score1 > score2){
        comparison =-1
    }
    return comparison;
}




function organiseLeaderboardScores(){
    var leaderScores = JSON.parse(localStorage.getItem('usersLeaderBoard'))
    leaderScores.sort(compareScore)
    var leaderSpot = document.querySelector(`leader-spot${i}`)
    var playerScore = document.querySelector(`player-score${i}`)
    if(leaderScores.length > 5){
        for(var i = 0; i < 5;i++){
        var leaderSpot = document.querySelector(`leader-spot${i}`)
        var playerScore = document.querySelector(`player-score${i}`)
        leaderSpot.innerHTML+= leaderScores[i].name
        playerScore.innerHTML = leaderScores[i].score
    }}else if(leaderScores.length > 0 && leaderScores.length < 5){
        for (var i = 0; i < leaderScores.length;i++){
            var leaderSpot = document.querySelector(`leader-spot${i}`)
            var playerScore = document.querySelector(`player-score${i}`)
            leaderSpot.innerHTML+= leaderScores[i].name
            playerScore.innerHTML = leaderScores[i].score
        }
    }else{
        
        var leaderContainter =document.querySelector('.leader-container').children
        Array.from(leaderContainter).forEach(child => child.style.display = 'none')
    }
    
}

// var leaderScores = JSON.parse(localStorage.getItem('usersLeaderBoard'))
// console.log(leaderScores.sort(compareScore));
// console.log(document.querySelector('.leader-container').children)
