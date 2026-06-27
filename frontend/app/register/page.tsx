import type { Metadata } from "next";
import { Suspense } from "react";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Register your interest in HVAC, entrepreneurship, digital marketing, or sales training at Aspiration Cleantech Academy. Our team will contact you with full course details.",
};

export default function RegisterPage() {
  return (
    <main>
      <Suspense fallback={null}>
        <RegisterForm />
      </Suspense>
    </main>
  );
}
