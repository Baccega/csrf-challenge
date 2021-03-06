import apiCall, { rawApiCall } from "./apiCall";
import { Message, Login } from "@csrf-challenge/common";

export function sendItemApi(
  to: string,
  position: number,
  encodedToken: string
) {
  return apiCall("POST /send", {
    params: {},
    body: { to, position, encodedToken },
  });
}

export function sendMessageApi(message: Message) {
  return apiCall("POST /chat", { params: {}, body: message });
}

export async function loginApi(loginData: Login) {
  return apiCall("POST /login", { params: {}, body: loginData });
}

export async function signUpApi(formData: Login) {
  return apiCall("POST /signup", { params: {}, body: formData });
}

export async function logoutApi() {
  return rawApiCall("POST /logout", { params: {}, body: {} });
}
