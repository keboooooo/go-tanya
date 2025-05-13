// App.tsx
// All components (App, Section, QuestionCard) are defined in this single file.

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import useRouter for navigation
import React from "react";
import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// --- Types ---
interface QuestionItem {
  id: string;
  avatar?: any; // Made optional since we're now using Ionicons
  title: string;
  likes: number;
  text: string;
}

// --- Mock Data ---
const RECENT_QUESTIONS_DATA: QuestionItem[] = [
  {
    id: "1",
    title: "Rekayasa Perangkat Lunak",
    likes: 19,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis, turpis ac gravida semper, nisi nisi viverra leo",
  },
  {
    id: "2",
    title: "Pemrograman Berbasis Platform",
    likes: 19,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis, turpis ac gravida semper, nisi nisi viverra leo",
  },
  {
    id: "3",
    title: "Data Science",
    likes: 25,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis, turpis ac gravida semper, nisi nisi viverra leo",
  },
];

const RECENT_ANSWERED_DATA: QuestionItem[] = [
  {
    id: "4",
    title: "Rekayasa Perangkat Lunak",
    likes: 19,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis, turpis ac gravida semper, nisi nisi viverra leo",
  },
  {
    id: "5",
    title: "Pemrograman Berbasis Platform",
    likes: 19,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis, turpis ac gravida semper, nisi nisi viverra leo",
  },
];

// --- Reusable Components defined in the same file ---

// Question Card Component
const QuestionCard: React.FC<{ item: QuestionItem }> = ({ item }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => console.log(`Card pressed: ${item.title}`)}
    activeOpacity={0.7} // This makes the press animation more subtle
  >
    <View style={styles.cardHeader}>
      <Ionicons name="person-circle" size={32} color="#4A4A4A" />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <View style={styles.cardLikesContainer}>
        <Ionicons name="heart" size={18} color="#FF6347" />
        <Text style={styles.cardLikesText}> {item.likes}</Text>
      </View>
    </View>
    <Text style={styles.cardText} numberOfLines={3} ellipsizeMode="tail">
      {item.text}
    </Text>
  </TouchableOpacity>
);

// Section Component for "Recent Question" and "Recent Answered"
const Section: React.FC<{ title: string; data: QuestionItem[] }> = ({
  title,
  data,
}) => {
  const router = useRouter(); // Initialize router for navigation

  const handleSeeAllPress = () => {
    if (title === "Recent Question") {
      router.push("/recentquestion");
    } else if (title === "Recent Answered") {
      router.push("/recentanswered"); // Assuming you have a recentanswered.tsx page
    } else {
      console.log(`See all ${title}`);
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={handleSeeAllPress}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <QuestionCard item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardListContentContainer} // Ensures padding for the last item's shadow
      />
    </View>
  );
};

// --- Main App Component ---
export default function App() {
  const router = useRouter(); // Initialize router for navigation

  const handleProfilePress = () => {
    router.push("/profilepage"); // Navigate to the profile page
  };

  const handleAskQuestionPress = () => {
    router.push("/askaquestion"); // Navigate to the ask a question page
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#A0D2EB" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.appNameLine1}>Go-</Text>
            <Text style={styles.appNameLine2}>Tanya</Text>
          </View>
          <TouchableOpacity
            style={styles.profileIconContainer}
            onPress={handleProfilePress}
          >
            {/* Using a simple View for placeholder, replace with actual icon/image */}
            <Ionicons name="person-circle" size={50} color="#4A4A4A" />
          </TouchableOpacity>
          <Text style={styles.greetingText}>Hello Gabriel !!!</Text>
          <Text style={styles.subGreetingText}>What you wanna do today ?</Text>
        </View>

        {/* Action Buttons Card */}
        <View style={styles.actionCard}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleAskQuestionPress}
          >
            <View style={styles.actionButtonIconBg}>
              <MaterialCommunityIcons
                name="lightbulb-on-outline"
                size={32}
                color="#000"
              />
            </View>
            <Text style={styles.actionButtonText}>Asking a</Text>
            <Text style={styles.actionButtonText}>Question</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => console.log("Search Question Pressed")}
          >
            <View style={styles.actionButtonIconBg}>
              <Ionicons name="search-outline" size={32} color="#000" />
            </View>
            <Text style={styles.actionButtonText}>Search a</Text>
            <Text style={styles.actionButtonText}>Question</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Questions Section */}
        <Section title="Recent Question" data={RECENT_QUESTIONS_DATA} />

        {/* Recent Answered Section */}
        <Section title="Recent Answered" data={RECENT_ANSWERED_DATA} />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA", // A very light grey for the overall app background
  },
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 30, // Ensures space at the end of the scroll view
  },
  header: {
    backgroundColor: "#A0E0FF", // Light blue color from image
    paddingTop:
      Platform.OS === "android" ? StatusBar.currentHeight || 20 + 10 : 20, // Adjust for status bar on Android
    paddingHorizontal: 20,
    paddingBottom: 70, // Increased padding to push action card down and allow overlap
  },
  appNameLine1: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000", // Black text
  },
  appNameLine2: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000", // Black text
    marginTop: -12, // To bring "Tanya" closer to "Go-"
  },
  profileIconContainer: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight || 20 + 10 : 30, // Adjust for status bar
    right: 20,
    // backgroundColor: '#E0E0E0', // Placeholder background for icon if needed
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000", // Black text
    marginTop: 25,
  },
  subGreetingText: {
    fontSize: 16,
    color: "#333333", // Dark grey text
  },
  actionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginTop: -50, // Negative margin to overlap with header
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    // Shadow for Android
    elevation: 6,
  },
  actionButton: {
    alignItems: "center",
    flex: 1, // So they take equal space
    paddingHorizontal: 5, // Add some spacing if text is too long
  },
  actionButtonIconBg: {
    backgroundColor: "#BCE6FF", // Lighter blue for icon background
    width: 70,
    height: 70,
    borderRadius: 15, // Rounded corners as per image
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000", // Black text
    textAlign: "center",
  },
  sectionContainer: {
    marginTop: 30,
    // paddingHorizontal: 20, // Moved to FlatList contentContainer for better edge spacing control
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 20, // Add horizontal padding here for the header
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000", // Black text
  },
  seeAllText: {
    fontSize: 14,
    color: "#4A90E2", // A slightly more vibrant blue for "See all"
    fontWeight: "500",
  },
  cardListContentContainer: {
    paddingHorizontal: 20, // Ensures padding on the sides of the list
    paddingRight: 5, // Ensures the last card's shadow isn't cut off
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    width: 230, // Fixed width for horizontal scroll items
    marginRight: 15, // Space between cards
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    // Shadow for Android
    elevation: 4,
    borderWidth: Platform.OS === "android" ? 0 : 1, // Optional: slight border for iOS if shadow is subtle
    borderColor: "#EAEAEA",
    marginBottom: 5, // For shadow visibility on Android
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000", // Black text
    flex: 1, // To push likes to the right
    marginLeft: 10, // Add margin to separate from the icon
  },
  cardLikesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  cardLikesText: {
    fontSize: 14,
    color: "#333333", // Dark grey text
    marginLeft: 4,
    fontWeight: "500",
  },
  cardText: {
    fontSize: 13,
    color: "#555555", // Medium grey text
    lineHeight: 18,
  },
});
