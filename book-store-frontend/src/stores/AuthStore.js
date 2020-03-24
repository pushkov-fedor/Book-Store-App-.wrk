import { action, observable } from "mobx";

const username = observable.box("");
const setUsername = action(name => username.set(name));

const password = observable.box("");
const setPassword = action(pass => password.set(pass));

const email = observable.box("");
const setEmail = action(em => email.set(em));

const showAuthPopup = observable.box(false);

const toggleShowAuthPopup = action(event => {
  if (event === undefined || event.target.id === "auth-bg") {
    showAuthPopup.set(!showAuthPopup.get());
  }
});

export const authStore = {
  showAuthPopup,
  toggleShowAuthPopup
};
