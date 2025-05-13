// App.tsx (or a new component file, e.g., SearchScreen.tsx)
import { Feather, Ionicons } from '@expo/vector-icons'; // Feather for search icon
import { useRouter } from 'expo-router'; // Import useRouter
import React, { useState } from 'react';
import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity, // Import TouchableOpacity
    View
} from 'react-native';

export default function searchaquestion() { // Rename to SearchScreen if it's a separate component
  const [searchText, setSearchText] = useState('');
  const router = useRouter(); // Initialize router

  const handleSearch = () => {
    if (searchText.trim() === '') {
      // Optionally, handle empty search string (e.g., show an alert)
      return;
    }
    // Navigate to searchaquestion-1-2 and pass the searchText as a query parameter
    router.push({
      pathname: '/searchaquestion-1-2',
      params: { query: searchText },
    });
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#A0E0FF" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Go-{"\n"}Tanya</Text>
        {/* You can make this TouchableOpacity if it's supposed to navigate */}
        <Ionicons name="person-circle" size={50} color="#333" />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#A0A0A0"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch} // Trigger search on keyboard submit
            returnKeyType="search"
          />
          <TouchableOpacity onPress={handleSearch}> {/* Make icon pressable */}
            <Feather name="search" size={22} color="#777" style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Area - currently empty as per the design */}
      <ScrollView style={styles.contentArea}>
        {/* 
          You can add list items or other content here later.
          For example:
          <Text style={{ textAlign: 'center', marginTop: 50, color: '#888' }}>
            Search results will appear here.
          </Text> 
        */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background for the main content area below search
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
    backgroundColor: '#FFFFFF', // Search bar sits on a white background strip
    borderBottomWidth: 1, // Optional: if you want a line below search bar too
    borderBottomColor: '#F0F0F0', // Lighter border for search bar area
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
    paddingVertical: 8, // Adjust vertical padding as needed
  },
  searchIcon: {
    marginLeft: 10, // Space between text input and icon
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Ensuring the rest of the screen is white
    // Add padding if needed, e.g., padding: 20,
  },
});
