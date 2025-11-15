import React from "react";
import "./style.card.css";
import api from "../../services/api";

const Card = ({ title, label }) => {
  const [isLoginView, setLoginView] = React.useState(true);
  const [isLoaded, setLoaded] = React.useState(false);

  const inputName = React.useRef();
  const inputEmail = React.useRef();
  const inputPassword = React.useRef();

  async function createUser() {
    await api.post("/user", {
      name: inputName.current.value,
      email: inputEmail.current.value,
      password: inputPassword.current.value,
    });
  }

  async function signIn() {
    await api
      .post("/auth/sign-in", {
        email: inputEmail.current.value,
        password: inputPassword.current.value,
      })
      .then((res) => console.log(res.data));
  }

  React.useEffect(() => {
    setLoaded(true);
  }, []);

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
      <input name="email" type="email" placeholder="E-mail" ref={inputEmail} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        ref={inputPassword}
      />
      <button type="button" onClick={isLoginView ? signIn : createUser}>
        {isLoginView ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default Card;
