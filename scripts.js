'use strict';

function generateQuizAnswerElement(item, index) {
    // generate DOM elements for quiz answers from the store (see store.js)
    const itemSupportingInfoText = (item.supportingInfoText.length > 0) ? `(<i>${item.supportingInfoText}</i>)` : "";

    const hasNoImage = (item.supportingImageUri.length <= 0);

    const hasNoImageClass = hasNoImage ? "answer--no-image" : "";

    const itemImage = !hasNoImage ? `<img class='answer__image' src="images/${item.supportingImageUri}" alt="${item.supportingImageAltText}">` : "";

    return `
        <li role="radio" class="answer ${hasNoImageClass}" aria-checked="false">
            <input type="radio" name="question-${USERDATASTORE.currentStep}" id="question-${index}" value="${item.id}" tabindex="0">
            <label for="question-${index}" tabindex="0">
                ${itemImage}
                <span class='label__answer'>
                    ${item.answerText} 
                    ${itemSupportingInfoText}
                </span>
            </label>
        </li>
    `;
}
  
  
function generateQuizAnswersString(quizAnswers) {
    // string the generated DOM elements into an HTML string   
    const items = quizAnswers.map((item, index) => generateQuizAnswerElement(item, index));
    
    return items.join("");
}
  
  
function renderQuizQuestionAndAnswers() {
    // get rendered DOM elements that contain possible answers, as HTML string
    let currentQuestionNumber = USERDATASTORE.currentStep - 1; 
    const quizAnswersString = generateQuizAnswersString(QUESTIONSTORE[currentQuestionNumber].possibleAnswers);
  
    // insert that HTML into the DOM
    $('#question').text(QUESTIONSTORE[currentQuestionNumber].questionText);
    $('.answers-list').html(quizAnswersString);
}

function renderQuizHeaderElements() {
    // render the quiz header in the DOM    
    $('#js-question-number-span').text(`${USERDATASTORE.currentStep}`);
    $('#js-question-total-span').text(`${QUESTIONSTORE.length}`);

    $('#js-scorekeeper-correct-span').text(`${USERDATASTORE.correctScore}`);
    $('#js-scorekeeper-incorrect-span').text(`${(USERDATASTORE.incorrectScore)}`);
}

function renderQuizScreen() {
    renderQuizHeaderElements();
    renderQuizQuestionAndAnswers();
}

function proceedToNextStep() {
    USERDATASTORE.currentStep++;

    renderQuizScreen();
}

function resetQuiz() {
    USERDATASTORE.currentStep = 1; 
    USERDATASTORE.correctScore = 0; 
    USERDATASTORE.incorrectScore = 0; 

    renderQuizScreen();
}

function resetBottomBarToDefaultState() {
    $('.answers-list').removeClass('answers-list--w-bottom-nav-bar-showing');
    $('#answer-submit').show();
    $('.answer-revealer').remove();
    $('.bottom-nav-bar').removeClass('bottom-nav-bar--reveal-mode');
    $('.bottom-nav-bar').removeClass('bottom-nav-bar--reveal-button-mode');
    $('.reveal-mode-scrim').removeClass('reveal-mode-scrim--active');
}

function flashColorTimeout(domElement, color) {
    $(domElement).css('color', color);

    const flashColorTimeout = window.setTimeout(function() {
        $(domElement).css('color', '');
    }, 500);
}

function selectAnswer() {
    $('.answers-list').on('click', 'input', event => {
         $('.answers-list').addClass('answers-list--w-bottom-nav-bar-showing');
         $('.bottom-nav-bar').addClass('bottom-nav-bar--reveal-button-mode');
    });
}

function isEndOfQuiz() {
    return (USERDATASTORE.currentStep === QUESTIONSTORE.length);
}

function returnEndQuizSummaryHtml(basicAnswerRevealTextClass, basicAnswerRevealText, answerGuessedResponseHtml, totalCorrectScore, totalNumberOfQuestions) {
    return `<div class="answer-revealer">
        <h3 class='${basicAnswerRevealTextClass}'>${basicAnswerRevealText}</h3>
        <p>${answerGuessedResponseHtml}</p>
        <p>And that's a wrap, folks! You scored ${totalCorrectScore} out of ${totalNumberOfQuestions}.</p>
        <button id='start-over' role='button' class='screen__button answer-revealer__button'>Start again</button>
    </div>`;
}
 
function returnRevealAnswerHtml(basicAnswerRevealTextClass, basicAnswerRevealText, answerGuessedResponseHtml) {
    return `
        <div class="answer-revealer">
            <h3 class='${basicAnswerRevealTextClass}'>${basicAnswerRevealText}</h3>
            <p>${answerGuessedResponseHtml}</p>
            <button id='next-question' role='button' class='screen__button answer-revealer__button'>Proceed <span class="extraneous-label-text">to Next Question</span></button>
        <div>`
    ;
}

