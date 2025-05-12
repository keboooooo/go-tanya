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
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="example@gmail.com"
                value={email}
                onChangeText={setEmail}
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

            <Text style={styles.inputLabel}>Username</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
              <Feather
                name="user"
                size={20}
                color="#888"
                style={styles.inputIcon}
              />
            </View>

            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="password"
                value={password}
                onChangeText={setPassword}
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

            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
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

            <TouchableOpacity style={styles.signUpButton}>
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
    marginBottom: 15,
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
