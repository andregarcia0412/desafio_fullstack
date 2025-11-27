import React from "react";
import "./style.login-form.css";
import api from "../../services/api";
import ViewPassWordButton from "../view-password/ViewPasswordButton";

const Form = ({ title, label }) => {
  const [isLoginView, setLoginView] = React.useState(true);
  const [isLoaded, setLoaded] = React.useState(false);
  const [errorOcurred, setErrorOcurred] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const [visiblePassword, setVisiblePassword] = React.useState(false);

  const inputName = React.useRef();
  const inputEmail = React.useRef();
  const inputPassword = React.useRef();

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  async function createUser() {
    const result = validateRegisterFields();

    if (!result.ok) {
      setErrorText(result.message);
      setErrorOcurred(true);
      return;
    }

    await api
      .post("/user", {
        name: inputName.current.value,
        email: inputEmail.current.value,
        password: inputPassword.current.value,
      })
      .then(() => {
        signIn();
      })
      .catch((e) => {
        setErrorOcurred(true);
        setErrorText(e.response.data.message);
      });
  }

  async function signIn() {
    const result = validateSignInFields();
    if (!result.ok) {
      setErrorText(result.message);
      setErrorOcurred(true);
      return;
    }

    await api
      .post("/auth/sign-in", {
        email: inputEmail.current.value,
        password: inputPassword.current.value,
      })
      .then((res) => {
        localStorage.setItem("user_data", JSON.stringify(res.data));
        window.location.href = "/";
      })
      .catch((e) => {
        setErrorOcurred(true);
        setErrorText(e.response.data.message);
      });
  }

  function validateSignInFields() {
    const email = inputEmail.current.value.trim();
    const password = inputPassword.current.value.trim();

    if (!email) {
      return { ok: false, message: "Email is required" };
    }

    if (!isValidEmail(email)) {
      return { ok: false, message: "Invalid email format" };
    }

    if (!password) {
      return { ok: false, message: "Password is required" };
    }

    if (password.length < 8) {
      return {
        ok: false,
        message: "Your password must be at least 8 characters",
      };
    }

    return { ok: true };
  }

  function validateRegisterFields() {
    const name = inputName.current.value.trim();
    const email = inputEmail.current.value.trim();
    const password = inputPassword.current.value.trim();

    if (!name) {
      return { ok: false, message: "Name is required" };
    }

    if (!email) {
      return { ok: false, message: "Email is required" };
    }

    if (!isValidEmail(email)) {
      return { ok: false, message: "Invalid email format" };
    }

    if (!password) {
      return { ok: false, message: "Password is required" };
    }

    if (password.length < 8) {
      return {
        ok: false,
        message: "Your password must be at least 8 characters",
      };
    }

    return { ok: true };
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
    <form className={isLoaded ? "form-init" : ""}>
      <div className="form-header">
        <p>{title}</p>
        <p id="description-text">{label}</p>
      </div>
      <div className="choice-container">
        <div
          className="choice-slider"
          style={{ right: isLoginView ? "50%" : 0 }}
        ></div>
        <button
          type="button"
          className={isLoginView ? "active" : ""}
          onClick={() => setLoginView(true)}
        >
          Login
        </button>
        <button
          type="button"
          className={isLoginView ? "" : "active"}
          onClick={() => setLoginView(false)}
        >
          Sign-Up
        </button>
      </div>
      <input
        name="name"
        type="text"
        autoComplete="off"
        placeholder="Name"
        id="name-input"
        ref={inputName}
        className={isLoginView ? "hidden" : ""}
      />
      <input name="email" type="email" placeholder="Email" ref={inputEmail} />
      <div className="password-container">
        <input
          name="password"
          type={visiblePassword ? "text" : "password"}
          placeholder="Password"
          ref={inputPassword}
        />
        <ViewPassWordButton
          setVisible={setVisiblePassword}
          isVisible={visiblePassword}
        />
      </div>

      <p className={`errorP ${errorOcurred ? "" : "hidden"}`}>{errorText}</p>
      <button type="button" onClick={isLoginView ? signIn : createUser}>
        {isLoginView ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default Form;
