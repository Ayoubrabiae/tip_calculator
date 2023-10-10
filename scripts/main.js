const billInp = document.querySelector('#bill');
const percentSelectors = document.querySelectorAll('.tip-percent');
const customPercentSelector = document.querySelector('.custom-tip-percent');
const peopleNumberInp = document.querySelector('#people-number-input');
const tipAmountArea = document.querySelector('.tip-amount .number');
const totalArea = document.querySelector('.total .number');
const resetBtn = document.querySelector('.reset-btn');

const calculateTip = () => {
  const bill = parseFloat(billInp.value);
  const percent = parseFloat(document.querySelector('.percents .active').dataset.percent);
  const peopleNumber = parseFloat(peopleNumberInp.value);
  const tipAmount = ((bill / 100) * percent) / peopleNumber;
  const total = (bill + (bill / 100) * percent) / peopleNumber;

  totalArea.textContent = `$${Number(total).toFixed(2)}`;
  tipAmountArea.textContent = `$${Number(tipAmount).toFixed(2)}`;
};

const isInputsValid = () => {
  const condition = billInp.value !== '' && peopleNumberInp.value !== '' && customPercentSelector.parentElement.querySelector('.active');
  if (condition) {
    calculateTip();
    resetBtn.classList.add('active');
  } else {
    resetBtn.classList.remove('active');
  }
};

const fixInvalidInput = (e) => {
  if (e.currentTarget.value <= 0) e.currentTarget.value = '';
  if (e.currentTarget.classList.contains('custom-tip-percent')) {
    if (e.currentTarget.value >= 100) e.currentTarget.value = '';
  }
};

const isError = (e) => {
  if (!(e.currentTarget.classList.contains('custom-tip-percent'))) {
    if (e.currentTarget.value === '') {
      e.currentTarget.parentElement.parentElement.classList.add('error');
    } else {
      e.currentTarget.parentElement.parentElement.classList.remove('error');
    }
  }
};

[billInp, customPercentSelector, peopleNumberInp].forEach((e) => e.addEventListener('input', (el) => {
  fixInvalidInput(el);
  isInputsValid();
  isError(el);
}));

const activateSelector = (e) => {
  if (e.currentTarget.parentElement.querySelector('.active')) {
    customPercentSelector.parentElement.querySelector('.active').classList.remove('active');
  }
  e.currentTarget.classList.add('active');
};

percentSelectors.forEach((e) => e.addEventListener('click', (el) => {
  activateSelector(el);
  isInputsValid();
}));

customPercentSelector.addEventListener('blur', (e) => {
  if (e.currentTarget.value < 100 && e.currentTarget.value > 0) {
    activateSelector(e);
    e.currentTarget.dataset.percent = e.currentTarget.value;
    isInputsValid();
  } else {
    e.currentTarget.classList.remove('active');
  }
});

const reset = () => {
  if (resetBtn.classList.contains('active')) {
    billInp.value = '';
    customPercentSelector.value = '';
    peopleNumberInp.value = '';
    if (document.querySelector('.percents .active')) {
      document.querySelector('.percents .active').classList.remove('active');
    }
    tipAmountArea.textContent = '$0.00';
    totalArea.textContent = '$0.00';
    resetBtn.classList.remove('active');
  }
};

resetBtn.addEventListener('click', reset);
