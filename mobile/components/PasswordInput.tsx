import authStyles from "@/assets/styles/auth.styles";
import React from "react";
import { TextInput, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PasswordInput = ({
  text,
  setText,
  label,
  wrong,
  placeholder = "Enter your password",
  maxLength,
}: PasswordInputProps) => {
  const [isVisible, setVisible] = React.useState(false);

  return (
    <View style={[authStyles.passwordContainer, authStyles.inputContainer]}>
      <Text style={{ color: "#999" }}>{label}</Text>
      <TextInput
        style={[
          authStyles.textInput,
          wrong && { borderColor: "#FF0033" },
          authStyles.passwordInput,
          { textAlignVertical: "center", paddingVertical: 0 },
        ]}
        placeholder={placeholder}
        placeholderTextColor={"#666"}
        value={text}
        onChangeText={setText}
        secureTextEntry={!isVisible}
        cursorColor="#666"
        autoCapitalize="none"
        maxLength={32}
        scrollEnabled={false}
      />
      <TouchableOpacity
        style={authStyles.eyeIcon}
        onPress={() => setVisible(!isVisible)}
      >
        <Ionicons
          name={isVisible ? "eye-off-outline" : "eye-outline"}
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
  wrong: boolean;
  placeholder: string;
  maxLength: number;
}

export default PasswordInput;
