import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// --- Change Username Modal Component ---
interface ChangeUsernameModalProps {
  visible: boolean;
  onClose: () => void;
  currentUsername: string;
}

const ChangeUsernameModal: React.FC<ChangeUsernameModalProps> = ({
  visible,
  onClose,
  currentUsername,
}) => {
  const [newUsername, setNewUsername] = useState("");

  const handleChangeUsername = () => {
    console.log("New username:", newUsername);
    // Add logic to actually change username here
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            {/* Optional: Add a close icon or drag handle here */}
          </TouchableOpacity>
          <Text style={styles.modalGreeting}>Hello {currentUsername} !!!</Text>
          <Text style={styles.modalPrompt}>Need a new name?</Text>

          <Text style={styles.inputLabel}>New Username</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Username"
              placeholderTextColor="#A9A9A9"
              value={newUsername}
              onChangeText={setNewUsername}
              autoCapitalize="none"
            />
            <Ionicons
              name="person-outline"
              size={22}
              color="#555"
              style={styles.inputIcon}
            />
          </View>

          <TouchableOpacity
            style={styles.changeUsernameButton}
            onPress={handleChangeUsername}
          >
            <Text style={styles.changeUsernameButtonText}>Change Username</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);
  const currentUsername = "Gabriel"; // This would come from state/context in a real app

  const handleBackToHomepage = () => {
    router.push("/landingpage");
  };

  const handleSettingsPress = () => {
    router.push("/settingspage"); // Navigate to settingpage
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.container.backgroundColor}
      />
      <View style={styles.appContainer}>
        <BlurView
          intensity={isModalVisible ? 25 : 0}
          tint="light"
          style={StyleSheet.absoluteFillObject}
        >
          <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>
                Go-{"\n"}
                Tanya
              </Text>
              <TouchableOpacity onPress={handleSettingsPress}>
                <Ionicons name="settings-outline" size={36} color="black" />
              </TouchableOpacity>
            </View>

            {/* Profile Image Section */}
            <View style={styles.profileImageContainer}>
              <Ionicons name="person" size={100} color="#333333" />
            </View>

            {/* Username Section */}
            <Text style={styles.username}>{currentUsername}</Text>

            {/* Action Buttons Section */}
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => console.log("Change Profile Picture pressed")}
              >
                <Text style={styles.actionButtonText}>
                  Change Profile{"\n"}Picture
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={openModal}>
                <Text style={styles.actionButtonText}>
                  Change{"\n"}Username
                </Text>
              </TouchableOpacity>
            </View>

            {/* User Information Section */}
            <View style={styles.userInfoContainer}>
              <Text style={styles.userInfoTitle}>User Information</Text>
              <View style={styles.infoCardsRow}>
                <View style={styles.infoCard}>
                  <Text style={styles.infoCardLabel}>Question{"\n"}Asked</Text>
                  <Text style={styles.infoCardValueRed}>25</Text>
                </View>
                <View style={styles.infoCard}>
                  <Text style={styles.infoCardLabel}>
                    Answer a{"\n"}Question
                  </Text>
                  <Text style={styles.infoCardValueRed}>9</Text>
                </View>
                <View style={styles.infoCard}>
                  <Text style={styles.infoCardLabel}>Education{"\n"}Level</Text>
                  <Text style={styles.infoCardValueRed}>College</Text>
                </View>
              </View>
            </View>

            {/* Back to Homepage Button */}
            <TouchableOpacity
              style={[styles.actionButton, styles.homepageButton]}
              onPress={handleBackToHomepage}
            >
              <Text style={styles.actionButtonText}>Back to{"\n"}Homepage</Text>
            </TouchableOpacity>
          </View>
        </BlurView>

        <ChangeUsernameModal
          visible={isModalVisible}
          onClose={closeModal}
          currentUsername={currentUsername}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Existing styles
  safeArea: {
    flex: 1,
    backgroundColor: "#A0E0FF", // Light blue background
  },
  appContainer: {
    flex: 1,
  },
  blurViewContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20, // Adjust for status bar
    paddingHorizontal: 20,
    backgroundColor: "#A0E0FF", // Light blue background
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start", // Align to top for multi-line title
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 52,
    fontWeight: "bold",
    color: "#000000",
    lineHeight: 55, // Adjust line height for multi-line
  },
  profileImageContainer: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: "#505050", // Dark grey circle for profile pic
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  username: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 25,
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: "#141330", // Very dark blue/almost black
    paddingVertical: 12,
    paddingHorizontal: 10, // Adjusted for better fit with text
    borderRadius: 12,
    minWidth: 150, // Ensure buttons have good width
    alignItems: "center", // Center text, especially multi-line
  },
  actionButtonText: {
    color: "#ffd700", // Gold/Yellow
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 18,
  },
  userInfoContainer: {
    backgroundColor: "#D6D6D634", // Light greyish white background for the container
    borderRadius: 15,
    padding: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#000000FF", // Light grey border
  },
  userInfoTitle: {
    fontSize: 17,
    fontWeight: "600", // Semi-bold
    color: "#000000",
    marginBottom: 15,
  },
  infoCardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  infoCard: {
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#000000",
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5, // Spacing between cards
    minHeight: 90, // Ensure cards have enough height
  },
  infoCardLabel: {
    fontSize: 14,
    color: "#000000",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 16,
  },
  infoCardValueRed: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff6347", // Red color for values
    textAlign: "center",
  },
  homepageButton: {
    width: "85%", // Make it slightly less wide than the row buttons
    marginTop: 10, // Add some space if needed
  },

  // Modal styles from changeusername.tsx
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end", // Aligns modal to bottom
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Transparent overlay, blur handles the effect
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 30, // Padding for home indicator
    width: "100%",
    alignItems: "flex-start", // Align content to the left
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  closeButton: {
    // Optional: for a drag handle or explicit close icon
    alignSelf: "center",
    width: 50,
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 2.5,
    marginBottom: 15,
  },
  modalGreeting: {
    fontSize: 22,
    fontWeight: "normal",
    color: "#000000",
    marginBottom: 5,
  },
  modalPrompt: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
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
    borderColor: "#B0B0B0",
    borderRadius: 25, // Highly rounded
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
  },
  inputIcon: {
    marginLeft: 10,
  },
  changeUsernameButton: {
    backgroundColor: "#0A0A2A", // Very dark blue
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: "center",
    width: "100%", // Make button full width of modal padding
  },
  changeUsernameButtonText: {
    color: "#FFD700", // Gold/Yellow
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default ProfilePage;
