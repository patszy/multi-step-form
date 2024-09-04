console.log("Hello World!");

const multistepForm = document.getElementsByClassName(`multistep__form`)[0];
const formCards = [...multistepForm.getElementsByClassName(`card`)];
let currentStep = formCards.findIndex(step => step.classList.contains(`card--active`));

if(currentStep < 0) formCards[currentStep = 0].classList.add(`card--active`);

const showCurrentCard = () => {
  formCards.forEach((card, index) => card.classList.toggle(`card--active`, index === currentStep));
}

multistepForm.addEventListener("click", (e) => {
  e.preventDefault();
  let inc;
  if(e.target.matches(`#next`)) inc = 1;
  else if(e.target.matches(`#prev`)) inc = -1;
  else return;

  const inputs = [...formCards[currentStep].querySelectorAll(`input`)];
  const allValid = inputs.every(input => input.reportValidity());

  if(allValid) {
    currentStep += inc;
    showCurrentCard()
  };
});