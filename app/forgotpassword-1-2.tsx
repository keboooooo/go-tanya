// src/screens/ForgotPasswordScreen.tsx
import { MaterialCommunityIcons } from "@expo/vector-icons"; // For the key icon
import React, { useEffect, useState } from "react";
import {
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

const { width } = Dimensions.get("window");

const ForgotPasswordScreen: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | number;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOtp = () => {
    if (canResend) {
      console.log("Resending OTP...");
      setTimer(59); // Reset timer
      setCanResend(false);
      // Add actual OTP resend logic here
    }
  };

  const handleVerifyOtp = () => {
    console.log("Verifying OTP:", otp);
    // Add actual OTP verification logic here
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#B0E0E6" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Go-</Text>
          <Text style={styles.logoText}>Tanya</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>People sometimes forgot</Text>
          <Text style={styles.title}>Forgot Password</Text>

          <Text style={styles.label}>OTP</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="123456"
              placeholderTextColor="#B0B0B0"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              maxLength={6}
              secureTextEntry // Hides OTP characters, though typically OTP is visible
            />
            <MaterialCommunityIcons
              name="key-variant"
              size={24}
              color="#888888"
              style={styles.icon}
            />
          </View>

          <TouchableOpacity
            style={styles.verifyButton}
            onPress={handleVerifyOtp}
          >
            <Text style={styles.verifyButtonText}>Verify OTP</Text>
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            <TouchableOpacity onPress={handleResendOtp} disabled={!canResend}>
              <Text
                style={[
                  styles.resendText,
                  !canResend && styles.disabledResendText,
                ]}
              >
                Resend OTP Code
              </Text>
            </TouchableOpacity>
            {!canResend && (
              <Text style={styles.timerText}>{formatTime(timer)}</Text>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#b3e0ff", // Light blue background
  },
  container: {
    flex: 1,
    justifyContent: "flex-end", // Pushes formContainer to the bottom
  },
  logoContainer: {
    flex: 1, // Takes up remaining space above the form
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30, // Space above the white card
  },
  logoText: {
    fontSize: 72, // Responsive font size
    fontWeight: "bold", // Adjust as needed, original looks like a light/regular weight
    color: "#000000",
    // lineHeight: width * 0.18 * 1.1, // Adjust line height to bring them closer
  },
  formContainer: {
    height: 400,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 30, // More padding at bottom for iOS due to home indicator
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: "100%",
  },
  subtitle: {
    fontSize: 22,
    color: "#666666",
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 8,
  },
  inputContainer: {
    // height: 500,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 12,
    marginBottom: 25,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#000000",
  },
  icon: {
    marginLeft: 10,
  },
  verifyButton: {
    backgroundColor: "#141330", // Dark blue/almost black
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 25,
  },
  verifyButtonText: {
    color: "#ffd700", // Gold/Yellow
    fontSize: 16,
    fontWeight: "bold",
  },
  resendContainer: {
    alignItems: "center",
  },
  resendText: {
    fontSize: 14,
    color: "#333333", // Default color for enabled resend
  },
  disabledResendText: {
    color: "#999999", // Greyed out when disabled
  },
  timerText: {
    fontSize: 14,
    color: "#ff6347", // Red
    marginTop: 5, // Space between "Resend OTP Code" and timer
  },
});

export default ForgotPasswordScreen;
