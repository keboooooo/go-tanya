import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router'; // Import useLocalSearchParams
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Image, // Ensure Image is imported
  Platform,
  StatusBar as ReactNativeStatusBar,
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
}

interface CommentData {
  id: string;
  user: User;
  questionText: string;
  commentText: string;
  isLikedByCurrentUser: boolean;
}

interface PostData {
  id: string;
  user: User; // Changed from author to user to match samplePost structure if it was a mistake
  categoryTitle: string;
  questionText: string;
  contentText: string;
  likes: number;
  comments: CommentData[];
  attachmentUri?: string;
  imagePlaceholder?: boolean; // Added for placeholder logic
}

// Sample Data (can serve as a fallback or for structure)
const sampleUser: User = { id: 'user123' }; // Define sampleUser if not already
const samplePost: PostData = {
  id: 'post1',
  user: sampleUser,
  categoryTitle: 'Jaringan Komputer',
  questionText: 'Apa yang dimaksud dengan Mikrotik?',
  contentText:
    'Saya baru belajar jaringan dan sering mendengar istilah Mikrotik. Bisa tolong jelaskan apa itu Mikrotik, fungsi utamanya, dan mungkin contoh penggunaannya dalam skala kecil?',
  likes: 193,
  // attachmentUri: 'https://i.imgur.com/SYLSbCdb.jpg', // Example if URI is directly in sample
  // imagePlaceholder: false, // Example
  comments: [
    {
      id: 'comment1',
      user: sampleUser,
      questionText: 'Re: Apa yang dimaksud dengan Mikrotik?',
      commentText:
        'Mikrotik itu sebenarnya nama perusahaan Latvia yang mengembangkan perangkat keras dan perangkat lunak untuk jaringan komputer. Produknya yang paling terkenal itu RouterOS dan RouterBOARD.',
      isLikedByCurrentUser: true,
    },
    {
      id: 'comment2',
      user: sampleUser,
      questionText: 'Re: Apa yang dimaksud dengan Mikrotik?',
      commentText:
        'Singkatnya, Mikrotik bisa dipakai buat ngatur bandwidth, firewall, VPN, hotspot, dan banyak lagi. Cocok buat warnet, kantor kecil, atau bahkan rumah kalau mau lebih advance.',
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
  isLikedByCurrentUser: initialIsLiked,
}) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isThumbsUp, setIsThumbsUp] = useState(false);
  const [isThumbsDown, setIsThumbsDown] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setIsThumbsDown(false);
    }
  };

  const handleThumbsUp = () => {
    setIsThumbsUp(!isThumbsUp);
    if (!isThumbsUp) {
      setIsThumbsDown(false);
    }
  };

  const handleThumbsDown = () => {
    setIsThumbsDown(!isThumbsDown);
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
            size={24}
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
  const router = useRouter();
  const params = useLocalSearchParams<{
    // Define expected param types, all params from URL are strings initially
    id?: string;
    categoryTitle?: string;
    questionText?: string;
    contentText?: string;
    likes?: string;
    attachmentUri?: string;
    imagePlaceholder?: string; // Will be 'true' or 'false' as a string
  }>();

  const handleFabPress = () => {
    router.push('/answerform');
  };

  // Use params if available, otherwise fallback to samplePost or defaults
  const displayCategoryTitle = params.categoryTitle || samplePost.categoryTitle;
  const displayQuestionText = params.questionText || samplePost.questionText;
  const displayContentText = params.contentText || samplePost.contentText;
  const displayLikes = params.likes ? parseInt(params.likes, 10) : samplePost.likes;
  
  const displayAttachmentUri = params.attachmentUri;
  // Convert string 'true'/'false' from params to boolean
  const displayImagePlaceholder = params.imagePlaceholder === 'true';

  // For comments, you might fetch them based on params.id or pass them if simple enough
  // Here, we'll still use samplePost.comments for brevity for the comments section.

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor="#87CEEB" />
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.mainCard}>
          <Text style={styles.categoryTitle}>{displayCategoryTitle}</Text>
          
          <View style={styles.postContentContainer}>
            <View style={styles.postHeader}>
                <Ionicons name="person-circle-outline" size={40} color="#555" style={styles.postAuthorIcon} />
                <Text style={styles.postQuestionText}>{displayQuestionText}</Text>
                <View style={styles.likesContainer}>
                    <Ionicons name="heart" size={20} color="#FF6347" />
                    <Text style={styles.likesCount}>{displayLikes}</Text>
                </View>
            </View>
            <Text style={styles.postBodyText}>{displayContentText}</Text>
            
            {/* Conditional display for attachment/placeholder */}
            {displayAttachmentUri ? (
              <Image 
                source={{ uri: displayAttachmentUri }} 
                style={styles.postAttachmentImage} 
              />
            ) : displayImagePlaceholder ? (
              <View style={styles.postAttachmentPlaceholder}>
                <Ionicons name="image-outline" size={80} color="#B0B0B0" />
                {/* You could add text here if desired, e.g., <Text>Attachment</Text> */}
              </View>
            ) : null}
          </View>

          {/* Display comments (still using samplePost for this part) */}
          {samplePost.comments.map((comment) => (
            <Comment
              key={comment.id}
              {...comment} // Spread the comment object as props
            />
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
        <Ionicons name="add" size={30} color="#ffd700" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingTop: Platform.OS === 'android' ? ReactNativeStatusBar.currentHeight : 0,
  },
  headerContainer: {
    backgroundColor: '#A0E0FF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    margin: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
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
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
    marginRight: 10,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
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
    marginBottom: 10, // Ensure space if attachment/placeholder follows
  },
  postAttachmentImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    resizeMode: 'cover',
  },
  postAttachmentPlaceholder: { // New style for the placeholder
    width: '100%',
    height: 150, 
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  reactionIcons: {
    marginRight: 10,
    alignItems: 'center',
    paddingTop: 10,
  },
  reactionIcon: {
    marginBottom: 12,
  },
  commentBubble: {
    flex: 1,
    backgroundColor: '#E6FFE6',
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
    flexShrink: 1,
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
    backgroundColor: '#141330',
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
