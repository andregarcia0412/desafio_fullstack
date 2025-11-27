import { TouchableOpacity, Text } from "react-native";
import authStyles from "../assets/styles/auth.styles";

const LoginButton = ({ onPress, text = "Login" }: LoginButtonProps) => {
  return (
    <TouchableOpacity
      style={authStyles.button}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={authStyles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

interface LoginButtonProps {
  onPress: () => void;
  text: string;
}

export default LoginButton;
