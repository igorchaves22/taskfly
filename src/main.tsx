import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { VITE_ROOT_ELEMENT_ID } from "~utils";
import { App } from "./App";

createRoot(VITE_ROOT_ELEMENT_ID!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
