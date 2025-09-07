

// app/(auth)/login/page.tsx
import { Suspense } from "react";
import LoginPage from "./loginPage";

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
}

