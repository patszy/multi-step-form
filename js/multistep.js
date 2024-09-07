const multistepForm = document.querySelector(`[data-multistep-form]`);
const formCards = [...multistepForm.querySelectorAll(`[data-step]`)];
const stepPoints = [...document.querySelectorAll(`[data-step-point]`)];
const formBtns = [...document.querySelectorAll(`[data-btn-prev], [data-btn-next]`)];

let currentCard = formCards.findIndex(step => step.classList.contains(`card--active`));

// Initialize form state
const initForm = () => {
  if(currentCard < 0) currentCard = 0;
  updateFormState();
}

// Update card, step point visibility, buttons
const updateFormState = () => {
  formCards.forEach((card, index) => card.classList.toggle('card--active', index === currentCard));
  stepPoints.forEach((stepPoint, index) => stepPoint.classList.toggle('multistep-header__elem--active', index === currentCard));
  updateButtonStates();
};

// Update button states based on the current card
const updateButtonStates = () => {
  const isFirstCard = currentCard === 0;
  const isLastCard = currentCard === formCards.length - 1;
  
  formBtns[0]?.classList.toggle('multistep__button--hide', isFirstCard);
  formBtns[1].textContent = isLastCard ? 'submit' : 'next';
}

multistepForm.addEventListener('click', (e) => {
  if(e.target.matches(`[data-btn-prev], [data-btn-next]`)) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Listen event only if button is pressed
  if(!e.target.matches(`[data-btn-prev], [data-btn-next]`)) return;

  // Switch direction: backwards (-1) or forwards (+1)
  const increment = e.target.hasAttribute(`data-btn-next`) ? 1 : -1;

  // Validate inpust before proceeding
  const inputs = [...formCards[currentCard]?.querySelectorAll(`input`)];
  if(!inputs.every(input => input.reportValidity())) return;

  // Submit form
  if (e.target.matches(`[data-btn-next]`) && currentCard === formCards.length - 1) {
    multistepForm.submit();
    return;
  }

  // Update currentCard with bounds checking
  currentCard = Math.min(Math.max(currentCard + increment, 0), formCards.length - 1);

  updateFormState();
});

initForm();