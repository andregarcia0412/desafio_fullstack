import React from "react";
import api from "../../services/api";
import { useSearchParams } from "react-router-dom";
import "./style.css";
import Button from "../../components/button/Button";
import ViewPasswordButton from "../../components/view-password/ViewPasswordButton";

const ResetPassword = ({}) => {
  const passwordInput = React.useRef();
  const confirmPasswordInput = React.useRef();
  const [searchParams] = useSearchParams();
  const [resultText, setResultText] = React.useState("");
  const [hiddenPassword, setHiddenPassword] = React.useState(true);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] =
    React.useState(true);
  const [success, setSuccess] = React.useState(false);

  async function resetPassword() {
    const token = searchParams.get("token");
    if (!token) {
      setSuccess(false);
      setResultText("Invalid link");
      return;
    }

    const result = validateFields();
    if (!result.ok) {
      setSuccess(false);
      setResultText(result.message);
      return;
    }

    try {
      const response = await api.patch("/auth/reset-password", {
        newPassword: passwordInput.current.value.trim(),
        resetToken: token,
      });
      setResultText("Password reseted, redirecting to authentication page...");
      setSuccess(true);

      setTimeout(() => {
        window.location.href="/auth"
      }, 1500)
    } catch (e) {
      setResultText(e.response.data.message);
      setSuccess(false);
    }
  }

  function validateFields() {
    const password = passwordInput.current.value.trim();
    const confirmPassword = confirmPasswordInput.current.value.trim();

    if (!password) {
      return { ok: false, message: "Password is required" };
    }

    if (password.length < 8) {
      return {
        ok: false,
        message: "Your password must be at least 8 characters",
      };
    }

    if (password !== confirmPassword) {
      return {
        ok: false,
        message: "The passwords don't match",
      };
    }

    return { ok: true };
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h1>Password reset</h1>
        <div className="password-container" style={{ width: "100%" }}>
          <input
            placeholder="New password"
            type={!hiddenPassword ? "text" : "password"}
            ref={passwordInput}
          />
          <ViewPasswordButton
            isVisible={hiddenPassword}
            setVisible={setHiddenPassword}
          />
        </div>

        <div className="password-container" style={{ width: "100%" }}>
          <input
            placeholder="Confirm new password"
            type={!hiddenConfirmPassword ? "text" : "password"}
            ref={confirmPasswordInput}
          />
          <ViewPasswordButton
            isVisible={hiddenConfirmPassword}
            setVisible={setHiddenConfirmPassword}
          />
        </div>
        <Button
          text={"Send"}
          width={"100%"}
          fontSize={18}
          onClick={resetPassword}
        />
        <p style={{ color: success ? "#4BB543" : "#FF0033" }}>{resultText}</p>
      </div>
    </div>
  );
};

export default ResetPassword;
