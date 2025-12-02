import Input from "@/components/Input";
import React from "react";
import { View } from "react-native";

const registerExpense = () => {
  const [nameText, setNameText] = React.useState("");
  const [wrongName, setWrongName] = React.useState(false);

  const[amountText, setAmountText] = React.useState("")
  const[wrongAmount, setWrongAmount] = React.useState(false)

  const[descriptionText, setDescriptionText] = React.useState("")
  const[wrongDescription, setWrongDescription] = React.useState(false)

  return (
    <View>
      <Input
        text={nameText}
        setText={setNameText}
        placeholder="What is the expense?"
        label="Name"
        wrong={wrongName}
        keyboardType={"default"}
      />

      <Input
        text={amountText}
        setText={setAmountText}
        placeholder="0.00"
        label="Amount"
        wrong={wrongAmount}
        keyboardType={"numeric"}
      />

      <Input
        text={descriptionText}
        setText={setDescriptionText}
        placeholder="What was this expense for?"
        label="Description"
        wrong={wrongDescription}
        keyboardType={"default"}
      />
    </View>
  );
};
