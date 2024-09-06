const multistepForm = document.querySelector(`[data-multistep-form]`);
const formCards = [...multistepForm.querySelectorAll(`[data-step]`)];
const stepPoints = [...document.querySelectorAll(`[data-step-point]`)];
const formBtns = [...document.querySelectorAll(`[data-btn-prev], [data-btn-next]`)];

let currentCard = formCards.findIndex(step => step.classList.contains(`card--active`));

// Set up card and step point
const showCurrentCard = () => {
  formCards.forEach((card, index) => card.classList.toggle(`card--active`, index === currentCard));
  stepPoints.forEach((stepPoint, index) => stepPoint.classList.toggle(`multistep-header__elem--active`, index === currentCard));
}

const toggleBtn = (btn, hide = true) => {
  btn?.classList.toggle(`multistep__button--hide`, hide);
}

const updateButtonStates = () => {
  // Handle specific button visibility and labels for first and last step
  formBtns[1].textContent = (currentCard === formCards.length - 1) ? `submit` : `next`;
  currentCard === 0 ? toggleBtn(formBtns[0]) : toggleBtn(formBtns[0], false);
}

// Set up first card state
if(currentCard < 0) {
  formCards[currentCard = 0]?.classList.add(`card--active`);
  stepPoints[currentCard]?.classList.add(`multistep-header__elem--active`);
  toggleBtn(formBtns[0]);
}

multistepForm.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  // Listen event only if button is pressed
  if(!e.target.matches(`[data-btn-prev], [data-btn-next]`)) return;

  // Switch direction: backwards (-1) or forwards (+1)
  const increment = e.target.hasAttribute(`data-btn-next`) ? 1 : -1;

  // Validate inpust before proceeding
  const inputs = [...formCards[currentCard]?.querySelectorAll(`input`)];
  if (!inputs.every(input => input.reportValidity())) return;

  // Submit form
  if(e.target.matches(`[data-btn-next]`) && currentCard === formCards.length - 1) multistepForm.submit();

  // Update currentCard with bounds checking
  currentCard = Math.min(Math.max(currentCard + increment, 0), formCards.length - 1);

  // Update the form's visible card
  showCurrentCard();

  // Toggle button states based on currentCard position
  updateButtonStates();
});