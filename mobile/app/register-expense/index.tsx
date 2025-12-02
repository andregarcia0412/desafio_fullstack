import Input from "@/components/Input";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../../assets/styles/register-expense.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import Close from "../../assets/images/close.png";
import { router } from "expo-router";
import api from "@/service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const registerExpense = () => {
  const [nameText, setNameText] = React.useState("");
  const [wrongName, setWrongName] = React.useState(false);

  const [amountText, setAmountText] = React.useState("");
  const [wrongAmount, setWrongAmount] = React.useState(false);

  const [descriptionText, setDescriptionText] = React.useState("");
  const [wrongDescription, setWrongDescription] = React.useState(false);

  const [category, setCategory] = React.useState("food");

  const [dateText, setDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState("");

  const validationRegex = /^[\p{L}\p{N}\x20-\x7E]+$/u;

  function onChangeDate(event: any, selectedDate: any) {
    const currentDate = selectedDate || null;
    if (Platform.OS == "android") {
      setShowDatePicker(false);
    }

    setDate(currentDate);
  }

  function validateFields() {
    const name: string = nameText.trim();
    const amount: string = amountText.replace(",", ".");
    const description: string = descriptionText.trim();
    const date: Date = dateText;
    const categoryValue: string = category;

    if (!name) {
      setWrongName(true);
      setWrongDescription(false);
      setWrongAmount(false);
      return {
        ok: false,
        message: "Name is required",
      };
    }

    if (!validationRegex.test(name)) {
      setWrongName(true);
      setWrongDescription(false);
      setWrongAmount(false);
      return {
        ok: false,
        message: "Insert only letters, symbols and numbers",
      };
    }

    if (!amount) {
      setWrongName(false);
      setWrongDescription(false);
      setWrongAmount(true);
      return {
        ok: false,
        message: "Amount is required",
      };
    }
    if (isNaN(Number(amount))) {
      setWrongName(false);
      setWrongDescription(false);
      setWrongAmount(true);
      return {
        ok: false,
        message: "Insert a number",
      };
    }

    if (Number(amount) < 0) {
      setWrongName(false);
      setWrongDescription(false);
      setWrongAmount(true);
      return {
        ok: false,
        message: "Insert a positive number",
      };
    }

    if (amount[amount.length - 1] === ".") {
      setWrongName(false);
      setWrongDescription(false);
      setWrongAmount(true);
      return {
        ok: false,
        message: "Insert a valid number",
      };
    }

    if (!categoryValue) {
      setWrongName(false);
      setWrongDescription(false);
      setWrongAmount(false);
      setErrorMessage("Category is required");
      return {
        ok: false,
        message: "Category is required",
      };
    }

    if (!description) {
      setWrongName(false);
      setWrongDescription(false);
      setWrongAmount(false);
      setDescriptionText("");
    }

    if (!date) {
      setWrongName(false);
      setWrongDescription(false);
      setWrongAmount(false);
      return {
        ok: false,
        message: "Date is required",
      };
    }

    if (
      new Date(date) > new Date() ||
      new Date(date).getTime() < new Date().setFullYear(2000)
    ) {
      setWrongName(false);
      setWrongDescription(false);
      setWrongAmount(false);
      return {
        ok: false,
        message: "Insert a valid date",
      };
    }

    return { ok: true };
  }

  async function createExpense() {
    const validation = validateFields();
    const userData = await AsyncStorage.getItem("user_data");

    if (!userData) {
      router.replace("/(auth)");
      return;
    }

    const userDataJSON = JSON.parse(userData);

    if (!validation.ok) {
      setErrorMessage(validation.message ? validation.message : "");
      return;
    }

    try {
      const response = await api.post("/expense", {
        name: nameText.trim(),
        amount: Number(amountText.replace(",", ".")),
        category: category,
        description: descriptionText,
        date: dateText,
        user_id: Number(userDataJSON.user.id),
      });
      Alert.alert("Success!", "Your expense was added!", [
        { text: "Ok", onPress: () => router.replace("/home") },
      ]);
    } catch (e: any) {
      setErrorMessage(e.response.data.message);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <View style={styles.title}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={{ marginRight: 60 }}
        >
          <Image style={{ height: 32, width: 32 }} source={Close} />
        </TouchableOpacity>
        <Text style={{ color: "#FFF", fontSize: 24 }}>New Expense</Text>
      </View>
      <KeyboardAvoidingView
        style={styles.registerExpenseContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Input
            text={nameText}
            setText={setNameText}
            placeholder="What is the expense?"
            label="Name"
            wrong={wrongName}
            keyboardType="default"
            maxLength={32}
          />

          <Input
            text={amountText}
            setText={setAmountText}
            placeholder="0.00"
            label="Amount"
            wrong={wrongAmount}
            keyboardType="numeric"
            maxLength={13}
          />

          <View>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={category}
                onValueChange={(value) => setCategory(value)}
                style={styles.picker}
              >
                <Picker.Item label="Food" value="food" />
                <Picker.Item label="Transportation" value="transportation" />
                <Picker.Item label="Entertainment" value="entertainment" />
                <Picker.Item label="Utilities" value="utilities" />
                <Picker.Item label="Housing" value="housing" />
                <Picker.Item label="Health" value="health" />
                <Picker.Item label="Shopping" value="shopping" />
                <Picker.Item label="Pets" value="pets" />
                <Picker.Item label="Personal" value="personal" />
                <Picker.Item label="Debt" value="debt" />
                <Picker.Item label="Bills" value="bills" />
                <Picker.Item label="Education" value="education" />
                <Picker.Item label="Investments" value="investments" />
                <Picker.Item label="Work" value="work" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>
          </View>

          <Input
            text={descriptionText}
            setText={setDescriptionText}
            placeholder="What was this expense for?"
            label="Description"
            wrong={wrongDescription}
            keyboardType="default"
            maxLength={255}
          />

          <View>
            <Text style={styles.label}>Date</Text>

            <TouchableOpacity
              style={styles.dateInputButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ color: "#FFF" }}>
                {dateText.toLocaleDateString("pt-BR")}{" "}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateText}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChangeDate}
                themeVariant="dark"
                textColor="#FFF"
              />
            )}
          </View>

          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.7}
            onPress={createExpense}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Add Expense
            </Text>
          </TouchableOpacity>

          {errorMessage && (
            <Text style={{ color: "#ff0033" }}>{errorMessage}</Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default registerExpense;
