import React from "react";
import api from "../../services/api";
import { useSearchParams } from "react-router-dom";

const ResetPassword = ({}) => {
  const passwordInput = React.useRef();
  const [searchParams] = useSearchParams();

  async function resetPassword() {
    const token = searchParams.get("token");

    try {
      const response = await api.patch("/auth/reset-password", {
        newPassword: passwordInput.current.value,
        resetToken: token,
      });
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <input
        placeholder="New Password"
        type="password"
        ref={passwordInput}
      ></input>
      <button onClick={resetPassword}>Trocar</button>
    </div>
  );
};

export default ResetPassword;
