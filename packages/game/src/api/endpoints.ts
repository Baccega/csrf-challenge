import apiCall, { rawApiCall } from "./apiCall";
import { Message, Login } from "@csrf-challenge/common";

export function sendItemApi(to: string, position: number) {
  return apiCall("POST /send", { params: {}, body: { to, position } });
}

export function sendMessageApi(message: Message) {
  return apiCall("POST /chat", { params: {}, body: message });
}

export async function loginApi(loginData: Login) {
  return apiCall("POST /login", { params: {}, body: loginData });
}

export async function logoutApi() {
  return rawApiCall("POST /logout", { params: {}, body: {} });
}
