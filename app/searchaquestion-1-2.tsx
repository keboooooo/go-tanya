// App.tsx (or a new component file, e.g., HomeScreen.tsx)
import { AntDesign, Ionicons } from '@expo/vector-icons'; // AntDesign for heart icon
import { useLocalSearchParams } from 'expo-router'; // Import useLocalSearchParams
import React, { useEffect, useState } from 'react'; // Import useEffect
import {
    FlatList,
    Platform, // For clickable elements like the profile icon or cards
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// Define a type for our question items
interface QuestionItem {
  id: string;
  userImageUri?: string; // Optional: URI for user image
  userNameOrCategory: string;
  likes: number;
  questionTitle: string;
  answerSnippet: string;
}

// Sample Data - replace with your actual data source
const DUMMY_QUESTIONS: QuestionItem[] = [
  {
    id: '1',
    userImageUri: 'https://i.pravatar.cc/150?img=1', // Placeholder image
    userNameOrCategory: 'Jaringan Komputer',
    likes: 19,
    questionTitle: 'apa yang dimaksud dengan mikrotik?',
    answerSnippet:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque eget diam vitae accumsan. Fusce sed risus in nisi semper malesuada quis sed sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis efficitur mauris quis nisl interdum elementum a varius lectus.',
  },
  {
    id: '2',
    userImageUri: 'https://i.pravatar.cc/150?img=2', // Placeholder image
    userNameOrCategory: 'Jaringan Komputer',
    likes: 19,
    questionTitle: 'apa itu mikrotik?',
    answerSnippet:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque eget diam vitae accumsan. Fusce sed risus in nisi semper malesuada quis sed sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis efficitur mauris quis nisl interdum elementum a varius lectus.',
  },
  {
    id: '3',
    userImageUri: 'https://i.pravatar.cc/150?img=3',
    userNameOrCategory: 'Pemrograman Web',
    likes: 25,
    questionTitle: 'Bagaimana cara kerja React Native?',
    answerSnippet:
      'React Native memungkinkan Anda membangun aplikasi seluler menggunakan JavaScript dan React. Ini menjembatani ke API asli, memungkinkan kinerja yang mendekati asli.',
  },
];

// Component for each question card
const QuestionCard: React.FC<{ item: QuestionItem }> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        {/* Always render the placeholder */}
        <View style={[styles.cardUserImage, styles.cardUserImagePlaceholder]}>
            <Ionicons name="person" size={18} color="#FFF" />
        </View>
        <Text style={styles.cardCategory}>{item.userNameOrCategory}</Text>
        <View style={styles.cardLikesContainer}>
          <AntDesign name="heart" size={16} color="#FF6347" />
          <Text style={styles.cardLikesText}>{item.likes}</Text>
        </View>
      </View>
      <Text style={styles.cardQuestionTitle}>{item.questionTitle}</Text>
      <Text style={styles.cardAnswerSnippet} numberOfLines={3} ellipsizeMode="tail">
        {item.answerSnippet}
      </Text>
    </TouchableOpacity>
  );
};


export default function App() { // Rename to SearchResultsScreen if it's a separate component
  const params = useLocalSearchParams<{ query?: string }>(); // Get query params
  const [searchText, setSearchText] = useState('');
  // const router = useRouter(); // You might need router for other actions

  useEffect(() => {
    if (params.query) {
      setSearchText(params.query);
      // TODO: Filter DUMMY_QUESTIONS based on params.query or fetch new data
      // For now, DUMMY_QUESTIONS will remain unfiltered.
    }
  }, [params.query]);

  // Filter questions based on searchText (case-insensitive)
  // This is a simple client-side filter. For larger datasets, consider server-side filtering.
  const filteredQuestions = DUMMY_QUESTIONS.filter(question =>
    question.questionTitle.toLowerCase().includes(searchText.toLowerCase()) ||
    question.answerSnippet.toLowerCase().includes(searchText.toLowerCase()) ||
    question.userNameOrCategory.toLowerCase().includes(searchText.toLowerCase())
  );


  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#A0E0FF" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Go-{"\n"}Tanya</Text>
        <TouchableOpacity>
            <Ionicons name="person-circle" size={50} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search questions..."
          placeholderTextColor="#A0A0A0"
          value={searchText} // Display the received or typed search text
          onChangeText={setSearchText} // Allow user to refine search on this screen
          // No search icon inside the input this time, as per the image
        />
      </View>

      <FlatList
        data={filteredQuestions} // Use filtered questions
        renderItem={({ item }) => <QuestionCard item={item} />}
        keyExtractor={(item) => item.id}
        style={styles.listContainer}
        contentContainerStyle={styles.listContentContainer}
        // showsVerticalScrollIndicator={false} // Optional: hide scrollbar
        ListEmptyComponent={<Text style={styles.emptyListText}>No results found for "{searchText}"</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F2F5', // A light greyish background for the whole screen
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: '#A0E0FF', // Light blue
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 15, 
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', 
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF', // White background for the search bar area
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  searchInput: {
    backgroundColor: '#FFFFFF', // White background for input
    borderColor: '#D0D0D0',    // Grey border
    borderWidth: 1,
    borderRadius: 20,          // Slightly rounded corners
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8, // Adjust padding for different platforms
    fontSize: 16,
    color: '#333',
    height: 42, // Set a fixed height
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#F0F2F5', // Background for the list area
  },
  listContentContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  emptyListText: { // Style for the empty list message
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  // Card Styles
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardUserImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: '#D0D0D0', // Placeholder background
  },
  cardUserImagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B0B0B0',
  },
  cardCategory: {
    flex: 1, // Take available space
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  cardLikesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLikesText: {
    fontSize: 14,
    color: '#FF6347', // Red color for likes
    marginLeft: 5,
    fontWeight: '500',
  },
  cardQuestionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  cardAnswerSnippet: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});
