import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./context/appContext";
import App from "./App";
import "./main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <AppProvider>
      <App />
    </AppProvider>
  </Router>
);
