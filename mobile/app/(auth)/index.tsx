import styles from "@/assets/styles/auth.styles";
import Input from "@/components/Input";
import api from "@/service/api";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import PasswordInput from "@/components/PasswordInput";
import LoginButton from "../../components/LoginButton";
import Radio from "@/components/Radio";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const SignInScreen = () => {
  const [emailText, setEmailText] = React.useState<string>("");
  const [passwordText, setPasswordText] = React.useState<string>("");
  const [wrongEmail, setWrongEmail] = React.useState<boolean>(false);
  const [wrongPassword, setWrongPassword] = React.useState<boolean>(false);
  const [wrongMessage, setWrongMessage] = React.useState<string | undefined>(
    ""
  );
  const [checkedRadio, setCheckedRadio] = React.useState(false);

  async function signIn() {
    let response;
    const result = validateSignInFields();
    if (!result.ok) {
      setWrongMessage(result.message);
      return;
    }

    try {
      response = await api.post("/auth/sign-in", {
        email: emailText,
        password: passwordText,
        rememberUser: checkedRadio,
      });
    } catch (e: any) {
      setWrongMessage(e.response.data.message);
      setWrongEmail(false);
      setWrongPassword(false);
      return;
    }

    await AsyncStorage.setItem("user_data", JSON.stringify(response.data));
    router.replace("/home");
  }

  function validateSignInFields() {
    const email = emailText.trim();
    const password = passwordText.trim();

    if (!email) {
      setWrongEmail(true);
      setWrongPassword(false);
      return { ok: false, message: "Email is required" };
    }

    if (!isValidEmail(email)) {
      setWrongEmail(true);
      setWrongPassword(false);
      return { ok: false, message: "Invalid email format", culprit: "email" };
    }

    if (!password) {
      setWrongPassword(true);
      setWrongEmail(false);
      return {
        ok: false,
        message: "Password is required",
        culprit: "password",
      };
    }

    if (password.length < 8) {
      setWrongPassword(true);
      setWrongEmail(false);
      return {
        ok: false,
        message: "Your password must be at least 8 characters",
        culprit: "password",
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.title}>
              <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 32 }}>
                Welcome Back
              </Text>
              <Text style={{ color: "#999" }}>
                Login to register your daily expenses
              </Text>
            </View>

            <View style={styles.formWrapper}>
              <View style={styles.inputsWrapper}>
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  keyboardType={"email-address"}
                  text={emailText}
                  setText={setEmailText}
                  wrong={wrongEmail}
                  maxLength={100}
                />

                <PasswordInput
                  text={passwordText}
                  setText={setPasswordText}
                  label="Password"
                  wrong={wrongPassword}
                  maxLength={32}
                />

                {wrongMessage && (
                  <Text style={{ color: "#FF0033" }}>{wrongMessage}</Text>
                )}
              </View>
              <View style={styles.radioButtonLinkWrapper}>
                <View style={styles.radioButton}>
                  <Radio setChecked={setCheckedRadio} checked={checkedRadio} />
                  <Text style={{ color: "#999" }}>Remember me</Text>
                </View>

                <Link href="/">
                  <Text style={styles.link}>Forgot Password?</Text>
                </Link>
              </View>
              <LoginButton onPress={signIn} text={"Login"} />
            </View>

            <Text style={{ color: "#999" }}>
              Don't have an account?{" "}
              <Link href="/(auth)/sign-up">
                <Text style={styles.link}>Create an account</Text>
              </Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;
