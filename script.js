let text = document.querySelector("#text");
let answers = document.querySelector("#answers");
let answerBtn = document.querySelector("#answerBtn");
let nextBtn = document.querySelector("#nextBtn");
let answerText = document.querySelector("#answerText");
let corrent = document.querySelector("#corrent");
let total = document.querySelector("#total");

class Quiz {
  constructor(questions) {
    this.index = 0;
    this.questions = questions;
    this.question = "";
  }
  start() {
    const question = this.questions[this.index];
    this.question = question;
    
    corrent.innerText = this.index + 1;

    answers.innerHTML = "";
    Object.keys(question.answers).forEach(key => {
      answers.innerHTML += `<label class="flex items-cneter space-x-1">
  <input class='mt-[2px]' type="radio" name="answer" value="${key}">
    <span>${key.toUpperCase() + ":"}</span>
    <span> ${question.answers[key]} </span>
  </label>`;
      //   console.log(question.answers[key]);
    });

    text.innerHTML = question.text;
  }

  cavapTap(correct) {
    return this.question.correct === correct;
  }

  nextQuestion() {
    this.index += 1;
    this.start();
  }
}

const quiz = new Quiz(questions);
quiz.start();

total.innerText = questions.length;

answerBtn.addEventListener("click", () => {
  answers.querySelectorAll("input").forEach(input => {
    input.disabled = true;
    if (input.checked) {
      const answer = input.value;
      let quizAnswer = quiz.cavapTap(answer);

      answerText.classList.remove("hidden");
      if (quizAnswer) {
        answerText.classList.remove("bg-red-500")
        answerText.classList.add("bg-green-500")
        answerText.innerText = "tebrikler duz cavab verdiniz";
      } else {
        answerText.classList.remove("bg-green-500")
        answerText.classList.add("bg-red-500")
        answerText.innerText = `sef cavab verdiniz. duzgun cavab: ${quiz.question.correct}`;
      }
      nextBtn.classList.remove("hidden");
      answerBtn.classList.add("hidden");
    }
  });
});

nextBtn.addEventListener("click", function () {
  quiz.nextQuestion();
  nextBtn.classList.add("hidden");
  answerBtn.classList.remove("hidden");
  answerText.innerText = "";
  answerText.classList.add("hidden");
});
