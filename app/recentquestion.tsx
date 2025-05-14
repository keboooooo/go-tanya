import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import useRouter
import React, { useState } from "react";
import {
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
  avatar?: any; // Use 'any' for require or string for URI
  title: string;
  likes: number;
  body: string;
  imagePlaceholder?: boolean; // To show the generic image placeholder
}

// --- Dummy Data ---
const DUMMY_QUESTIONS: QuestionItem[] = [
  {
    id: "1",
    title: "Rekayasa Perangkat Lunak",
    likes: 19,
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque eget diam vitae accumsan. Fusce sed risus in nisi semper malesuada quis sed sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis efficitur mauris quis nisl interdum elementum a varius lectus.",
  },
  {
    id: "2",
    title: "Pemrograman Berbasis Platform",
    likes: 19,
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque eget diam vitae accumsan. Fusce sed risus in nisi semper malesuada quis sed sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis efficitur mauris quis nisl interdum elementum a varius lectus.",
  },
  {
    id: "3",
    title: "Keamanan Data & Informasi",
    likes: 19,
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque eget diam vitae accumsan. Fusce sed risus in nisi semper malesuada quis sed sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    imagePlaceholder: true,
  },
  {
    id: "4",
    title: "Pemrograman Dasar",
    likes: 19,
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque eget diam vitae accumsan. Fusce sed risus in nisi semper malesuada quis sed sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis efficitur mauris quis nisl interdum elementum a varius lectus.",
  },
  {
    id: "5",
    title: "Basis Data",
    likes: 19,
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque eget diam vitae accumsan. Fusce sed risus in nisi semper malesuada quis sed sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    imagePlaceholder: true,
  },
  {
    id: "6",
    title: "Jaringan Komputer",
    likes: 25,
    body: "Consectetur adipiscing elit. Vivamus pellentesque eget diam vitae accumsan. Fusce sed risus in nisi semper malesuada quis sed sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis efficitur mauris quis nisl interdum elementum a varius lectus.",
  },
  {
    id: "7",
    title: "Kecerdasan Buatan",
    likes: 30,
    body: "Vivamus pellentesque eget diam vitae accumsan. Fusce sed risus in nisi semper malesuada quis sed sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis efficitur mauris quis nisl interdum elementum a varius lectus.",
    imagePlaceholder: true,
  },
  {
    id: "8",
    title: "Analisis Algoritma",
    likes: 15,
    body: "Fusce sed risus in nisi semper malesuada quis sed sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis efficitur mauris quis nisl interdum elementum a varius lectus.",
  },
  {
    id: "9",
    title: "Struktur Data",
    likes: 22,
    body: "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis efficitur mauris quis nisl interdum elementum a varius lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imagePlaceholder: true,
  },
  {
    id: "10",
    title: "Sistem Operasi",
    likes: 18,
    body: "Duis efficitur mauris quis nisl interdum elementum a varius lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque eget diam vitae accumsan.",
  },
];

const QUESTIONS_PER_PAGE = 5;

// --- Question Card Component ---
const QuestionCard: React.FC<{ item: QuestionItem }> = ({ item }) => {
  const router = useRouter(); // Initialize router

  const handleCardPress = () => {
    router.push({
      pathname: '/questionform',
      params: {
        id: item.id,
        // Assuming item.title from recentquestion is the main question text for questionform
        questionText: item.title, 
        // Assuming item.body from recentquestion is the detailed content for questionform
        contentText: item.body,  
        likes: item.likes.toString(),
        // categoryTitle: item.category, // If you have category in your item
        // attachmentUri: item.actualUri, // If your item had a real URI
        imagePlaceholder: item.imagePlaceholder?.toString() || 'false', // Pass as string
      },
    });
  };

  return (
    <TouchableOpacity onPress={handleCardPress} activeOpacity={0.7}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <Ionicons
              name="person-circle-outline"
              size={30}
              color="#555"
              style={styles.avatarPlaceholder}
            />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
          <View style={styles.likesContainer}>
            <Ionicons name="heart" size={20} color="#FF6347" />
            <Text style={styles.likesText}>{item.likes}</Text>
          </View>
        </View>
        <View style={styles.cardBody}>
          {item.imagePlaceholder && (
            <View style={styles.imagePlaceholderContainer}>
              <Ionicons name="image-outline" size={60} color="#B0B0B0" />
            </View>
          )}
          <Text style={styles.cardBodyText}>{item.body}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// --- Main App Component ---
export default function App() {
  const [visibleQuestionsCount, setVisibleQuestionsCount] =
    useState(QUESTIONS_PER_PAGE);

  const handleLoadMore = () => {
    setVisibleQuestionsCount((prevCount) => prevCount + QUESTIONS_PER_PAGE);
  };

  const displayedQuestions = DUMMY_QUESTIONS.slice(0, visibleQuestionsCount);
  const canLoadMore = visibleQuestionsCount < DUMMY_QUESTIONS.length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#A0E7FF" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Go-{"\n"}
          Tanya
        </Text>
        <Ionicons name="person-circle" size={50} color="#333333" />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.contentScrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.recentQuestionTitle}>Recent Question</Text>

        {displayedQuestions.map((question) => (
          <QuestionCard key={question.id} item={question} />
        ))}

        {canLoadMore && (
          <TouchableOpacity style={styles.moreButton} onPress={handleLoadMore}>
            <Text style={styles.moreButtonText}>More...</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF", // White background for the content area
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Handle Android status bar
  },
  header: {
    backgroundColor: "#A0E7FF", // Light blue
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 25, // More padding at the bottom of header
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000000", // Black
  },
  contentScrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingBottom: 40, // Increased paddingBottom from 20 to 40
  },
  recentQuestionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
    marginVertical: 20,
  },
  // Card Styles
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    marginBottom: 15,
    padding: 0, // Remove padding from card itself, add to children
    overflow: "hidden", // Ensures border radius is applied to children
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Allow title to take available space
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  avatarPlaceholder: {
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    flexShrink: 1, // Allow text to shrink if too long
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10, // Add some space from title
  },
  likesText: {
    fontSize: 14,
    color: "#333333",
    marginLeft: 5,
  },
  cardBody: {
    padding: 15,
  },
  imagePlaceholderContainer: {
    backgroundColor: "#F0F0F0",
    height: 100, // Adjust as needed
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  cardBodyText: {
    fontSize: 14,
    color: "#555555",
    lineHeight: 20,
  },
  // More Button
  moreButton: {
    backgroundColor: "#1A0F35", // Dark blue/purple
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center", // Center the button
    marginTop: 10, // Space above the button
    marginBottom: 20, // Space below the button
  },
  moreButtonText: {
    color: "#ffd700",
    fontSize: 18,
    fontWeight: "bold",
  },
});
