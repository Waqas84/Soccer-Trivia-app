function getStarted() {
  $("#start").on("click", function() {
    renderAQuestion();
  });
}

function updateQuestionAndScore() {
  const html = $(`<ul>
      <li id="js-answered">Questions Number: ${STORE.currentQuestion + 1}/${
    STORE.questions.length
  }</li>
      <li id="js-score">Score: ${STORE.score}/${STORE.questions.length}</li>
    </ul>`);
  $(".question-and-score").html(html);
}

function updateOptions() {
  let question = STORE.questions[STORE.currentQuestion];
  for (let i = 0; i < question.options.length; i++) {
    $(".js-options").append(`
        <input type = "radio" name="options" id="option${i + 1}" value= "${
      question.options[i]
    }" tabindex ="${i + 1}"> 
        <label for="option${i + 1}"> ${question.options[i]}</label> <br/>
        <span id="js-r${i + 1}"></span>
    `);
  }
}

function renderAQuestion() {
  let question = STORE.questions[STORE.currentQuestion];
  updateQuestionAndScore();
  const questionHtml = $(`
  <div>
    <form id="js-questions" class="question-form">
      <fieldset>
        <div class="row question">
          <div class="col-12">
            <legend> ${question.question}</legend>
          </div>
        </div>

        <div class="row options">
          <div class="col-12">
            <div class="js-options"> </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <button type = "submit" id="answer" tabindex="5">Submit</button>
          <button type = "button" id="next-question" tabindex="6"> Next >></button>
        </div>
      </div>
    </fieldset>
    </form>
  </div>`);
  $("main").html(questionHtml);
  updateOptions();
  $("#next-question").hide();
}

function displayResults() {
  let resultHtml = $(
    `<div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div class="row">
            <div class="col-12">
              <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <button type="button" id="restart"> Restart Quiz </button>
            </div>
          </div>
        </fieldset>
    </form>
    </div>`
  );
  STORE.currentQuestion = 0;
  STORE.score = 0;
  $("main").html(resultHtml);
}

function handleQuestions() {
  $("body").on("click", "#next-question", function() {
    STORE.currentQuestion === STORE.questions.length
      ? displayResults()
      : renderAQuestion();
  });
}


function handleSelectOption() {
  $("body").on("submit", "#js-questions", function(event) {
    event.preventDefault();
    let currentQues = STORE.questions[STORE.currentQuestion];
    let selectedOption = $("input[name=options]:checked").val();
    if (!selectedOption) {
      alert("Choose an option");
      return;
    }
    let id_num = currentQues.options.findIndex(i => i === selectedOption);
    let id = "#js-r" + ++id_num;
    $("span").removeClass("right-answer wrong-answer");
    if (selectedOption === currentQues.answer) {
      STORE.score++;
      $(`${id}`).append(`You got it right<br/>`);
      $(`${id}`).addClass("right-answer");
    } else {
      $(`${id}`).append(
        `You got it wrong <br/> The answer is "${currentQues.answer}"<br/>`
      );
      $(`${id}`).addClass("wrong-answer");
    }

    STORE.currentQuestion++;
    $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
    $("#answer").hide();
    $("input[type=radio]").attr("disabled", true);
    $("#next-question").show();
  });
}

function restartApp() {
  $("body").on("click", "#restart", event => {
    renderAQuestion();
  });
}

function handleQuizApp() {
  getStarted();
  handleQuestions();
  handleSelectOption();
  restartApp();
}

$(handleQuizApp);
