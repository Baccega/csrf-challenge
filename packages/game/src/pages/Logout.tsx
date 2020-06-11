import React from "react";
import { logout } from "../utils";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Logout() {
  const rootStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(["sessionID"]);

  React.useEffect(() => {
    removeCookie("sessionID");
    logout();
    history.push("/login");
  }, [history]);

  return <div style={rootStyle}>Logout</div>;
}
