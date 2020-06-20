import React from "react";
import cookie from "react-cookies";
import { loginApi, logoutApi } from "./api/endpoints";
import { Login } from "@csrf-challenge/common/src";

export function useUserAuthentication(): any {
  const sessionToken = cookie.load("sessionToken");
  const [authenticated, setAuthenticated] = React.useState<boolean>(
    Boolean(sessionToken)
  );

  const handleLogin = React.useCallback(
    async (loginFormData: Login) => {
      try {
        cookie.remove("sessionToken");
        const result = await loginApi(loginFormData);
        if (result.status === "ok") {
          setAuthenticated(true);
          return true;
        }
      } catch (e) {
        console.error(e);
        setAuthenticated(false);
        return false;
      }
    },
    [setAuthenticated]
  );
  const handleLogout = React.useCallback(async () => {
    try {
      await logoutApi();
    } catch (e) {
      console.error(e);
    }
    cookie.remove("sessionToken");
  }, []);

  return {
    authenticated,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };
}
