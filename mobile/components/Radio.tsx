import { RadioButton } from "react-native-paper";
import React from "react";
import { GestureResponderEvent, View } from "react-native";

const Radio = () => {
  const [checked, setChecked] = React.useState(false);

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

export default Radio;
