import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./main.scss";

import App from "./App";
import { AppProvider } from "./context/appContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <AppProvider>
      <App />
    </AppProvider>
  </Router>
);
