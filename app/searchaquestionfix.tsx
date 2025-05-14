// App.tsx (or a new component file, e.g., SearchScreen.tsx)
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons'; // Added AntDesign
import React, { useState } from 'react'; // Removed useEffect as it's not used here for now
import {
    FlatList, // Added FlatList
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// Define a type for our question items (copied from searchaquestion-1-2.tsx)
interface QuestionItem {
  id: string;
  userImageUri?: string;
  userNameOrCategory: string;
  likes: number;
  questionTitle: string;
  answerSnippet: string;
}

// Sample Data (copied from searchaquestion-1-2.tsx)
// In a real app, you'd fetch this or manage it globally
const DUMMY_QUESTIONS: QuestionItem[] = [
  {
    id: '1',
    userImageUri: 'https://i.pravatar.cc/150?img=1',
    userNameOrCategory: 'Jaringan Komputer',
    likes: 19,
    questionTitle: 'apa yang dimaksud dengan mikrotik?',
    answerSnippet:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque eget diam vitae accumsan. Fusce sed risus in nisi semper malesuada quis sed sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis efficitur mauris quis nisl interdum elementum a varius lectus.',
  },
  {
    id: '2',
    userImageUri: 'https://i.pravatar.cc/150?img=2',
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

// Component for each question card (copied from searchaquestion-1-2.tsx)
const QuestionCard: React.FC<{ item: QuestionItem }> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
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

export default function SearchaquestionFix() {
  const [searchText, setSearchText] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionItem[]>([]);
  // const router = useRouter(); // No longer needed for navigation here

  const handleSearch = () => {
    const query = searchText.trim().toLowerCase();
    if (query === '') {
      setFilteredQuestions([]); // Clear results if search is empty
      return;
    }
    const results = DUMMY_QUESTIONS.filter(question =>
      question.questionTitle.toLowerCase().includes(query) ||
      question.answerSnippet.toLowerCase().includes(query) ||
      question.userNameOrCategory.toLowerCase().includes(query)
    );
    setFilteredQuestions(results);
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#A0E0FF" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Go-{"\n"}Tanya</Text>
        <TouchableOpacity> {/* Assuming this might be for a profile screen later */}
            <Ionicons name="person-circle" size={50} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#A0A0A0"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity onPress={handleSearch}>
            <Feather name="search" size={22} color="#777" style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredQuestions}
        renderItem={({ item }) => <QuestionCard item={item} />}
        keyExtractor={(item) => item.id}
        style={styles.listContainer} // Use new styles
        contentContainerStyle={styles.listContentContainer} // Use new styles
        ListEmptyComponent={
          // Show message only if a search has been attempted (searchText is not empty but no results)
          // Or a generic message if nothing is typed yet and filteredQuestions is empty.
          // For simplicity, let's show a message if filteredQuestions is empty AFTER a search might have occurred.
          searchText.trim() !== '' && filteredQuestions.length === 0 ? (
            <Text style={styles.emptyListText}>No results found for "{searchText}"</Text>
          ) : (
            <Text style={styles.emptyListText}>Enter a search term to see results.</Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F2F5', // Changed to light grey for consistency with results page
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: '#A0D2EB', // Light blue
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 15, 
    borderBottomWidth: 1, // Thin line separating header from search bar
    borderBottomColor: '#E0E0E0', 
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333', // Dark grey text
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF', 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0', 
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5', // Light grey background for the input field itself
    borderRadius: 25, // Fully rounded ends
    paddingHorizontal: 15,
    height: 45, // Fixed height for the search bar
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8, 
  },
  searchIcon: {
    marginLeft: 10, 
  },
  // Removed contentArea, replaced by listContainer and specific list styles
  // listContainer and card styles (copied and adapted from searchaquestion-1-2.tsx)
  listContainer: {
    flex: 1,
    // backgroundColor: '#F0F2F5', // Already set in safeArea
  },
  listContentContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
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
    backgroundColor: '#D0D0D0',
  },
  cardUserImagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B0B0B0',
  },
  cardCategory: {
    flex: 1,
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
    color: '#FF6347',
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
