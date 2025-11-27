import { RadioButton } from "react-native-paper";
import React from "react";
import { View } from "react-native";

const Radio = ({ checked, setChecked }: RadioProps) => {
  return (
    <View style={{ width: 30, alignItems: "center" }}>
      <RadioButton
        value="first"
        status={checked ? "checked" : "unchecked"}
        onPress={() => setChecked(!checked)}
        color={"#FFF"}
      />
    </View>
  );
};

interface RadioProps {
  checked: boolean;
  setChecked: (checked: boolean) => void;
}

export default Radio;
