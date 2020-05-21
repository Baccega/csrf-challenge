function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export function isUserAuthenticated() {
  const sessionID = getCookie("sessionID");
  return Boolean(sessionID);
}

export async function login(loginData) {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const text = await response.text();
    return text === "Auth complete";
  } catch (e) {
    console.error(e.message);
    return false;
  }
}
