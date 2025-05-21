import { Feather, Ionicons } from '@expo/vector-icons'; // Using Feather for the chevron-right icon
import { useRouter } from 'expo-router'; // Added
import React, { useState } from 'react'; // Added useState
import {
    Alert,
    KeyboardAvoidingView, // Added
    Modal, // Added
    Platform, // Added
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput, // Added
    TouchableOpacity,
    View,
} from 'react-native';

// --- Component: SettingsItem ---
interface SettingsItemProps {
  label: string;
  onPress: () => void;
  isDestructive?: boolean; // To style the "Log Out" button differently
}

const SettingsItem: React.FC<SettingsItemProps> = ({ label, onPress, isDestructive }) => {
  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        isDestructive && styles.destructiveItemContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.7} // Standard touch feedback
    >
      <Text style={[styles.itemLabel, isDestructive && styles.destructiveItemLabel]}>
        {label}
      </Text>
      <Feather
        name="chevron-right"
        size={24}
        color={isDestructive ? '#D32F2F' : '#555555'} // Red for destructive, dark grey for normal
      />
    </TouchableOpacity>
  );
};

// --- Component: SettingsSection ---
interface ItemConfig {
  id: string;
  label: string;
  onPress: () => void;
  isDestructive?: boolean;
}

interface SettingsSectionProps {
  title: string;
  items: ItemConfig[];
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, items }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item) => (
        <SettingsItem
          key={item.id}
          label={item.label}
          onPress={item.onPress}
          isDestructive={item.isDestructive}
        />
      ))}
    </View>
  );
};

// --- Component: Header (part of the settings screen) ---
const AppHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitlePrimary}>Go-</Text>
      <Text style={styles.headerTitlePrimary}>Tanya</Text>
      <Text style={styles.headerSubtitleVersion}>Ver. 0.0.1 (alpha stage)</Text>
    </View>
  );
};

// --- Change Email Modal Component ---
interface ChangeEmailModalProps {
  visible: boolean;
  onClose: () => void;
  currentEmail: string; // Example prop
}

const ChangeEmailModal: React.FC<ChangeEmailModalProps> = ({
  visible,
  onClose,
  currentEmail,
}) => {
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState(""); // For verification
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); // Added for password visibility

  const isValidEmail = (email: string) => {
    // A simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChangeEmail = () => {
    if (!isValidEmail(newEmail)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    // Add further validation if needed (e.g., check if email is already in use)

    console.log("New email:", newEmail, "Password for verification:", currentPassword);
    // Add logic to actually change email here
    // Potentially re-authenticate user or verify password
    setNewEmail("");
    setCurrentPassword("");
    setShowCurrentPassword(false); // Reset on close
    onClose();
  };

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setShowCurrentPassword(false); // Reset on close
        onClose();
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => { setShowCurrentPassword(false); onClose();}} style={styles.modalCloseButton}>
            {/* Optional: Add a close icon or drag handle here */}
          </TouchableOpacity>
          {/* Use styles similar to modalGreeting and modalPrompt */}
          {/* <Text style={styles.modalGreetingStyle}>Current: {currentEmail}</Text> */}
          <Text style={styles.modalPromptStyle}>Change Your Email</Text>

          <Text style={styles.inputLabel}>New Email Address</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter new email"
              placeholderTextColor="#A9A9A9"
              value={newEmail}
              onChangeText={setNewEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Ionicons
              name="mail-outline"
              size={22}
              color="#555"
              style={styles.inputIcon}
            />
          </View>

          <Text style={styles.inputLabel}>Current Password (for verification)</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter current password"
              placeholderTextColor="#A9A9A9"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrentPassword} // Toggle secureTextEntry
            />
            <TouchableOpacity onPress={toggleShowCurrentPassword} style={styles.inputIconTouchable}>
              <Ionicons
                name={showCurrentPassword ? "eye-off-outline" : "eye-outline"} // Change icon based on state
                size={24}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.actionModalButton}
            onPress={handleChangeEmail}
          >
            <Text style={styles.actionModalButtonText}>Update Email</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// --- Change Password Modal Component ---
