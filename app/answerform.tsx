import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Added MaterialCommunityIcons
import * as ImagePicker from 'expo-image-picker'; // Added ImagePicker
import { useRouter } from 'expo-router'; // Import useRouter
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Alert,
    Image, // Added Image
    Platform,
    StatusBar as ReactNativeStatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// Reusable Header Component (adapted to match askaquestion.tsx)
const Header: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Go-{"\n"}Tanya</Text>
      <Ionicons name="person-circle" size={50} color="#333" />
    </View>
  );
};

const MAX_DESCRIPTION_LENGTH = 2000;

const SubmitAnswerScreen: React.FC = () => {
  const [answerDescription, setAnswerDescription] = useState('');
  const [attachment, setAttachment] = useState<ImagePicker.ImagePickerAsset | null>(null); // Added attachment state
  const router = useRouter(); // Initialize router

  const handleDescriptionChange = (text: string) => {
    if (text.length <= MAX_DESCRIPTION_LENGTH) {
      setAnswerDescription(text);
    }
  };

  const handlePickImage = async () => { // Copied from askaquestion.tsx
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAttachment(result.assets[0]);
    }
  };

  const handleSubmitAnswer = () => {
    if (answerDescription.trim() === '') {
      Alert.alert(
        "Error",
        "Please enter a description for your answer before submitting.",
        [{ text: "OK" }]
      );
      return; // Stop further execution
    }

    // If description is not empty, proceed with success alert and navigation
    Alert.alert(
      "Success", // Alert Title
      "The answer has been submitted", // Alert Message
      [
        {
          text: "OK",
          onPress: () => {
            // Clear fields (optional, but good practice)
            setAnswerDescription('');
            setAttachment(null);
            // Navigate to questionform
            router.push('/questionform');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor="#87CEEB" />
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.pageTitle}>Submit an Answer</Text>

        <View style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Description of the Answer <Text style={styles.asterisk}>*</Text>
            </Text>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                multiline
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                placeholderTextColor="#B0B0B0"
                value={answerDescription}
                onChangeText={handleDescriptionChange}
                textAlignVertical="top" // Ensures placeholder and text start at top
              />
              <Text style={styles.charCount}>
                {answerDescription.length}/{MAX_DESCRIPTION_LENGTH}
              </Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Add an Attachment (optional)</Text>
            <TouchableOpacity
              style={styles.attachmentBox}
              onPress={handlePickImage} // Changed to handlePickImage
              activeOpacity={0.7}
            >
              {attachment ? (
                <Image source={{ uri: attachment.uri }} style={styles.attachmentImagePreview} />
              ) : (
                <>
                  {/* Using MaterialCommunityIcons to match askaquestion */}
                  <MaterialCommunityIcons name="image-plus" size={60} color="#B0B0B0" />
                  <Text style={styles.attachmentText}>Click to add attachment</Text>
                </>
              )}
            </TouchableOpacity>
            {attachment && (
                <TouchableOpacity onPress={() => setAttachment(null)} style={styles.removeAttachmentButton}>
                    <Text style={styles.removeAttachmentText}>Remove</Text>
                </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitAnswer}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Submit Answer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F2F5', // Match askaquestion background
    paddingTop: Platform.OS === 'android' ? ReactNativeStatusBar.currentHeight : 0, // Match askaquestion
  },
  headerContainer: { // Matched from askaquestion.tsx
    backgroundColor: '#A0E0FF', // Light blue
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    // paddingVertical: 15, // Replaced by specific paddingTop and paddingBottom
    paddingBottom: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: { // Matched from askaquestion.tsx
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333', // Dark grey text
  },
  // Removed headerTitleGo and headerTitleTanya
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 30, // Space at the bottom
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginVertical: 20,
    marginLeft: 20, // Align with card content
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 15,
    color: '#333333',
    marginBottom: 8,
  },
  asterisk: {
    color: 'red',
  },
  textInputContainer: {
    borderColor: '#D0D0D0',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF', // Ensure background is white if card is different
  },
  textInput: {
    minHeight: 180, // Adjust as needed
    paddingHorizontal: 15,
    paddingTop: 15, // For multiline placeholder alignment
    paddingBottom: 30, // Space for char count
    fontSize: 16,
    color: '#333333',
  },
  charCount: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    fontSize: 13,
    color: '#666666',
  },
  attachmentBox: {
    minHeight: 150, // Use minHeight to allow content to expand if needed
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9', // Matched from askaquestion
    paddingVertical: 20, // Added padding for better spacing when empty
  },
  attachmentText: {
    marginTop: 10,
    fontSize: 14,
    color: '#888', // Matched from askaquestion
  },
  attachmentImagePreview: { // Copied from askaquestion.tsx
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  removeAttachmentButton: { // Copied from askaquestion.tsx
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  removeAttachmentText: { // Copied from askaquestion.tsx
    color: '#007AFF', 
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#141330', // Very dark blue, almost black
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10, // Space above the button
  },
  submitButtonText: {
    color: '#FFD700', // Goldish yellow to match askaquestion submit button text
    fontSize: 18,
    fontWeight: 'bold',
  },
});

// To run this screen standalone, you can make it the default export in App.tsx
// export default SubmitAnswerScreen;

// If you are integrating:
// 1. Rename SubmitAnswerScreen to something like SubmitAnswerScreen
// 2. In your App.tsx (or navigation file), import and use SubmitAnswerScreen
//    For example, if you had the previous screen as `ForumScreen`:
//    export default ForumScreen; // or your navigation setup
//    and then navigate to SubmitAnswerScreen
export default SubmitAnswerScreen; // For standalone testing
