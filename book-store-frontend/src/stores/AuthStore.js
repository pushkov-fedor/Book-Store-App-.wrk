import { action, observable } from "mobx";

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
