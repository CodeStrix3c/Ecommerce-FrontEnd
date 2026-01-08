import { getItemFromLocalStorage } from "./localStorage";

const token = getItemFromLocalStorage("token");
const isAuthenticated = Boolean(token);
export const requireLogin = (action, showLoginPopup) => {
  if (!isAuthenticated) {
    showLoginPopup();
    return;
  }
  action();
};
