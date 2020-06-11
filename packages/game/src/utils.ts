export function isUserAuthenticated(): Boolean {
  return true;
}

// export async function login(loginData) {
//   try {
//     const response = await fetch("/api/login", {
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

export async function logout() {}
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
