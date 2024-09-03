console.log("Hello World!");

let cards = document.getElementsByClassName(`card`);
let nextBtn = document.getElementById(`next`);
let prevBtn = document.getElementById(`prev`);
let currentCard = [...cards].filter(card => card.classList.contains(`card--active`))[0];
let currentStep = [...cards].indexOf(currentCard);

nextBtn.addEventListener(`click`, () => {
  currentCard = [...cards].filter(card => card.classList.contains(`card--active`))[0];
  currentCard.classList.remove(`card--active`);
  cards[++currentStep].classList.add(`card--active`);
});

prevBtn.addEventListener(`click`, () => {
  currentCard = [...cards].filter(card => card.classList.contains(`card--active`))[0];
  currentCard.classList.remove(`card--active`);
  cards[--currentStep].classList.add(`card--active`);
});