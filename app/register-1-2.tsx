import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import useRouter
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Define the structure for an education level
interface EducationLevel {
  id: string;
  label: string;
  imageSource: ImageSourcePropType; // Using ImageSourcePropType for network or local images
}

// --- PLACEHOLDER IMAGE URLS ---
const placeholderBaseUrl = "https://via.placeholder.com/";
const imageSize = "100x100"; // You can adjust the size
const elementaryPlaceholder = `${placeholderBaseUrl}${imageSize}/FFC0CB/000000?Text=Elementary`;
const juniorHighPlaceholder = `${placeholderBaseUrl}${imageSize}/ADD8E6/000000?Text=Junior+HS`;
const seniorHighPlaceholder = `${placeholderBaseUrl}${imageSize}/90EE90/000000?Text=Senior+HS`;
const collegePlaceholder = `${placeholderBaseUrl}${imageSize}/FFFFE0/000000?Text=College`;
// --- END PLACEHOLDER IMAGE URLS ---

const educationLevelsData: EducationLevel[] = [
  {
    id: "elementary",
    label: "Elementary School",
    imageSource: { uri: elementaryPlaceholder },
  },
  {
    id: "junior_high",
    label: "Junior High School",
    imageSource: { uri: juniorHighPlaceholder },
  },
  {
    id: "senior_high",
    label: "Senior High School",
    imageSource: { uri: seniorHighPlaceholder },
  },
  { id: "college", label: "College", imageSource: { uri: collegePlaceholder } },
];

const { height } = Dimensions.get("window");

export default function App() {
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const router = useRouter(); // Initialize router

  const handleSelectLevel = (id: string) => {
    setSelectedLevelId(id);
  };

  const handleCompleteSignup = () => {
    if (selectedLevelId) {
      // If education level is selected, navigate to landing page
      console.log("Selected Education Level:", selectedLevelId);
      router.push("/landingpage");
    } else {
      // Only show alert if no education level is selected
      Alert.alert(
        "Education Level Required",
        "Please select your education level to continue.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#A0E9FF" />
      <View style={styles.topBlueBackground}>
        <Text style={styles.appNameTextLarge}>Go-</Text>
        <Text style={styles.appNameTextLarge}>Tanya</Text>
      </View>

      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.greetingText}>Hello Gabriel !!!</Text>
          <Text style={styles.welcomeText}>Welcome to Go-Tanya</Text>
          <Text style={styles.instructionText}>
            Please choose your education level correctly
          </Text>

          <View style={styles.levelsGrid}>
            {educationLevelsData.map((level) => (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.levelCard,
                  selectedLevelId === level.id && styles.selectedLevelCard,
                ]}
                onPress={() => handleSelectLevel(level.id)}
                activeOpacity={0.7}
              >
                <Image source={level.imageSource} style={styles.levelImage} />
                <Text style={styles.levelLabel}>{level.label}</Text>
                <MaterialCommunityIcons
                  name={
                    selectedLevelId === level.id
                      ? "radiobox-marked"
                      : "radiobox-blank"
                  }
                  size={24}
                  color={selectedLevelId === level.id ? "#007AFF" : "#CCCCCC"}
                  style={styles.radioIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.completeButton}
        onPress={handleCompleteSignup}
        activeOpacity={0.7} // Changed from 0.8 to match registerpage
      >
        <Text style={styles.completeButtonText}>Complete Signup</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topBlueBackground: {
    backgroundColor: "#A0E9FF",
    height: height * 0.35,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  appNameTextLarge: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#000000",
    lineHeight: 65,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 80, // Space for the sticky button
    // height: 1000,
  },
  greetingText: {
    fontSize: 22,
    color: "#333333",
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 15,
  },
  instructionText: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 25,
    textAlign: "center",
  },
  levelsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  levelCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedLevelCard: {
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  levelImage: {
    width: 70, // Original image size
    height: 70, // Original image size
    resizeMode: "contain",
    marginBottom: 10,
    backgroundColor: "#f0f0f0", // A light background for the placeholder image area
  },
  levelLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
    minHeight: 35,
  },
  radioIcon: {
    marginTop: 10,
  },
  completeButton: {
    backgroundColor: "#141330",
    paddingVertical: 18,
    marginHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  completeButtonText: {
    color: "#ffd700",
    fontSize: 18,
    fontWeight: "bold",
  },
});
