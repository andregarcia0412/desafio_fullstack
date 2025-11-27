import authStyles from "@/assets/styles/auth.styles";
import Input from "@/components/Input";
import api from "@/service/api";
import { View, Text } from "react-native";
import React from "react";
import PasswordInput from "@/components/PasswordInput";
import LoginButton from "../../components/LoginButton";
import Radio from "@/components/Radio";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const signUpScreen = () => {
  const [nameText, setNameText] = React.useState<string>("");
  const [emailText, setEmailText] = React.useState<string>("");
  const [passwordText, setPasswordText] = React.useState<string>("");
  const [confirmPasswordText, setConfirmPasswordText] =
    React.useState<string>("");
  const [wrongName, setWrongName] = React.useState<boolean>(false);
  const [wrongEmail, setWrongEmail] = React.useState<boolean>(false);
  const [wrongPassword, setWrongPassword] = React.useState<boolean>(false);
  const [wrongConfirmPassword, setWrongConfirmPassword] =
    React.useState<boolean>(false);
  const [wrongMessage, setWrongMessage] = React.useState<string | undefined>(
    ""
  );
  const [checkedRadio, setCheckedRadio] = React.useState(false);

  async function signIn() {
    let response;

    try {
      response = await api.post("/auth/sign-in", {
        email: emailText.trim(),
        password: passwordText.trim(),
        rememberUser: checkedRadio,
      });
    } catch (e: any) {
      setWrongMessage(e.response.data.message);
      setWrongEmail(false);
      setWrongPassword(false);
      setWrongName(false);
      setWrongConfirmPassword(false);
      return;
    }

    await AsyncStorage.setItem("user_data", JSON.stringify(response.data));
  }

  async function createAccount() {
    const result = validateSignUpFields();
    if (!result.ok) {
      setWrongMessage(result.message);
      return;
    }

    try {
      const response = await api.post("/user", {
        name: nameText.trim(),
        email: emailText.trim(),
        password: passwordText.trim(),
      });
      await signIn();
    } catch (e: any) {
      setWrongMessage(e.response.data.message);
      setWrongEmail(false);
      setWrongPassword(false);
      setWrongName(false);
      setWrongConfirmPassword(false);
      return;
    }
  }

  function validateSignUpFields() {
    const name = nameText.trim();
    const email = emailText.trim();
    const password = passwordText.trim();

    if (!name) {
      setWrongName(true);
      setWrongEmail(false);
      setWrongPassword(false);
      setWrongConfirmPassword(false);
      return { ok: false, message: "Name is required" };
    }

    if (!email) {
      setWrongEmail(true);
      setWrongName(false);
      setWrongPassword(false);
      setWrongConfirmPassword(false);
      return { ok: false, message: "Email is required" };
    }

    if (!isValidEmail(email)) {
      setWrongEmail(true);
      setWrongName(false);
      setWrongPassword(false);
      setWrongConfirmPassword(false);
      return { ok: false, message: "Invalid email format" };
    }

    if (!password) {
      setWrongPassword(true);
      setWrongName(false);
      setWrongEmail(false);
      setWrongConfirmPassword(false);
      return {
        ok: false,
        message: "Password is required",
      };
    }

    if (password.length < 8) {
      setWrongPassword(true);
      setWrongName(false);
      setWrongEmail(false);
      setWrongConfirmPassword(false);
      return {
        ok: false,
        message: "Your password must be at least 8 characters",
      };
    }

    if (passwordText !== confirmPasswordText) {
      setWrongConfirmPassword(true);
      setWrongPassword(true);
      setWrongName(false);
      setWrongEmail(false);

      return { ok: false, message: "The passwords don't match" };
    }

    return { ok: true };
  }

  function isValidEmail(email: string) {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (emailRegex.test(email)) {
      return true;
    }

    return false;
  }

  return (
    <View style={authStyles.container}>
      <View style={authStyles.title}>
        <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 32 }}>
          Create Account
        </Text>
        <Text style={{ color: "#999" }}>Join us to manage your finances</Text>
      </View>

      <View style={authStyles.formWrapper}>
        <View style={authStyles.inputsWrapper}>
          <Input
            label="Name"
            placeholder="Enter your name"
            text={nameText}
            setText={setNameText}
            wrong={wrongName}
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            keyboardType={"email-address"}
            text={emailText}
            setText={setEmailText}
            wrong={wrongEmail}
          />

          <PasswordInput
            text={passwordText}
            setText={setPasswordText}
            label="Password"
            wrong={wrongPassword}
          />

          <PasswordInput
            text={confirmPasswordText}
            setText={setConfirmPasswordText}
            label="Confirm password"
            placeholder={"Confirm your password"}
            wrong={wrongConfirmPassword}
          />

          {wrongMessage && (
            <Text style={{ color: "#FF0033" }}>{wrongMessage}</Text>
          )}
        </View>
        <View style={authStyles.radioButtonLinkWrapper}>
          <View style={authStyles.radioButton}>
            <Radio
              setChecked={() => setCheckedRadio(!checkedRadio)}
              checked={checkedRadio}
            />
            <Text style={{ color: "#999" }}>Remember me</Text>
          </View>
        </View>
        <LoginButton text={"Sign Up"} onPress={createAccount} />
      </View>

      <Text style={{ color: "#999" }}>
        Don't have an account?{" "}
        <Link href="/(auth)/sign-in">
          <Text style={authStyles.link}>Login</Text>
        </Link>
      </Text>
    </View>
  );
};

export default signUpScreen;