function returnBottomNavBarHtml(answerIsCorrect, selectedAnswer) {
    let basicAnswerRevealText = ""; 
    let basicAnswerRevealTextClass = "";

    if (answerIsCorrect) {
        
        basicAnswerRevealText = "Correct!";
        basicAnswerRevealTextClass = "answer-revealer__title--correct";
    }

    else {

        let correctAnswerObject = QUESTIONSTORE[USERDATASTORE.currentStep - 1].possibleAnswers.find(item => item.number === QUESTIONSTORE[USERDATASTORE.currentStep - 1].correctAnswerNumber);
 
        basicAnswerRevealText = `Incorrect! The correct answer is <span id='revealed-correct-answer'>${correctAnswerObject.answerText}.</span>`;
        basicAnswerRevealTextClass = "answer-revealer__title--incorrect";
    }

    const bottomNavBarHtml = isEndOfQuiz() 
        ? returnEndQuizSummaryHtml(basicAnswerRevealTextClass, basicAnswerRevealText, selectedAnswer.answerGuessedResponseHtml, USERDATASTORE.correctScore, QUESTIONSTORE.length) 
        : returnRevealAnswerHtml(basicAnswerRevealTextClass, basicAnswerRevealText, selectedAnswer.answerGuessedResponseHtml);

    return bottomNavBarHtml;
}

function popupAnswerRevealer() {
    let inputtedAnswer = $(`input[name=question-${USERDATASTORE.currentStep}]:checked`).val();

    if (inputtedAnswer !== undefined) {

        let selectedAnswer = QUESTIONSTORE[USERDATASTORE.currentStep - 1].possibleAnswers.find(item => item.id === inputtedAnswer);

        if (selectedAnswer !== undefined) {

            let selectedAnswerIsCorrect = selectedAnswer.number === QUESTIONSTORE[USERDATASTORE.currentStep - 1].correctAnswerNumber; 

            if (selectedAnswerIsCorrect) {

                USERDATASTORE.correctScore++; 

                flashColorTimeout('#js-scorekeeper-correct-span', '#a6caff');

            } else { 

                USERDATASTORE.incorrectScore++; 

                flashColorTimeout('#js-scorekeeper-incorrect-span', '#f5b9b9');
            }

            // ensures the score updates right away
            renderQuizHeaderElements();

            $('#answer-submit').hide();

            $('.bottom-nav-bar').addClass('bottom-nav-bar--reveal-mode');
            $('.reveal-mode-scrim').addClass('reveal-mode-scrim--active');

            let bottomNavBarHtml = returnBottomNavBarHtml(selectedAnswerIsCorrect, selectedAnswer);

            $('.bottom-nav-bar__content').append(bottomNavBarHtml);
        }

        else {
            console.log("Something went wrong: the selected answer does not exist in the database store");
        }

    } else {
        console.log("Nothing was chosen before the user clicked the submit button");
    } 
}

function submitAnswer() {
    $('#answer-submit').on('click', event => {

        event.preventDefault();

        popupAnswerRevealer();
    });
}

function listenForKeyDown() {
    document.addEventListener("keydown", event => {        
        // for accessibility; allows enter or space key to trigger next step or quiz refresh on proceed/start over buttons
        let inputtedAnswer = $(`input[name=question-${USERDATASTORE.currentStep}]:checked`).val();

        if ((event.key === " " || event.key === "Enter" || event.key === "Spacebar") && inputtedAnswer !== undefined) {
            event.preventDefault(); //prevents scroll on space bar
            
            // TODO: there's probably a better way to do this in the future than reading off a DOM element class! 
            if ($('.bottom-nav-bar').hasClass('bottom-nav-bar--reveal-mode')) {

                resetBottomBarToDefaultState(); 

                if (!isEndOfQuiz()) {
                    proceedToNextStep();
                }
                else {
                    resetQuiz();
                }
            }

            else {
                popupAnswerRevealer();
            }
        }
    });
}

function nextQuestion() {
    $('.bottom-nav-bar').on('click', '#next-question', function(event) {        
        event.preventDefault();

        if (!isEndOfQuiz()) {
            resetBottomBarToDefaultState();           
            proceedToNextStep(); 
        }
    });
} 

function startOver() {
    $('.bottom-nav-bar').on('click', '#start-over', event => {
        event.preventDefault();

        resetBottomBarToDefaultState();
        resetQuiz();
    });
}

function runApp() {
    renderQuizScreen();
    selectAnswer();
    listenForKeyDown();
    submitAnswer();
    nextQuestion();
    startOver();
}

$(runApp);