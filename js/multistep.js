const multistepForm = document.getElementsByClassName(`multistep__form`)[0];
const formCards = [...multistepForm.getElementsByClassName(`card`)];
let currentCard = formCards.findIndex(step => step.classList.contains(`card--active`));

//If no active card
if(currentCard < 0) formCards[currentCard = 0]?.classList.add(`card--active`);

const showCurrentCard = () => {
  formCards.forEach((card, index) => card.classList.toggle(`card--active`, index === currentCard));
}

multistepForm.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  //Listen event only if press button
  if(!e.target.matches(`#next, #prev`)) return;
  //Switch left or right
  const increment = e.target.id === `next` ? 1 : -1;
  
  const inputs = [...formCards[currentCard]?.querySelectorAll(`input`)];
  if(inputs.every(input => input.reportValidity())) {
    //Limit of switch range
    currentCard = Math.min(Math.max(currentCard + increment, 0), formCards.length - 1);
    showCurrentCard();
  };
});