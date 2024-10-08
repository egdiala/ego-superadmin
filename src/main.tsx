import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { Toaster } from "sonner"
import "react-datepicker/dist/react-datepicker.css";
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position="top-right" toastOptions={{ unstyled: true, classNames: { toast: "right-0" } }} pauseWhenPageIsHidden />
    <App />
  </React.StrictMode>,
)
