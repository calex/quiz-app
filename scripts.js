'use strict';

function generateQuizAnswerElement(item, index) {

    console.log('`generateQuizAnswerElement` ran');

    const itemSupportingInfoText = (item.supportingInfoText.length > 0) ? `(<i>${item.supportingInfoText}</i>)` : "";

    const hasNoImage = (item.supportingImageUri.length <= 0);

    const hasNoImageClass = hasNoImage ? "answer--no-image" : "";

    const itemImage = !hasNoImage ? `<img class='answer__image' src="images/${item.supportingImageUri}" alt="${item.supportingImageAltText}">` : "";

    return `
        <li class="answer ${hasNoImageClass}">
            <label>
                ${itemImage}
                <input type="radio" name="question-${USERDATASTORE.currentStep}" id="question-${index}" value="${item.id}">
                    ${item.answerText} 
                    ${itemSupportingInfoText}
                </label>
            </li>
        `;
}
  
  
function generateQuizAnswersString(quizAnswers) {
    console.log('`generateQuizAnswersString` ran');
  
    const items = quizAnswers.map((item, index) => generateQuizAnswerElement(item, index));
    
    return items.join("");
}
  
  
function renderQuizQuestionAndAnswers() {
    // render the quiz answers in the DOM
    console.log('`renderQuizQuestionAndAnswers` ran');

    let currentQuestionNumber = USERDATASTORE.currentStep - 1; 

    const quizAnswersString = generateQuizAnswersString(QUESTIONSTORE[currentQuestionNumber].possibleAnswers);
  
    // insert that HTML into the DOM
    $('#question').text(QUESTIONSTORE[currentQuestionNumber].questionText);
    $('.answers-list').html(quizAnswersString);
}

function renderQuizHeaderElements() {
    // render the quiz header in the DOM
    console.log('`renderQuizHeaderElements` ran');
    
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
    //console.log('`proceedToNextStep` ran');
    console.log(`USERDATASTORE.currentStep is ${USERDATASTORE.currentStep}`);

    USERDATASTORE.currentStep++;

    renderQuizScreen();

    console.log(`USERDATASTORE.currentStep has been incremented to ${USERDATASTORE.currentStep}`);
}

function resetQuiz() {
    console.log('`resetQuiz` ran');

    USERDATASTORE.currentStep = 1; 
    USERDATASTORE.correctScore = 0; 
    USERDATASTORE.incorrectScore = 0; 

    renderQuizScreen();
}

function resetBottomBarToDefaultState() {
    $('#answer-submit').show();
    $('.answer-revealer').remove();
    $('.bottom-nav-bar').removeClass('bottom-nav-bar--reveal-mode');
}

function submitAnswer() {
    $('#answer-submit').on('click', event => {

        event.preventDefault();

        let inputtedAnswer = $(`input[name=question-${USERDATASTORE.currentStep}]:checked`).val();

        if (inputtedAnswer !== undefined) {

            let selectedAnswer = QUESTIONSTORE[USERDATASTORE.currentStep - 1].possibleAnswers.find(item => item.id === inputtedAnswer);

            console.log("selectedAnswer is: ", selectedAnswer);

            if (selectedAnswer !== undefined) {

                let basicAnswerRevealText = ""; 

                if (selectedAnswer.number === QUESTIONSTORE[USERDATASTORE.currentStep - 1].correctAnswerNumber) {

                    basicAnswerRevealText = "Correct!";

                    console.log("Correct answer!");

                    USERDATASTORE.correctScore++; 

                } else { 

                    basicAnswerRevealText = "Incorrect!";

                    console.log("Incorrect answer!");

                    USERDATASTORE.incorrectScore++; 
                }

                renderQuizHeaderElements();

                $(event.currentTarget).hide();

                const isEndOfQuiz = USERDATASTORE.currentStep === QUESTIONSTORE.length;

                const endQuizHtml = `
                    <div class="answer-revealer">
                        <p><b>${basicAnswerRevealText}</b> ${selectedAnswer.answerGuessedResponseHtml}</p>
                        <p>And that's a wrap, folks! You scored ${USERDATASTORE.correctScore} out of ${QUESTIONSTORE.length}.</p>
                        <button id='start-over' role='button'>Start again</button>
                    </div>            
                `;

                const revealAnswerHtml = `
                    <div class="answer-revealer">
                        <p><b>${basicAnswerRevealText}</b> ${selectedAnswer.answerGuessedResponseHtml}</p>
                        <button id='next-question' role='button'>Proceed to Next Question</button>
                    <div>
                `;

                const bottomNavBarHtml = isEndOfQuiz ? endQuizHtml : revealAnswerHtml;

                $('.bottom-nav-bar').addClass('bottom-nav-bar--reveal-mode').append(bottomNavBarHtml);
            }

            else {
                console.log("Something went wrong: the selected answer does not exist in the database store");
            }

        } else {

            console.log("Nothing was chosen before the user clicked the submit button");

        } 
    });
}

function nextQuestion() {
    $('.bottom-nav-bar').on('click', '#next-question', function(event) {
        console.log('clicked #next-question');
        
        event.preventDefault();

        const isEndOfQuiz = (USERDATASTORE.currentStep === QUESTIONSTORE.length);

        if (!isEndOfQuiz) {
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
    submitAnswer();
    nextQuestion();
    startOver();
}

$(runApp);