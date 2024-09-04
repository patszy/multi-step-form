console.log("Hello World!");

let cards = document.getElementsByClassName(`card`);
let nextBtn = document.getElementById(`next`);
let prevBtn = document.getElementById(`prev`);
let currentCard = [...cards].filter(card => card.classList.contains(`card--active`))[0];
let currentStep = [...cards].indexOf(currentCard);

let getCurrentCard = (cards) => cards.filter(card => card.classList.contains(`card--active`))[0];
let removeClass = (card, name) => card.classList.remove(name);
let addClass = (card, name) => card.classList.add(name);

nextBtn.addEventListener(`click`, () => {
  currentCard = getCurrentCard([...cards]);
  removeClass(currentCard, `card--active`);
  addClass(cards[++currentStep], `card--active`);
});

prevBtn.addEventListener(`click`, () => {
  currentCard = getCurrentCard([...cards]);
  removeClass(currentCard, `card--active`);
  addClass(cards[--currentStep], `card--active`);
});