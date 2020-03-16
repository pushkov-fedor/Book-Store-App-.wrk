import { action, autorun, observable, toJS } from "mobx";
import { URL } from "../constants/Constants";

const nameOnCard = observable.box("John Doe");
const cardNumber = observable.box("XXXX    XXXX    XXXX    XXXX");
const expirationMonth = observable.box("01");
const expirationYear = observable.box("2024");
const cvv = observable.box("XXX");
const isPaymentInfoValid = observable.box(false);
const customerEmail = observable.box("");

const setNameOnCard = action(name => nameOnCard.set(name));
const setCardNumber = action(number => cardNumber.set(number));
const setExpirationMonth = action(month => expirationMonth.set(month));
const setExpirationYear = action(year => expirationYear.set(year));
const setCVV = action(userCVV => cvv.set(userCVV));

const setCustomerEmail = action(email => customerEmail.set(email));

const sendEmail = books => {
  fetch(`${URL}api/payment/after`, {
    method: "POST",
    body: JSON.stringify({ customerEmail: customerEmail.get(), books: books })
  })
    .then(response => console.log(response))
    .catch(error => console.log(error));
};

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
  sendEmail
};
