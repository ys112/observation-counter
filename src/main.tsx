import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";
import "./index.css";

// Create Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

// Mount the React app
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
