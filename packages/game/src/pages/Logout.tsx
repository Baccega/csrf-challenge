import React from "react";
import { useUserAuthentication } from "../utils";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const rootStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const history = useHistory();
  const { authenticated, onLogout } = useUserAuthentication();

  React.useEffect(() => {
    async function logout() {
      await onLogout();
      history.push("/login");
    }
    logout();
  }, [history, onLogout]);

  return <div style={rootStyle}>Logout</div>;
}
