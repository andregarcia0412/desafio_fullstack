import React from "react";
import api from "../../services/api";
import "./style.forgot-password.css";

const ForgotPassword = ({}) => {
  const emailInput = React.useRef();
  const [isLoading, setLoading] = React.useState(false);

  async function sendEmail() {
    setLoading(true);
    try {
      const response = await api.post("/auth/forgot-password", {
        email: emailInput.current.value,
      });
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  return (
    <div>
      <input placeholder="Email" type="email" ref={emailInput}></input>
      <button onClick={sendEmail}>Enviar</button>
    </div>
  );
};

export default ForgotPassword;
