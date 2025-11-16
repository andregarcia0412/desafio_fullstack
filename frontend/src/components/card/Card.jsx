import React from "react";
import "./style.card.css";
import api from "../../services/api";

const Card = ({ title, label }) => {
  const [isLoginView, setLoginView] = React.useState(true);
  const [isLoaded, setLoaded] = React.useState(false);

  const inputName = React.useRef();
  const inputEmail = React.useRef();
  const inputPassword = React.useRef();

    React.useEffect(() => {
      setLoaded(true);
    }, []);

  async function createUser() {
    const result = validateRegisterFields()

    if(!result.ok){
      console.log(result.message)
      return
    }

    await api
      .post("/user", {
        name: inputName.current.value,
        email: inputEmail.current.value,
        password: inputPassword.current.value,
      })
      .then(() => {
        signIn();
      });
  }

  async function signIn() {
    const result = validateSignInFields()
    if(!result.ok){
      console.log(result.message)
      return
    }

    await api
      .post("/auth/sign-in", {
        email: inputEmail.current.value,
        password: inputPassword.current.value,
      })
      .then((res) => {
        localStorage.setItem("app_token", JSON.stringify(res.data));
        console.log(localStorage.getItem("app_token"));
      });
  }

  function validateSignInFields(){
    const email = inputEmail.current.value.trim()
    const password = inputPassword.current.value.trim()

    if(!isValidEmail(email)){
      return {ok: false, message:"Plase insert a valid E-mail adress"}
    }

    if(!password){
      return {ok: false, message:"Please insert your password"}
    }

    if(password.length < 8){
      return {ok:false, message:"Your password must have at least 8 digits"}
    }

    return{ok:true}
  }

  function validateRegisterFields(){
    const name = inputName.current.value.trim()
    const email = inputEmail.current.value.trim()
    const password = inputPassword.current.value.trim()

    if(!name){
      return {ok: false, message:"Please insert your name"}
    }
    
    if(!isValidEmail(email)){
      return {ok: false, message:"Please insert a valid E-mail adress"}
    }

    if(!password){
      return {ok: false, message:"Please insert your password"}
    }

    if(password.length < 8){
      return {ok: false, message:"Your password must have at least 8 digits"}
    }

    return {ok:true}
  }

  function isValidEmail(email){
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    if(emailRegex.test(email)){
      return true
    }

    return false
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
