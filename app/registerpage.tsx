import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  // Error states for validation
  const [emailError, setEmailError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const router = useRouter();

  const togglePasswordVisibility = (): void => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleSignIn = (): void => {
    router.push("/loginpage");
  };

  const validateForm = (): boolean => {
    let isValid = true;

    // Reset all error messages
    setEmailError("");
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validate email
    if (!email.trim()) {
      setEmailError("Please enter your email");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    // Validate username
    if (!username.trim()) {
      setUsernameError("Please enter a username");
      isValid = false;
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError("Please enter a password");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const handleSignUp = (): void => {
    if (validateForm()) {
      // If validation passes, proceed with registration
      console.log("Sign up with:", { email, username, password });
      // Here you would typically call your registration API
      router.push("/register-1-2");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#b3e0ff" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.brandName}>Go-</Text>
            <Text style={styles.brandName}>Tanya</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.helloText}>Hello...</Text>
            <Text style={styles.signUpText}>Sign Up</Text>

            <Text style={styles.inputLabel}>Email</Text>
            <View
              style={[
                styles.inputContainer,
                emailError ? styles.inputError : null,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="example@gmail.com"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (text.trim()) setEmailError("");
                }}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <Feather
                name="mail"
                size={20}
                color="#888"
                style={styles.inputIcon}
              />
            </View>
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Username</Text>
            <View
              style={[
                styles.inputContainer,
                usernameError ? styles.inputError : null,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  if (text.trim()) setUsernameError("");
                }}
                autoCapitalize="none"
              />
              <Feather
                name="user"
                size={20}
                color="#888"
                style={styles.inputIcon}
              />
            </View>
            {usernameError ? (
              <Text style={styles.errorText}>{usernameError}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Password</Text>
            <View
              style={[
                styles.inputContainer,
                passwordError ? styles.inputError : null,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (text.trim()) setPasswordError("");
                }}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Feather
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={20}
                  color="#888"
                  style={styles.inputIcon}
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
                placeholder="password"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (text.trim()) setConfirmPasswordError("");
                }}
                secureTextEntry={!isConfirmPasswordVisible}
              />
              <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                <Feather
                  name={isConfirmPasswordVisible ? "eye-off" : "eye"}
                  size={20}
                  color="#888"
                  style={styles.inputIcon}
                />
              </TouchableOpacity>
            </View>
            {confirmPasswordError ? (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSignUp}
            >
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.signInContainer}>
              <Text style={styles.alreadyAccountText}>
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={handleSignIn}>
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b3e0ff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  brandName: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#000",
  },
  formContainer: {
    flex: 1.3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 20,
  },
  helloText: {
    fontSize: 24,
    fontWeight: "normal",
    color: "#555",
    marginBottom: 5,
  },
  signUpText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 5,
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
  },
  inputIcon: {
    marginLeft: 10,
  },
  signUpButton: {
    backgroundColor: "#141330",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  signUpButtonText: {
    color: "#ffd700",
    fontSize: 18,
    fontWeight: "bold",
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  alreadyAccountText: {
    fontSize: 16,
  },
  signInText: {
    fontSize: 16,
    color: "#ff6347",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
