"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import VerifyEmailForm from "@/components/auth/VerifyEmailForm";

export default function AuthPage() {
  const [formType, setFormType] = useState<
    "login" | "register" | "forgot" | "reset" | "verify"
  >("login");
  const [tenantSlug, setTenantSlug] = useState<string>("");

  const renderForm = () => {
    switch (formType) {
      case "login":
        return <LoginForm onSwitch={(type) => setFormType(type)} />;
      case "register":
        return <RegisterForm onSwitch={(type) => setFormType(type)} />;
      case "forgot":
        return <ForgotPasswordForm onSwitch={(type) => setFormType(type)} />;
      case "reset":
        return <ResetPasswordForm onSwitch={(type) => setFormType(type)} />;
      case "verify":
        return <VerifyEmailForm onSwitch={(type) => setFormType(type)} />;
      default:
        return <LoginForm onSwitch={(type) => setFormType(type)} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
      <AuthCard>
        <div className="mb-6">
          <label htmlFor="tenantSlug" className="auth-label">
            اسم صالة الجيم (Slug)
          </label>
          <input
            id="tenantSlug"
            type="text"
            value={tenantSlug}
            onChange={(e) => setTenantSlug(e.target.value)}
            className="auth-input"
            aria-label="اسم صالة الجيم"
            placeholder="مثال: fitflow"
            onBlur={() => {
              if (tenantSlug) {
                document.cookie = `tenant=${tenantSlug}; path=/; sameSite=lax`;
              }
            }}
          />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={formType}
            initial={{
              opacity: 0,
              x: formType === "login" || formType === "forgot" ? 50 : -50,
            }}
            animate={{ opacity: 1, x: 0 }}
            exit={{
              opacity: 0,
              x: formType === "login" || formType === "forgot" ? -50 : 50,
            }}
            transition={{ duration: 0.3 }}
          >
            {renderForm()}
          </motion.div>
        </AnimatePresence>
      </AuthCard>
    </div>
  );
}
