// App.tsx
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router'; // Import useRouter
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const MAX_DESC_LENGTH = 2000;

export default function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const router = useRouter(); // Initialize router

  const handlePickImage = async () => {
    // Request permissions first
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

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Description is required.');
      return;
    }
    // Handle submission logic here
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Attachment URI:', attachment?.uri);
    Alert.alert('Success', 'Question submitted!', [
      {
        text: 'OK',
        onPress: () => {
          // Optionally clear fields
          setTitle('');
          setDescription('');
          setAttachment(null);
          router.push('/landingpage'); // Navigate to landing page
        },
      },
    ]);
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#A0E0FF" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Go-{"\n"}Tanya</Text>
        <Ionicons name="person-circle" size={50} color="#333" />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.pageTitle}>Ask a Question</Text>

        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title of the question <Text style={styles.asterisk}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="question..."
              placeholderTextColor="#B0B0B0"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description <Text style={styles.asterisk}>*</Text></Text>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                placeholderTextColor="#B0B0B0"
                multiline
                numberOfLines={8} // Adjust as needed
                value={description}
                onChangeText={setDescription}
                maxLength={MAX_DESC_LENGTH}
                textAlignVertical="top" // Important for multiline placeholder
              />
              <Text style={styles.charCount}>
                {description.length}/{MAX_DESC_LENGTH}
              </Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Add an Attachment (optional)</Text>
            <TouchableOpacity style={styles.attachmentBox} onPress={handlePickImage}>
              {attachment ? (
                <Image source={{ uri: attachment.uri }} style={styles.attachmentImagePreview} />
              ) : (
                <>
                  <MaterialCommunityIcons name="image-plus" size={48} color="#A0A0A0" />
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
        </View>
        
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Question</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F2F5', // A light grey background for the whole screen
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: '#A0E0FF', // Light blue
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 15, // Adjust for iOS status bar if not using SafeAreaView at top
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333', // Dark grey text
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 30, // For scroll space
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  asterisk: {
    color: 'red',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  textAreaContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 10,
    // paddingBottom: 5, // Space for char count
  },
  textArea: {
    // No border here, as it's on the container
    paddingHorizontal: 15,
    paddingTop: 12, // Top padding for text
    paddingBottom: 25, // Bottom padding to make space for char count
    fontSize: 16,
    color: '#333',
    minHeight: 120, // Minimum height for the text area
  },
  charCount: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    fontSize: 12,
    color: '#888',
  },
  attachmentBox: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    // borderStyle: 'dashed', // Dashed border is tricky in RN, requires custom component or image
    borderRadius: 10,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
  },
  attachmentText: {
    marginTop: 10,
    fontSize: 14,
    color: '#888',
  },
  attachmentImagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  removeAttachmentButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  removeAttachmentText: {
    color: '#007AFF', // Standard blue link color
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#141330', // Dark navy/almost black
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10, // Spacing from the card
    marginBottom: 20, // Extra space at bottom
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButtonText: {
    color: '#FFD700', // Goldish yellow
    fontSize: 18,
    fontWeight: 'bold',
  },
});