interface ChangePasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  visible,
  onClose,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);


  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }
    console.log("Current Password:", currentPassword, "New Password:", newPassword);
    // Add logic to actually change password here
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmNewPassword(false);
    onClose();
  };

  const toggleShowCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmNewPassword = () => setShowConfirmNewPassword(!showConfirmNewPassword);

  const handleClose = () => {
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmNewPassword(false);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={handleClose} style={styles.modalCloseButton}>
            {/* Optional: Add a close icon or drag handle here */}
          </TouchableOpacity>
          <Text style={styles.modalPromptStyle}>Set a New Password</Text>

          <Text style={styles.inputLabel}>Current Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter current password"
              placeholderTextColor="#A9A9A9"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrentPassword}
            />
            <TouchableOpacity onPress={toggleShowCurrentPassword} style={styles.inputIconTouchable}>
              <Ionicons
                name={showCurrentPassword ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>New Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter new password"
              placeholderTextColor="#A9A9A9"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
            />
            <TouchableOpacity onPress={toggleShowNewPassword} style={styles.inputIconTouchable}>
              <Ionicons
                name={showNewPassword ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>Confirm New Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Confirm new password"
              placeholderTextColor="#A9A9A9"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              secureTextEntry={!showConfirmNewPassword}
            />
            <TouchableOpacity onPress={toggleShowConfirmNewPassword} style={styles.inputIconTouchable}>
              <Ionicons
                name={showConfirmNewPassword ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.actionModalButton}
            onPress={handleChangePassword}
          >
            <Text style={styles.actionModalButtonText}>Update Password</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};


// --- Screen: SettingsScreen ---
const SettingsScreen = () => {
  const router = useRouter(); 
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const currentUserEmail = "user@example.com"; // Placeholder

  const handleLogout = () => {
    Alert.alert(
      "Log Out", // Title
      "Are you sure you want to log out?", // Message
      [
        {
          text: "No",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            console.log("Logging out...");
            // Add any actual logout logic here (e.g., clearing tokens, user state)
            router.replace("/loginpage"); // Navigate to login page. Adjust route if needed.
          },
          style: "destructive", // iOS only, makes the text red
        },
      ],
      { cancelable: false } // Prevents dismissing by tapping outside on Android
    );
  };

  // Dummy data for the settings list - MOVED INSIDE THE COMPONENT
  const settingsData = [
    {
      id: 'account_management',
      title: 'Account Management',
      items: [
        { id: 'change_email', label: 'Change Email', onPress: () => setEmailModalVisible(true) },
        { id: 'change_password', label: 'Change Password', onPress: () => setPasswordModalVisible(true) },
      ],
    },
    {
      id: 'privacy_policy_section',
      title: 'Privacy Policy',
      items: [
        { id: 'terms_of_service', label: 'Terms of Service', onPress: () => router.push('/termsofservices') }, 
        { id: 'privacy_policy_doc', label: 'Privacy Policy', onPress: () => router.push('/privacypolicy') }, // Updated onPress
      ],
    },
    {
      id: 'app_settings',
      title: 'App Settings',
      items: [
        { id: 'change_language', label: 'Change Language', onPress: () => Alert.alert('Navigation', 'Navigate to Change Language') },
        { id: 'log_out', label: 'Log Out', onPress: handleLogout, isDestructive: true },
      ],
    },
  ];

  return (
    <View style={styles.screenContainer}>
      <AppHeader />
      <View style={styles.separatorLine} />
      <ScrollView
        style={styles.settingsListScrollView}
        contentContainerStyle={styles.settingsListContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {settingsData.map((section) => (
          <SettingsSection
            key={section.id}
            title={section.title}
            items={section.items}
          />
        ))}
      </ScrollView>
      <ChangeEmailModal
        visible={isEmailModalVisible}
        onClose={() => setEmailModalVisible(false)}
        currentEmail={currentUserEmail}
      />
      <ChangePasswordModal
        visible={isPasswordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
      />
    </View>
  );
};

// --- Main App Component ---
export default function App() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#87CEEB" />
      <SettingsScreen />
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  // App Level Styles
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#87CEEB', // Ensures notch/status bar area is blue
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Main background for the settings content area
  },

  // AppHeader Styles
  headerContainer: {
    backgroundColor: '#A0E0FF', // Light sky blue
    paddingTop: 50, // Space from top (adjust if status bar handling is different)
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center', // Center title and subtitle
  },
  headerTitlePrimary: {
    fontSize: 48,
    fontWeight: "500", // A lighter font weight
    color: '#000000',
    textAlign: 'center',
    lineHeight: 50, // To keep "Go-" and "Tanya" close
  },
  headerSubtitleVersion: {
    fontSize: 14,
    color: '#1A1A1A', // Dark grey for readability
    marginTop: 6,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#000000', // Black separator line
  },

  // Settings List Styles
  settingsListScrollView: {
    flex: 1,
  },
  settingsListContentContainer: {
    paddingHorizontal: 20, // Side padding for the list content
    paddingTop: 24,       // Top padding from the separator line
    paddingBottom: 24,    // Bottom padding
  },

  // SettingsSection Styles
  sectionContainer: {
    marginBottom: 24, // Space between sections
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    marginLeft: 4, // Small indent to align with item content
  },

  // SettingsItem Styles
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCDCDC', // Light grey border for items
    borderRadius: 12,       // Rounded corners for items
    marginBottom: 10,       // Space between items in a section
  },
  destructiveItemContainer: {
    backgroundColor: '#FFEBEE', // Very light red background (Material Red 50)
    borderColor: '#D32F2F',    // Darker red border (Material Red 700)
  },
  itemLabel: {
    fontSize: 16,
    color: '#000000',
  },
  destructiveItemLabel: {
    color: '#D32F2F', // Red text for destructive items
  },

  // Modal Styles (adapted from profilepage.tsx and generalized)
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 30,
    width: "100%",
    alignItems: "flex-start", // Changed from "center" to "flex-start"
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  modalCloseButton: { 
    alignSelf: "center",
    width: 50,
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 2.5,
    marginBottom: 15,
  },
  // Styles to mimic profilepage.tsx modal text
  modalGreetingStyle: { // Similar to modalGreeting in profilepage
    fontSize: 22,
    fontWeight: "normal",
    color: "#000000",
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  modalPromptStyle: { // Similar to modalPrompt in profilepage
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 25,
    alignSelf: "flex-start",
  },
  // Remove or comment out old modalTitle and modalSubtitle if not used elsewhere
  // modalTitle: {
  //   fontSize: 22,
  //   fontWeight: "bold",
  //   color: "#000000",
  //   marginBottom: 8,
  //   textAlign: 'center',
  // },
  // modalSubtitle: {
  //   fontSize: 16,
  //   color: "#555555",
  //   marginBottom: 20,
  //   textAlign: 'center',
  // },
  inputLabel: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 8,
    alignSelf: "flex-start", 
    // width: '100%', // This can be kept or removed, alignSelf: "flex-start" is key
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // Changed from "#F0F0F0"
    borderWidth: 1,
    borderColor: "#B0B0B0", // Changed from "#D0D0D0"
    borderRadius: 25, // Changed from 12
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 20, // Changed from 30 to reduce spacing
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
  },
  inputIcon: { // Style for non-touchable icons like email
    marginLeft: 10,
  },
  inputIconTouchable: { // Style for the touchable eye icon
    padding: 5, // Add some padding to make it easier to press
    marginLeft: 5,
  },
  actionModalButton: {
    backgroundColor: "#0A0A2A", // Matched with profilepage.tsx button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    // marginTop: 10, // Removed as marginBottom on inputContainer is now 30
  },
  actionModalButtonText: {
    color: "#FFD700", // Gold/Yellow from profile page
    fontSize: 17,
    fontWeight: "bold",
  },
});