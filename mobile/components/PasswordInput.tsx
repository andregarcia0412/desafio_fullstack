import authStyles from "@/assets/styles/auth.styles";
import React from "react";
import { TextInput, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PasswordInput = ({ text, setText, label }: PasswordInputProps) => {
  const [isVisible, setVisible] = React.useState(false);

  return (
    <View style={[authStyles.passwordInput, authStyles.inputContainer]}>
      <Text style={{ color: "#999" }}>{label}</Text>
      <TextInput
        style={authStyles.textInput}
        placeholder="Enter your password"
        placeholderTextColor={"#666"}
        value={text}
        onChangeText={setText}
        secureTextEntry={isVisible}
        cursorColor="#666"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={authStyles.eyeIcon}
        onPress={() => setVisible(!isVisible)}
      >
        <Ionicons
          name={isVisible ? "eye-outline" : "eye-off-outline"}
          size={20}
          color={"#666"}
        />
      </TouchableOpacity>
    </View>
  );
};

interface PasswordInputProps {
  text: string;
  setText: (text: string) => void;
  label: string;
}

export default PasswordInput;
