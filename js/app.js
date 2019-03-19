// Focus
// 1. Set Focus on Name on load.
const nameInput = document.getElementById('name');
nameInput.focus();


// Job Role
// 1. Reveal the "Other" text field when the user selects other in the Job Role dropdown menu.
const otherInput = document.getElementById('otherInputDiv');
const jobSelection = document.getElementById('title');
otherInput.style.display = "none";

jobSelection.addEventListener('change', () => {
  for (i=0; i<jobSelection.children.length; i++) {
    const jobSelected = event.target.children[i];
    if (jobSelected.selected === true) {
      if (jobSelected.value === 'other') {
        otherInput.style.display = "block";
      } else {otherInput.style.display = "none"}
    };
  }
})


// Tshirt
// 1. Color dropdown is hidden until user selects Design (exceed expectations).
// 2. Color options are revealed depending on the Design.
const designInput = document.getElementById('design');
const colorInput = document.getElementById('color');
colorInput.style.display = "none";


designInput.addEventListener('change', () => {
  for (i=0; i<designInput.children.length; i++) {
    const theDesign = event.target.children[i];
    if (theDesign.selected === true) {
      if (theDesign.value === "js puns") {
        colorInput.style.display = "block";
        colorInput.innerHTML = '<option value="cornflowerblue">Cornflower Blue</option><option value="darkslategrey">Dark Slate Grey</option><option value="gold">Gold</option>'
      } else if (theDesign.value === "heart js") {
        colorInput.style.display = "block";
        colorInput.innerHTML = '<option value="tomato">Tomato</option><option value="steelblue">Steel Blue</option><option value="dimgrey">Dim Grey</option>'
      }
       else {
         colorInput.style.display = "none";
       }
    }
  }
})


// Activities
// 1. Don't allow selection of conficting events.
// 2. Add the total cost of the activities.
const activitiesInput = document.querySelector('.activities');
const activitiesInputList = document.querySelectorAll('.activities label');
const totalPriceDiv = document.createElement('div');
const totalPrice = document.createElement('span');
activitiesInput.appendChild(totalPriceDiv)
totalPriceDiv.appendChild(totalPrice);
let thePrice = 0;

//This is the function that is going to be called to add or remove from the price:
function addNumber(number) {
  thePrice += number;
  if (thePrice !== 0) {
    totalPrice.innerHTML = '<strong> $' + thePrice + '<strong>';
  } else {
    totalPrice.textContent = "";
  }
}

activitiesInput.addEventListener('change', () => {
  if (event.target.checked === true) {
    const theParent = event.target.parentNode;
    theParent.id = "theChecked";
// This here disables activities with conficting dates:
    for (i=1; i<=activitiesInputList.length; i++) {
      if ((theParent.className) && ((theParent.parentNode.children[i].id === "") && (theParent.parentNode.children[i].className === theParent.className))) {
       const theDisabled = theParent.parentNode.children[i];
        theDisabled.childNodes[0].disabled = true;
        theDisabled.style.color = 'grey';
      }
    }
//This here adds to the total price once the user selects something:
    if (event.target.name === 'all') {
      addNumber(200);
    } else {
      addNumber(100);
    }
  } else {
    const theParent = event.target.parentNode;
    theParent.id = "";
// This here enables activities that were disabled once the user removes his conficting selection
    for (i=1; i<=activitiesInputList.length; i++) {
      if ((theParent.parentNode.children[i].childNodes[0].disabled === true) && (theParent.parentNode.children[i].className === theParent.className)) {
        const theDisabled = theParent.parentNode.children[i];
        theDisabled.childNodes[0].disabled = false;
        theDisabled.style.color = '';
      }
    }
//This here substracts the total price once the user removes a selection:
    if (event.target.name === 'all') {
      addNumber(-200);
    } else {
      addNumber(-100);
    }
  }
});


// Payment
// 1. Displays the Payment options based on the user selection.
const paymentInput = document.getElementById('payment');
const creditInput = document.getElementById('credit-card');
const paypalInput = document.getElementById('paypal');
const bitcoinInput = document.getElementById('bitcoin');
const selectionPayment = paymentInput.childNodes[1];
creditInput.style.display = "none";
paypalInput.style.display = "none";
bitcoinInput.style.display = "none";

paymentInput.addEventListener('change', () => {
  selectionPayment.disabled = 'true';
  if (event.target.value === 'credit card') {
    creditInput.style.display = "block";
    paypalInput.style.display = "none";
    bitcoinInput.style.display = "none";
  } else if (event.target.value === 'paypal') {
    creditInput.style.display = "none";
    paypalInput.style.display = "block";
    bitcoinInput.style.display = "none";
  } else {
    creditInput.style.display = "none";
    paypalInput.style.display = "none";
    bitcoinInput.style.display = "block";
  }
})


