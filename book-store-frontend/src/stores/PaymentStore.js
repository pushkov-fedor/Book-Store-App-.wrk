import { action, autorun, observable } from "mobx";
import { URL } from "../constants/Constants";
import { CardInfo } from "../enitites/CardInfo";

const nameOnCard = observable.box("John Doe");
const cardNumber = observable.box("XXXX    XXXX    XXXX    XXXX");
const expirationMonth = observable.box("01");
const expirationYear = observable.box("2024");
const cvv = observable.box("XXX");
const customerEmail = observable.box("");
const setCustomerEmail = action(email => customerEmail.set(email));
const setNameOnCard = action(name => nameOnCard.set(name));
const setCardNumber = action(number => cardNumber.set(number));
const setExpirationMonth = action(month => expirationMonth.set(month));
const setExpirationYear = action(year => expirationYear.set(year));
const setCVV = action(userCVV => cvv.set(userCVV));

const isPaymentInfoValid = observable.box(false);
const setIsPaymentInfoValid = action(status => isPaymentInfoValid.set(status));

const showSpinner = observable.box(false);
const setShowSpinner = action(val => showSpinner.set(val));

const showPopup = observable.box(false);
const setShowPopup = action(val => showPopup.set(val));

const showAlert = observable.box(false);
const setShowAlert = action(val => showAlert.set(val));

const sendEmail = books => {
  fetch(`${URL}api/payment/after`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ customerEmail: customerEmail.get(), books: books })
  })
    .then(response => console.log(response))
    .catch(error => console.log(error));
};

function submitPayment() {
  const cardInfo = new CardInfo(
    nameOnCard.get(),
    cardNumber.get(),
    expirationMonth.get(),
    expirationYear.get(),
    cvv.get()
  );
  console.log(cardInfo);
  fetch(`${URL}api/payment/pay`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cardInfo)
  })
    .then(() => {
      setTimeout(() => {
        setIsPaymentInfoValid(true);
        setShowSpinner(false);
        setShowPopup(true);
      }, 2000);
    })
    .catch(error => {
      console.log(error);
      setIsPaymentInfoValid(false);
      setShowSpinner(false);
      setShowAlert(true);
    });
  setShowSpinner(true);
}

autorun(() => {
  let isValid = true;
  if (nameOnCard.length === 0) {
    isValid = false;
  }

  const splittedCardNumber = cardNumber.get().split("    ");
  const reduced = splittedCardNumber.reduce(
    (accumulator, current) => (accumulator += Number(current)),
    0
  );
  if (isNaN(reduced)) isValid = false;
  if (isNaN(Number(cvv))) isValid = false;
  isPaymentInfoValid.set(isValid);
});

export const paymentStore = {
  nameOnCard,
  cardNumber,
  expirationMonth,
  expirationYear,
  cvv,
  isPaymentInfoValid,
  customerEmail,
  setNameOnCard,
  setCardNumber,
  setExpirationMonth,
  setExpirationYear,
  setCVV,
  setCustomerEmail,
  setIsPaymentInfoValid,
  sendEmail,
  submitPayment,
  showSpinner,
  setShowSpinner,
  showPopup,
  setShowPopup,
  showAlert,
  setShowAlert
};
