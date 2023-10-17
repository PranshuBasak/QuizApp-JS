// Create Quiz Class


/**
This code defines a Quiz class with a constructor that takes an array of questions as a parameter. It also initializes the score, questions, and questionIndex properties.
The getQuestionIndex() method returns the current question based on the questionIndex.
The guess() method increments the score if the answer is correct and increments the question index.
The isEnded() method checks if all questions have been answered.
 */
class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }

  getQuestionIndex() {
    return this.questions[this.questionIndex];
  }

  guess(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.questionIndex++;
  }

  isEnded() {
    return this.questionIndex === this.questions.length;
  }
}

// Create Question Class

/** This code defines a Question class with a constructor that takes text, choices, and answer as parameters. It initializes these properties.
The shuffleChoices() method shuffles the choices array randomly using the Fisher-Yates algorithm.
The isCorrectAnswer() method checks if the given choice is the correct answer. */


class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
// Shuffling the choices

  shuffleChoices() {
    for (let i = this.choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];
    }
  }

  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}

// Display Question

/** This code defines a displayQuestion() function that displays the current question and its choices.
If the quiz is ended, it calls the showScores() function to display the final score.
Otherwise, it retrieves the question and choices from the Quiz object and updates the HTML elements accordingly.
It also attaches event listeners to each choice button to handle user selection. */

function displayQuestion() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    // Show Questions
    let questionElement = document.getElementById("question");
    questionElement.innerHTML = quiz.getQuestionIndex().text;

    // Show Options
    let choices = quiz.getQuestionIndex().choices;
    for (let i = 0; i < choices.length; i++) {
      let choiceElement = document.getElementById("choice" + i);
      choiceElement.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }

    showProgress();
  }
}

// Guess Function

/** This code defines a guess() function that handles user guesses.
It takes an id and a guess as parameters.
It retrieves the button element with the given id and attaches a click event listener to it.
When clicked, it calls the guess() method of the Quiz object with the selected choice and updates the displayed question. */

function guess(id, guess) {
  let button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    displayQuestion();
  };
}

// Show Progress
/** This code defines a showProgress() function that updates the progress element on the page.
It retrieves the current question index from the Quiz object and updates the HTML element accordingly. */

function showProgress() {
  let currentQuestionNumber = quiz.questionIndex + 1;
  let progressElement = document.getElementById("progress");
  progressElement.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
}

// Show Score
/** This code defines a showScores() function that displays the final score when the quiz is completed.
It creates an HTML string with the score information and assigns it to the innerHTML property of the quizElement. */

function showScores() {
  let quizEndHtml = `
        <h1>Quiz Completed</h1>
        <h2 id="score">Your Score is ${quiz.score} out of ${quiz.questions.length}</h2>
        <div class="quiz-repeat">
            <a href="index.html">Take Quiz Again</a>
        </div>
    `;
  let quizElement = document.getElementById("quiz");
  quizElement.innerHTML = quizEndHtml;
}

// Create Quiz Content as an Object

/**  This code creates an array of Question objects representing the quiz content.
Each question is created using the Question constructor with its text, choices, and correct answer.
The shuffleChoices() method is called for each question to shuffle their choices randomly.
A new instance of the Quiz class is created with the shuffled questions array.
The initial question is displayed by calling the displayQuestion() function.*/


let questions = [
  new Question(
    "Hyper Text Markup Language Stands For ?",
    ["Jquery", "XHTML", "CSS", "HTML"],
    "HTML"
  ),new Question(
    "Which of the following is a programming language?",
    ["HTML", "CSS", "JavaScript", "Bootstrap"],
    "JavaScript"
  ),new Question(
    "What is the output of the following code?\n\nconsole.log(typeof null);",
    ["object", "null", "undefined", "string"],
    "object"
  ),
  new Question(
    "What is the result of the following expression?\n\n'2' + 2",
    ["4", "'22'", "22", "'2 + 2'"],
    "'22'"
  ),new Question(
    "Which array method adds one or more elements to the end of an array and returns the new length?",
    ["pop()", "push()", "shift()", "unshift()"],
    "push()"
  ), new Question(
    "What is the result of the following expression?\n\n5 + '5'",
    ["10", "'55'", "'5 + 5'", "Error"],
    "'55'"
  ),
  new Question(
    "Which keyword is used to declare a variable in JavaScript?",
    ["var", "let", "const", "all of the above"],
    "all of the above"
  ),
  new Question(
    "What does the 'this' keyword refer to in JavaScript?",
    ["The current object", "The previous object", "The global object", "The parent object"],
    "The current object"
  )
];
// Adding Shuffle Function 

questions.forEach(question => question.shuffleChoices());

let quiz = new Quiz(questions);

// Display Question
displayQuestion();



// Add Timer
/**  This code sets up a countdown timer for the quiz.
It defines a startCountDown() function that uses setInterval() to decrement the quizTime variable every second.
If the timer reaches zero, it clears the interval and calls the showScores() function.
Otherwise, it calculates the minutes and seconds remaining and updates the HTML element with id count-down accordingly.
The countdown is started by calling the startCountDown() function.*/

let time = 1;
let quizTime = time*60;

let counter = document.getElementById('count-down');

function startCountDown(){
    let quizTimer = setInterval(()=>{
      if(quizTime <= 0){
          clearInterval(quizTimer);
          showScores();
      }else{
        quizTime--;
        let sec = Math.floor(quizTime % 60);
        let min = Math.floor(quizTime / 60 ) % 60;
        counter.innerHTML = `TIME: ${min} : ${sec}`;
      }
    },1000) 
}

startCountDown();