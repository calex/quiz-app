'use strict';

function generateQuizAnswerElement(item, index) {
    // generate DOM elements for quiz answers from the store (see store.js)
    const itemSupportingInfoText = (item.supportingInfoText.length > 0) ? `(<i>${item.supportingInfoText}</i>)` : "";

    const hasNoImage = (item.supportingImageUri.length <= 0);

    const hasNoImageClass = hasNoImage ? "answer--no-image" : "";

    const itemImage = !hasNoImage ? `<img class='answer__image' src="images/${item.supportingImageUri}" alt="${item.supportingImageAltText}">` : "";

    return `
        <li role="radio" class="answer ${hasNoImageClass}" tabindex="0">
            <input type="radio" name="question-${USERDATASTORE.currentStep}" id="question-${index}" value="${item.id}" tabindex="0">
            <label for="question-${index}" tabindex="0">
                ${itemImage}
                <p>
                    ${item.answerText} 
                    ${itemSupportingInfoText}
                </p>
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

function submitAnswer() {
    $('#answer-submit').on('click', event => {

        event.preventDefault();

        let inputtedAnswer = $(`input[name=question-${USERDATASTORE.currentStep}]:checked`).val();

        if (inputtedAnswer !== undefined) {

            let selectedAnswer = QUESTIONSTORE[USERDATASTORE.currentStep - 1].possibleAnswers.find(item => item.id === inputtedAnswer);

            if (selectedAnswer !== undefined) {

                let basicAnswerRevealText = ""; 
                let basicAnswerRevealTextClass = "";

                if (selectedAnswer.number === QUESTIONSTORE[USERDATASTORE.currentStep - 1].correctAnswerNumber) {

                    basicAnswerRevealText = "Correct!";
                    basicAnswerRevealTextClass = "answer-revealer__title--correct";

                    USERDATASTORE.correctScore++; 

                    flashColorTimeout('#js-scorekeeper-correct-span', '#a6caff');

                } else { 

                    basicAnswerRevealText = "Incorrect!";
                    basicAnswerRevealTextClass = "answer-revealer__title--incorrect";

                    USERDATASTORE.incorrectScore++; 

                    flashColorTimeout('#js-scorekeeper-incorrect-span', '#f5b9b9');
                }

                // ensures the score updates right away
                renderQuizHeaderElements();

                $(event.currentTarget).hide();

                const endQuizHtml = `
                    <div class="answer-revealer">
                        <h3 class='${basicAnswerRevealTextClass}'>${basicAnswerRevealText}</h3>
                        <p>${selectedAnswer.answerGuessedResponseHtml}</p>
                        <p>And that's a wrap, folks! You scored ${USERDATASTORE.correctScore} out of ${QUESTIONSTORE.length}.</p>
                        <button id='start-over' role='button' class='screen__button answer-revealer__button'>Start again</button>
                    </div>            
                `;

                const revealAnswerHtml = `
                    <div class="answer-revealer">
                        <h3 class='${basicAnswerRevealTextClass}'>${basicAnswerRevealText}</h3>
                        <p>${selectedAnswer.answerGuessedResponseHtml}</p>
                        <button id='next-question' role='button' tabindex='0' class='screen__button answer-revealer__button'>Proceed <span class="extraneous-label-text">to Next Question</span></button>
                    <div>
                `;

                const bottomNavBarHtml = isEndOfQuiz() ? endQuizHtml : revealAnswerHtml;

                $('.bottom-nav-bar').addClass('bottom-nav-bar--reveal-mode');
                $('.reveal-mode-scrim').addClass('reveal-mode-scrim--active');
                $('.bottom-nav-bar__content').append(bottomNavBarHtml);
            }

            else {
                console.log("Something went wrong: the selected answer does not exist in the database store");
            }

        } else {

            console.log("Nothing was chosen before the user clicked the submit button");

        } 
    });
}

document.addEventListener("keydown", event => {
    // for accessibility; allows enter key to trigger next step or quiz refresh on proceed/start over buttons
    // TODO: there's probably a better way to do this in the future than reading off a DOM element class! 
    if (event.key === 'Enter' && $('.bottom-nav-bar').hasClass('bottom-nav-bar--reveal-mode')) {
                
        resetBottomBarToDefaultState(); 

        if (!isEndOfQuiz()) {
            proceedToNextStep();
        }
        else {
            resetQuiz();
        }
    }
});

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
    submitAnswer();
    nextQuestion();
    startOver();
}

$(runApp);