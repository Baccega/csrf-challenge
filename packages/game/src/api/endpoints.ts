import apiCall from "./apiCall";
import { Message } from "@csrf-challenge/common";

export function sendMessageApi(message: Message) {
  return apiCall("POST /chat", { params: {}, body: message });
}
