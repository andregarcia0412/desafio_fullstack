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

const SignInScreen = () => {
  const [emailText, setEmailText] = React.useState("");
  const [passwordText, setPasswordText] = React.useState("");

  async function signIn() {
    const result = validateSignInFields();
    if (!result.ok) {
      console.log(result.message);
      return;
    }

    try {
      const response = await api.post("/auth/sign-in", {
        email: emailText,
        password: passwordText,
      });
    } catch (e: any) {
      console.log(e.response.data.message);
      return;
    }

    await AsyncStorage.setItem("user_data", JSON.stringify(response.data));
  }

  function validateSignInFields() {
    const email = emailText.trim();
    const password = passwordText.trim();

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
          Welcome Back
        </Text>
        <Text style={{ color: "#999" }}>
          Login to register your daily expenses
        </Text>
      </View>

      <View style={authStyles.formWrapper}>
        <View style={authStyles.inputsWrapper}>
          <Input
            label="Email"
            placeholder="Enter your email"
            keyboardType={"email-address"}
            text={emailText}
            setText={setEmailText}
          />

          <PasswordInput
            text={passwordText}
            setText={setPasswordText}
            label="Password"
          />
        </View>
        <View style={authStyles.radioButtonLinkWrapper}>
          <View style={authStyles.radioButton}>
            <Radio />
            <Text style={{ color: "#999" }}>Remember me</Text>
          </View>

          <Link href="/" style={authStyles.link}>
            Forgot Password?
          </Link>
        </View>
        <LoginButton onPress={signIn} />
      </View>

      <Text style={{ color: "#999" }}>
        Don't have an account?{" "}
        <Link style={authStyles.link} href="/">
          Create an account
        </Link>
      </Text>
    </View>
  );
};

export default SignInScreen;
