import Cookies from "js-cookie";

const AUTH_STATE_CHANGE_EVENT = "auth-state-change";

export function subscribeToAuthState(onChange: () => void) {
  window.addEventListener(AUTH_STATE_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(AUTH_STATE_CHANGE_EVENT, onChange);
}

export function getAuthState() {
  return Boolean(Cookies.get("token"));
}

export function getServerAuthState() {
  return false;
}

export function notifyAuthStateChanged() {
  window.dispatchEvent(new Event(AUTH_STATE_CHANGE_EVENT));
}
