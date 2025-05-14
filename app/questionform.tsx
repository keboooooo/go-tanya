import { Feather, Ionicons } from '@expo/vector-icons'; // Import Feather
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'; // Import useState
import {
  Platform,
  StatusBar as ReactNativeStatusBar // Alias to avoid conflict with Expo StatusBar component if used differently
  ,

  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Define types for our data
interface User {
  id: string;
  // We won't use name for the placeholder icon display explicitly in the component
  // but it's good practice to have it in a real app.
  // name: string;
}

interface CommentData {
  id: string;
  user: User;
  questionText: string;
  commentText: string;
  isLikedByCurrentUser: boolean; // Initial state for the heart icon
  // The image doesn't show counts for thumbs up/down on comments,
  // so we'll just show the icons.
}

interface PostData {
  id: string;
  categoryTitle: string; // "Jaringan Komputer"
  author: User;
  questionText: string;
  contentText: string;
  likes: number;
  comments: CommentData[];
}

// Sample Data
const samplePost: PostData = {
  id: '1',
  categoryTitle: 'Jaringan Komputer',
  author: { id: 'user1' },
  questionText: 'apa yang dimaksud dengan mikrotik?',
  contentText:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque eget diam vitae accumsan. Fusce sed risus in nisi semper malesuada quis sed sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis efficitur mauris quis nisl interdum elementum a varius lectus.',
  likes: 19,
  comments: [
    {
      id: 'c1',
      user: { id: 'user2' },
      questionText: 'apa yang dimaksud dengan mikrotik?',
      commentText:
        'Mikrotik adalah Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque eget diam vitae accumsan. Fusce sed risus in nisi semper malesuada quis sed sem.',
      isLikedByCurrentUser: true,
    },
    {
      id: 'c2',
      user: { id: 'user3' },
      questionText: 'apa yang dimaksud dengan mikrotik?',
      commentText:
        'Mikrotik adalah Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque eget diam vitae accumsan. Fusce sed risus in nisi semper malesuada quis sed sem.',
      isLikedByCurrentUser: false,
    },
  ],
};

// Components

const Header: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Go-{"\n"}Tanya</Text>
      <Ionicons name="person-circle-outline" size={50} color="#333333" />
    </View>
  );
};

const Comment: React.FC<CommentData> = ({
  questionText,
  commentText,
  isLikedByCurrentUser: initialIsLiked, // Rename prop for clarity
}) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isThumbsUp, setIsThumbsUp] = useState(false);
  const [isThumbsDown, setIsThumbsDown] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // If liked, ensure thumbs down is not active
    if (!isLiked) {
      setIsThumbsDown(false);
    }
  };

  const handleThumbsUp = () => {
    setIsThumbsUp(!isThumbsUp);
    // If thumbs up, ensure thumbs down is not active
    if (!isThumbsUp) {
      setIsThumbsDown(false);
    }
  };

  const handleThumbsDown = () => {
    setIsThumbsDown(!isThumbsDown);
    // If thumbs down, ensure liked and thumbs up are not active
    if (!isThumbsDown) {
      setIsLiked(false);
      setIsThumbsUp(false);
    }
  };

  return (
    <View style={styles.commentContainer}>
      <View style={styles.reactionIcons}>
        <TouchableOpacity onPress={handleLike}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={24} // Keeping original size for heart, can be 22 if preferred
            color={isLiked ? '#FF6347' : '#888'}
            style={styles.reactionIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleThumbsUp}>
          <Feather 
            name="thumbs-up" 
            size={22} 
            color={isThumbsUp ? '#597afb' : '#888'} 
            style={styles.reactionIcon} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleThumbsDown}>
          <Feather 
            name="thumbs-down" 
            size={22} 
            color={isThumbsDown ? '#597afb' : '#888'} 
            style={styles.reactionIcon} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.commentBubble}>
        <View style={styles.commentHeader}>
          <Ionicons name="person-circle-outline" size={36} color="#555" />
          <Text style={styles.commentQuestionText}>{questionText}</Text>
        </View>
        <Text style={styles.commentText}>{commentText}</Text>
      </View>
    </View>
  );
};

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor="#87CEEB" />
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.mainCard}>
          <Text style={styles.categoryTitle}>{samplePost.categoryTitle}</Text>
          
          <View style={styles.postContentContainer}>
            <View style={styles.postHeader}>
                <Ionicons name="person-circle-outline" size={40} color="#555" style={styles.postAuthorIcon} />
                <Text style={styles.postQuestionText}>{samplePost.questionText}</Text>
                <View style={styles.likesContainer}>
                    <Ionicons name="heart" size={20} color="#FF6347" />
                    <Text style={styles.likesCount}>{samplePost.likes}</Text>
                </View>
            </View>
            <Text style={styles.postBodyText}>{samplePost.contentText}</Text>
          </View>

          {samplePost.comments.map((comment) => (
            <Comment
              key={comment.id}
              {...comment}
            />
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={30} color="#ffd700" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F0F0', // Light gray background for the very back
    paddingTop: Platform.OS === 'android' ? ReactNativeStatusBar.currentHeight : 0, // Match askaquestion
  },
  headerContainer: {
    backgroundColor: '#A0E0FF', // Sky blue
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    // paddingVertical: 15, // We'll set paddingTop and paddingBottom explicitly
    paddingBottom: 15, // Match askaquestion's vertical padding distribution
    paddingTop: Platform.OS === 'ios' ? 40 : 15, // Match askaquestion
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Matched from askaquestion
  },
  headerTitle: { // New style, similar to askaquestion
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333', // Dark grey text, matched from askaquestion
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 80, // Space for FAB
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    margin: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10, // Add some padding at the bottom of the card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 15,
  },
  postContentContainer: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postAuthorIcon: {
    marginRight: 10,
  },
  postQuestionText: {
    flex: 1, // Take available space
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
    marginRight: 10, // Space before likes
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F0', // Light red background for likes
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  likesCount: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  postBodyText: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the top
    marginVertical: 10,
  },
  reactionIcons: {
    marginRight: 10,
    alignItems: 'center',
    paddingTop: 10, // Align with top of comment bubble content
  },
  reactionIcon: {
    marginBottom: 12, // Space between reaction icons
  },
  commentBubble: {
    flex: 1,
    backgroundColor: '#E6FFE6', // Light green
    borderRadius: 15,
    padding: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentQuestionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 8,
    flexShrink: 1, // Allow text to wrap
  },
  commentText: {
    fontSize: 14,
    color: '#444444',
    lineHeight: 19,
  },
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 50,
    backgroundColor: '#141330', // Dark blue
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});

export default App;
