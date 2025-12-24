import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";

// Clerk publishable key - safe to include in client code
const PUBLISHABLE_KEY = "pk_test_ZGVzdGluZWQtamF3ZmlzaC02OC5jbGVyay5hY2NvdW50cy5kZXYk";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </StrictMode>
);
