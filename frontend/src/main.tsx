import { Provider } from "@/components/ui/provider"
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <Provider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
  </StrictMode>
);
