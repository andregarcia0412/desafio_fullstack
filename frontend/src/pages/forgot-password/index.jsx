import React from "react";
import api from "../../services/api";
import "./style.css";
import Button from "../../components/button/Button";

const ForgotPassword = ({}) => {
  const emailInput = React.useRef();
  const [isLoading, setLoading] = React.useState(false);
  const [resultText, setResultText] = React.useState("");
  const [success, setSuccess] = React.useState(true);

  async function sendEmail() {
    if (isLoading) {
      return;
    }
    console.log("enviado");
    setLoading(true);

    if (!isValidEmail(emailInput.current.value.trim())) {
      setSuccess(false);
      setResultText("Insert a valid email");
      setLoading(false);
      return;
    }

    try {
      setSuccess(true);
      setResultText(
        "You will receive an email containing the link to reset your password"
      );
      const response = await api.post("/auth/forgot-password", {
        email: emailInput.current.value.trim(),
      });
    } catch (e) {
      setResultText("Internal server error");
      setSuccess(false);
    }
    setLoading(false);
  }

  function isValidEmail(email) {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (emailRegex.test(email)) {
      return true;
    }

    return false;
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h1>Password recovery</h1>
        <input
          placeholder="Email"
          type="email"
          ref={emailInput}
          maxLength={100}
        />
        <Button
          text={"Send"}
          width={"100%"}
          fontSize={18}
          onClick={sendEmail}
        />
        <p style={{ color: success ? "" : "#ff0033" }}>{resultText}</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
