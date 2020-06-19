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
        await loginApi(loginFormData);
        if (Boolean(cookie.load("sessionToken"))) {
          setAuthenticated(true);
        }
      } catch (e) {
        console.error(e);
        setAuthenticated(false);
      }
    },
    [setAuthenticated]
  );
  const handleLogout = React.useCallback(async () => {
    try {
      await logoutApi();
      cookie.remove("sessionToken");
    } catch (e) {
      console.error(e);
    }
  }, []);

  return {
    authenticated,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };
}
