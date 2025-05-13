import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import useRouter
import React from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfilePage: React.FC = () => {
  const router = useRouter(); // Initialize router

  const handleBackToHomepage = () => {
    router.push("/landingpage"); // Navigate to landing page
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.container.backgroundColor}
      />
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Go-{"\n"}
            Tanya
          </Text>
          <TouchableOpacity onPress={() => console.log("Settings pressed")}>
            <Ionicons name="settings-outline" size={36} color="black" />
          </TouchableOpacity>
        </View>

        {/* Profile Image Section */}
        <View style={styles.profileImageContainer}>
          {/* This is a placeholder for an image. Using an icon for simplicity. */}
          <Ionicons name="person" size={100} color="#333333" />
        </View>

        {/* Username Section */}
        <Text style={styles.username}>Gabriel</Text>

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
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => console.log("Change Username pressed")}
          >
            <Text style={styles.actionButtonText}>Change{"\n"}Username</Text>
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
              <Text style={styles.infoCardLabel}>Answer a{"\n"}Question</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#A0E0FF", // Light blue background
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
    // For the inner darker circle, you could add another View inside
    // or use a border if the icon itself doesn't provide the effect.
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
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 2,
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
    // backgroundColor: "#D6D6D634", // Background same as page
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
});

export default ProfilePage;
