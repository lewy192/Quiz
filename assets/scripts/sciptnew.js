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
    {answerText:'String',correct:false}]},
    {question:'what does css stand for?',
    answers:[{answerText:'cascading style sheet',correct:true},
    {answerText:'calm slick and smooth',correct:false},
    {answerText:'cascading sheet style',correct:false},{answerText:'javascript'}]}
    // {question:'',
    // answers:['','','','']},
    // {question:'',
    // answers:['','','','']},
    // {question:'',
    // answers:['','','','']}
]
var score = 0;
var questionNumber = 0;
var nextButton = document.querySelector("#next-button");


function quizStartUp(){
    if (nextButton.innerHTML === 'Start'){
        runTheQuiz(shuffleArray(questions));
        timer();
    }
}

function runTheQuiz(questionSet){
    console.log('run quiz called')
    // establishes the question and answers for the user
    document.querySelector('#next-button').style.visibility ='hidden';
    var questionDisplay = document.querySelector('#question');
    var currentQuestion = questionSet[questionNumber];
    questionDisplay.textContent = currentQuestion.question;
    questionButtons(questionSet);
    questionNumber++;
    checkAnswer(questionSet.length,questionSet);
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
};

function timer(){
    window.counterValue =   100;

    counterDisplay = document.querySelector("#time");
    counterDisplay.textContent = window.counterValue;
    window.intervalID = setInterval(function(){
        if (window.counterValue > 0){
        window.counterValue -= 1;
        counterDisplay.textContent = window.counterValue}
        else{
            lastQuestion();
            return};
    },1000);
};

function questionButtons (questionSet){ 
    var selectedAnswers = questionSet[questionNumber].answers;
    // console.log(selectedAnswers)
    for (var i = 0; i < selectedAnswers.length;i++){
        btn = document.querySelector('#button'+i);
        btn.style.color = 'white'
        btn.style.display = 'inline-block';
        btn.innerHTML = selectedAnswers[i].answerText;
        btn.dataset.correct = selectedAnswers[i].correct;
    };    
};

function checkAnswer(noOfQuestions,questionSet){
    // debugger
    var buttonContainer = document.querySelector('.button-container');
    buttonContainer.addEventListener('click', function buttonListener(e){
        e.stopPropagation();
        e.preventDefault();
        console.log(questionNumber === noOfQuestions)
        var answerButton = document.querySelectorAll('.answer-button')
        if (e.target.matches('.button')){
            // debugger
            if(e.target.dataset.correct === 'true' && (counterValue > 0 && questionNumber < noOfQuestions)){
                // console.log('true and not last')
                e.target.style.color = '#00FF00';
                // answerButton.forEach(item => item.disabled = true);
                updateScore(counterValue);
                buttonContainer.removeEventListener('click',buttonListener)
                runTheQuiz(questionSet);
                
                // buttonContainer.removeEventListener('click',buttonListener)
            }else if (e.target.dataset.correct === 'false' && (counterValue > 0 && questionNumber < noOfQuestions)){
                // console.log('false and not last')
                e.target.style.color = "#fd0000";
                window.counterValue -= 10;
                updateScore(counterValue);
                buttonContainer.removeEventListener('click',buttonListener)
                runTheQuiz(questionSet);
                // answerButton.forEach(item => item.disabled = true);
            }else if (e.target.dataset.correct === 'false' &&   (counterValue > 0 && questionNumber === noOfQuestions)){
                // console.log('false and last')
                window.counterValue -= 10;
                lastQuestion();
                buttonContainer.removeEventListener('click',buttonListener)
            }else{
                // console.log('true and last or counter = 0')
                lastQuestion();
                buttonContainer.removeEventListener('click',buttonListener)
            }
        };
    });
};  
function updateScore(scoreToUpdate){
    document.querySelector('#score').textContent = scoreToUpdate;
};


function lastQuestion(){
    updateScore(counterValue);
    toLeaderBoardForm();
    nextButton.style.visibility = 'visible';
    nextButton.textContent = 'Submit'
    nextButton.addEventListener('click' ,function leaderListener(e){
    document.querySelector('#question').innerHTML = '';
    e.stopPropagation();
    submitToLeaderboard();
    });
};


function toLeaderBoardForm(){
    clearInterval(intervalID)
    document.querySelector('#question').style.display = 'none';
    document.querySelector('.timer').style.display = 'none';
    var parentID = document.querySelector('.button-container');

    updateScore(counterValue);
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
    if(usersName === ''){
        window.alert('You did not enter a name')

    }else{

    var usersInfo = {name:usersName,
    score:counterValue}
    if (JSON.parse(localStorage.getItem('usersLeaderBoard'))){
        var usersArray = JSON.parse(localStorage.getItem('usersLeaderBoard'));
    }else{
        var usersArray = [];
    }
    usersArray.push(usersInfo)
    localStorage.setItem('usersLeaderBoard',JSON.stringify(usersArray));
    formElement.value ='';
    formElement.style.display ='none';
    nextButton.innerHTML = '';
    nextButton.disabled = true;
    // nextButton.removeEventListener(quizStartUp)
    var leaderAnchor  = document.createElement('a');
    leaderAnchor.href = '/leaderboard.html';
    leaderAnchor.innerHTML = 'To Leaderboard';
    nextButton.appendChild(leaderAnchor);
    }
}



nextButton.addEventListener('click',quizStartUp)