// Form Validation
//1. Checks that: the name input, the email input, the credit card input and the other input if displayed are not empty.
//2. Checks that email input contains validly formated email.
//3. Checks that the user has selected at least one activity.
//4. That the CC number is between 13-16 numbers long, that the zip is 5 numbers long and that the CVV is 3 numbers long.
//5. Displays a message based on each error (exceeds expectations).
const theForm = document.querySelector('form');
const submitButton = theForm.querySelector('button');
const emailInput = theForm.querySelector('#mail');
const zipInput = theForm.querySelector('#zip');
const cvvInput = theForm.querySelector('#cvv');
const ccInput = theForm.querySelector('#cc-num');
const ccLabel = document.getElementById('cc-label');
const zipLabel = document.getElementById('zip-label');
const cvvLabel = document.getElementById('cvv-label');
const mailLabel = document.getElementById('mail-label');
const alert = document.createElement('span');
const alert2 = document.createElement('span');
const alert3 = document.createElement('span');
const alert4 = document.createElement('span');

//Function used in the activities conditional in the event listener:
function checkActivities() {
  let theChecked = 0;
  for (i=0; i<activitiesInputList.length; i++) {
    if (activitiesInputList[i].children[0].checked === true) {
      theChecked += 1;
    }
  }
  if (theChecked ===0) {
    return true;
  } else {
    return false;
  }
}

//Functions used to remove or add messages:
function appendRemoveChild(theLabel, theSpan) {
  if (theLabel.children[0] !== theSpan) {
    theLabel.appendChild(theSpan);
  }
}
function onlyRemove(theLabel, theSpan) {
  if (theLabel.children[0] === theSpan) {
    theLabel.removeChild(theSpan);
  }
}

//Function used to check the payment inputs and email:
function checkingInputs(theActualInput, thePlaceholderText, theLabel, theAlert, thePlaceholderText, firstCheckFunction, secondCheckFunction) {
  if (firstCheckFunction) {
    event.preventDefault();
    theActualInput.style.borderColor = 'red';
    theActualInput.placeholder = thePlaceholderText;
    onlyRemove(theLabel, theAlert);
  } else if (secondCheckFunction) {
    event.preventDefault();
    theActualInput.style.borderColor = 'red';
    theActualInput.placeholder = '';
    theAlert.textContent = thePlaceholderText;
    theAlert.style.color = 'red';
    appendRemoveChild(theLabel, theAlert);
  } else {
    theActualInput.style.borderColor = '';
    theActualInput.placeholder = '';
    onlyRemove(theLabel, theAlert);
  }
}
//Functions used to check the validity of user input depending on the input:
function checkTheZipcode2() {
  if ((creditInput.style.display === "block") && ((zipInput.value.length!==5) || (isNaN(zipInput.value)))){
    return true;
  }
}
function checkTheCVV2() {
  if ((creditInput.style.display === "block") && ((cvvInput.value.length!==3) || (isNaN(zipInput.value)))){
    return true;
  }
}
function checkTheCC2() {
  if ((creditInput.style.display === "block") && (((ccInput.value.length>16) || (ccInput.value.length<13)) || (isNaN(zipInput.value)))){
    return true;
  }
}
function checkTheEmail2() {
  if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput.value))){
    return true;
  }
}

function checkIfEmpty2(theActualInput) {
  if ((creditInput.style.display === "block") && (theActualInput.value === "")){
    return true;
  }
}
function checkTheEmail() {
  if (emailInput.value === ""){
    return true;
  }
}

//Submit button event listener:
submitButton.addEventListener('click', () => {
////Checking the Name input:
  if (nameInput.value === "") {
    event.preventDefault();
    nameInput.style.borderColor = 'red';
    nameInput.placeholder = 'You have to add a Name!'
  } else {
    nameInput.style.borderColor = '';
    nameInput.placeholder = '';
  }
////Checking the Activities Input:
  if (checkActivities()) {
    event.preventDefault();
    activitiesInput.children[0].style.color = 'red';
    activitiesInput.children[0].textContent = 'Register for Activities (Add an Activity!)';
  } else {
    activitiesInput.children[0].style.color = '#184f68';
  }
  ////Checking the payment menu:
  if (paymentInput.children[0].selected === true) {
    event.preventDefault();
    paymentInput.style.borderColor = 'red';
  } else {
    paymentInput.style.borderColor = '';
  }
////Checking the payment inputs and email using functions:
  checkingInputs(zipInput, 'Add your Zipcode!', zipLabel, alert2, ' Not a Zipcode!', checkIfEmpty2(zipInput), checkTheZipcode2());
  checkingInputs(cvvInput, 'Add your CVV!', cvvLabel, alert3, ' Not a CVV!', checkIfEmpty2(cvvInput), checkTheCVV2());
  checkingInputs(ccInput, 'Add your Credit Card Number!', ccLabel, alert, ' This is Not a valid Number!', checkIfEmpty2(ccInput), checkTheCC2());
  checkingInputs(emailInput, 'You have to add an Email!', mailLabel, alert4, ' Not an Email!', checkTheEmail(), checkTheEmail2());
});

//One event listener on keyup (exceeds expectations):
emailInput.addEventListener('keyup', () => {
  checkingInputs(emailInput, 'You have to add an Email!', mailLabel, alert4, ' Not an Email!', checkTheEmail(), checkTheEmail2());
})
