import React from "react";
import cookie from "react-cookies";
import { loginApi, logoutApi } from "./api/endpoints";
import { LoginResponse } from "@csrf-challenge/common/src/Login";
import { Login } from "@csrf-challenge/common/dist";
import { ResponseStatus } from "@csrf-challenge/common/dist/Endpoints";

export function useUserAuthentication(): any {
  const sessionToken = cookie.load("sessionToken");
  const [authenticated, setAuthenticated] = React.useState<boolean>(
    Boolean(sessionToken)
  );

  const handleLogin = React.useCallback(
    async (loginFormData: Login) => {
      try {
        cookie.remove("sessionToken");
        const result: ResponseStatus<LoginResponse> = await loginApi(
          loginFormData
        );
        const data = result.data;
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
