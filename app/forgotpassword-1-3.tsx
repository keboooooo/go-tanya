import { Feather } from "@expo/vector-icons"; // Using both icon sets
import { useRouter } from "expo-router"; // Import useRouter for navigation
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = (): void => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const validateForm = (): boolean => {
    let isValid = true;

    // Reset error messages
    setPasswordError("");
    setConfirmPasswordError("");

    // Validate password
    if (!password.trim()) {
      setPasswordError("Please enter your new password");
      isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const handleChangePassword = () => {
    if (validateForm()) {
      // Handle password change logic here
      console.log("Password changed successfully");
      Alert.alert("Success", "Your password has been changed successfully", [
        { text: "OK", onPress: () => router.push("/loginpage") },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        backgroundColor="#AFEEEE"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoiding}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.topSection}>
            <Text style={styles.appNamePart}>Go-</Text>
            <Text style={styles.appNamePart}>Tanya</Text>
          </View>

          <View style={styles.bottomSheet}>
            <Text style={styles.subtleText}>People sometimes forgot</Text>
            <Text style={styles.title}>Forgot Password</Text>

            <Text style={styles.inputLabel}>Password</Text>
            <View
              style={[
                styles.inputContainer,
                passwordError ? styles.inputError : null,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                placeholderTextColor="#B0B0B0"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (text.trim()) setPasswordError("");
                }}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Feather
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={20}
                  color="#888"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View
              style={[
                styles.inputContainer,
                confirmPasswordError ? styles.inputError : null,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                placeholderTextColor="#B0B0B0"
                secureTextEntry={!isConfirmPasswordVisible}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (text.trim()) setConfirmPasswordError("");
                }}
              />
              <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                <Feather
                  name={isConfirmPasswordVisible ? "eye-off" : "eye"}
                  size={20}
                  color="#888"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            {confirmPasswordError ? (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.button}
              onPress={handleChangePassword}
            >
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#b3e0ff", // Light sky blue background
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  topSection: {
    flex: 0.55, // Adjust ratio as needed, gives more space to top
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b3e0ff", // Light sky blue
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Ensure content isn't under status bar
  },
  appNamePart: {
    fontSize: 72, // Large font size
    fontWeight: "bold", // Medium weight, adjust if needed
    color: "#000000", // Black text
    // lineHeight: 80, // Adjust line height to bring them closer or further
  },
  bottomSheet: {
    flex: 0.45, // Adjust ratio as needed
    backgroundColor: "#FFFFFF", // White background for the form
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 40, // Add some padding at the bottom
    justifyContent: "flex-start", // Align items to the top of the sheet
  },
  subtleText: {
    fontSize: 16,
    color: "#666666", // Grayish text
    marginBottom: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000000", // Black text
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D0D0D0", // Light gray border
    borderRadius: 25, // Rounded corners for input fields
    marginBottom: 10,
    paddingHorizontal: 15,
    height: 50, // Fixed height for input fields
  },
  inputError: {
    borderColor: "#FF6347", // Tomato red for error state
  },
  errorText: {
    color: "#FF6347",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
  },
  icon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#141330", // Very dark blue, almost black
    paddingVertical: 15,
    borderRadius: 25, // Rounded corners for the button
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15, // Space above the button
    height: 50, // Fixed height for button
  },
  buttonText: {
    color: "#ffd700", // Gold/Yellow text
    fontSize: 16,
    fontWeight: "bold",
  },
});
