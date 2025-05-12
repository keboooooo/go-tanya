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

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const router = useRouter();

  const togglePasswordVisibility = (): void => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignUp = (): void => {
    router.push("/registerpage");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#338686FF" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.brandName}>Go-</Text>
            <Text style={styles.brandName}>Tanya</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Welcome Back !!!</Text>
            <Text style={styles.signInText}>Sign In</Text>

            <Text style={styles.inputLabel}>Username/email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="example@gmail.com"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                keyboardType="email-address"
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

            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text style={styles.noAccountText}>Don't have an account? </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUpText}>Sign Up</Text>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  brandName: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#000",
  },
  formContainer: {
    // flex: 1,
    height: 550,
    // position: "relative",
    // bottom: -400,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "normal",
    marginBottom: 5,
  },
  signInText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 50,
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
  forgotPasswordContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#555",
  },
  signInButton: {
    backgroundColor: "#141330",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  signInButtonText: {
    color: "#ffd700",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  noAccountText: {
    fontSize: 16,
  },
  signUpText: {
    fontSize: 16,
    color: "#ff6347",
    fontWeight: "bold",
  },
});

export default LoginScreen;
