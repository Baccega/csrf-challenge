import apiCall, { rawApiCall } from "./apiCall";
import { Message, Login } from "@csrf-challenge/common";

export function sendMessageApi(message: Message) {
  return apiCall("POST /chat", { params: {}, body: message });
}

export async function loginApi(loginData: Login) {
  return apiCall("POST /login", { params: {}, body: loginData });
}

export async function logoutApi() {
  return rawApiCall("POST /logout", { params: {}, body: {} });
}

// try {
//   const response = await fetch("/api/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(loginData),
//     });
//     const text = await response.text();
//     return text === "Auth complete";
//   } catch (e) {
//     console.error(e.message);
//     return false;
//   }
// }

// export async function logout() {}
//   try {
//     const response = await fetch("/api/logout", {
//       method: "POST",
//     });
//     const text = await response.text();
//     return text === "Logout complete";
//   } catch (e) {
//     console.error(e.message);
//     return false;
//   }
// }
