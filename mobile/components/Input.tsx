import React from "react";
import { TextInput, View, Text } from "react-native";
import authStyles from "../assets/styles/auth.styles.js";

const Input = ({
  text,
  setText,
  placeholder,
  keyboardType = "default",
  label,
  wrong,
  maxLength,
}: InputProps) => {
  return (
    <View style={authStyles.inputContainer}>
      <Text style={[{ color: "#999" }]}>{label}</Text>
      <TextInput
        style={[authStyles.textInput, {textAlignVertical:"center", paddingVertical:0}, wrong && { borderColor: "#FF0033" }]}
        placeholderTextColor={"#666"}
        placeholder={placeholder}
        value={text}
        keyboardType={keyboardType}
        onChangeText={setText}
        autoCapitalize="none"
        cursorColor="#666"
        maxLength={maxLength}
        scrollEnabled={false}
      />
    </View>
  );
};

interface InputProps {
  text: string;
  setText: (text: string) => void;
  placeholder: string;
  keyboardType: any;
  label: string;
  wrong: boolean;
  maxLength: number;
}

export default Input;
