import { Feather } from "@expo/vector-icons"; // Using Feather for the user icon
import { useRouter } from "expo-router"; // Import useRouter
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

export default function App() {
  const [email, setEmail] = useState<string>("");
  const router = useRouter(); // Initialize router

  const handleSendOtp = () => {
    // Validate email
    if (!email.trim()) {
      Alert.alert(
        "Email Required",
        "Please enter your email address to receive the OTP.",
        [{ text: "OK" }]
      );
      return;
    }

    // Log the action
    console.log("Send OTP to:", email);

    // Navigate to the next screen
    router.push("/forgotpassword-1-2");
  };

  const handleSignIn = () => {
    // Navigate to login page
    router.push("/loginpage");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#A0E0FF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.topBlueSection}>
          <Text style={styles.appNameTextLarge}>Go-</Text>
          <Text style={styles.appNameTextLarge}>Tanya</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.subtleText}>People sometimes forgot</Text>
          <Text style={styles.titleText}>Forgot Password</Text>

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="example@gmail.com"
              placeholderTextColor="#B0B0B0"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Feather
              name="user"
              size={22}
              color="#888"
              style={styles.inputIcon}
            />
          </View>

          <TouchableOpacity
            style={styles.sendOtpButton}
            onPress={handleSendOtp}
          >
            <Text style={styles.sendOtpButtonText}>Send OTP</Text>
          </TouchableOpacity>

          <View style={styles.signInPromptContainer}>
            <Text style={styles.signInPromptText}>
              You already remember the password?{" "}
            </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.signInLinkText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#A0E0FF", // Background for the notch/status bar area
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  topBlueSection: {
    backgroundColor: "#b3e0ff",
    height: height * 0.5, // Adjust as needed, roughly 45% of screen height
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60, // To create space for the form's rounded corners to overlap
  },
  appNameTextLarge: {
    fontSize: 72, // Made it larger
    fontWeight: "bold", // Less bold, more like the image
    color: "#000000",
    // lineHeight: 85, // Adjust line height for closer text
  },
  formContainer: {
    flex: 1, // Takes remaining space
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    paddingTop: 30,
    marginTop: -40, // Pulls the form up to overlap with the blue section
    paddingBottom: 20, // Ensure content doesn't hit bottom edge
  },
  subtleText: {
    fontSize: 22,
    color: "#666666",
    textAlign: "left",
    marginBottom: 5,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "left",
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 8,
    marginLeft: 5, // Slight indent for the label
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 25, // More rounded
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
  },
  inputIcon: {
    marginLeft: 10,
  },
  sendOtpButton: {
    backgroundColor: "#141330", // Dark blue/almost black
    paddingVertical: 15,
    borderRadius: 25, // More rounded
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    height: 50,
  },
  sendOtpButtonText: {
    color: "#ffd700", // Yellowish gold
    fontSize: 16,
    fontWeight: "bold",
  },
  signInPromptContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  signInPromptText: {
    fontSize: 14,
    color: "#666666",
  },
  signInLinkText: {
    fontSize: 14,
    color: "#ff6347", // Reddish pink
    fontWeight: "bold",
  },
});
