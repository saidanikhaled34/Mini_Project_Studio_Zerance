const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const optionPointer = document.querySelector(".option-point");

const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");


let questionCounter = 0;
let questionpoint=10;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];


function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0;i<totalQuestion;i++){

        availableQuestions.push(quiz[i])
    }
}
function getNewQuestion(){
    questionNumber.innerHTML ="Question "+(questionCounter+1) + " of "+ quiz.length;
    optionPointer.innerHTML =(questionpoint) ;

    const questionIndex =availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    const index1= availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1);
    const optionLen =currentQuestion.options.length
    
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i)
    }
optionContainer.innerHTML=''; 
    let animationDelay = 0.15;
    for(let i=0; i<optionLen; i++){
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);

        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id =optionIndex;
        option.style.animationDelay = animationDelay +'s';
        animationDelay = animationDelay + 0.2;
        option.className ="option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)");
     }

    
    
    questionCounter++

}

function getResult(element){
    const id = parseInt(element.id);

    if(id === currentQuestion.answer){
        element.classList.add("correct");
        questionpoint++

    }
    else{
        element.classList.add("wrong");
        questionpoint--

const optionLen = optionContainer.children.length;
for(let i=0;i<optionLen;i++){
    if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
    optionContainer.children[i].classList.add("correct");    
    }
}

    }

    unclickablOptions()
}

function     unclickablOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered")
    }
}

function next(){
    if ( (questionpoint == 20 ) || (questionpoint == 0)){
        console.log("quiz over");
        quizOver();
    }
    else{
        getNewQuestion();
    }

}
function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();

}

function quizResult(){
    if (questionpoint == 20 ){
       
        resultBox.querySelector(".result_gagne").innerHTML="Vous avez gagné le test "+ questionpoint + " point ";

    }
    else{
        
        resultBox.querySelector(".result_gagne").innerHTML="Vous avez perdus le test "+ questionpoint + " point ";
    }
}


function Accueil(){
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide")
    resetQuiz();
    
}

function resetQuiz(){
    questionCounter = 0;
    questionpoint=10;

}
function Restart(){
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide")
    resetQuiz();
    sartQuiz();

}

 function sartQuiz(){
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide")
    setAvailableQuestions();
    getNewQuestion();
   

}