import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline, createMuiTheme } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import amber from "@material-ui/core/colors/amber";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: red.A200 },
    secondary: { main: amber.A700 },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
