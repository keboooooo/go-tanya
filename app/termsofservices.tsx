import { Ionicons } from '@expo/vector-icons'; // For the back arrow
import { useRouter } from 'expo-router'; // Import useRouter
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// --- Component: Header for this specific screen ---
// This header is tailored for screens that have a back button and the app title.
interface ScreenHeaderProps {
  onBackPress: () => void; // Callback for the back button press
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ onBackPress }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton} activeOpacity={0.7}>
        <Ionicons name="arrow-back" size={28} color="#000000" />
      </TouchableOpacity>
      <View style={styles.headerTitleWrapper}>
        {/* App Title */}
        <Text style={styles.headerTitlePrimary}>Go-</Text>
        <Text style={styles.headerTitlePrimary}>Tanya</Text>
        {/* App Version Subtitle */}
        <Text style={styles.headerSubtitleVersion}>Ver. 0.0.1 (alpha stage)</Text>
      </View>
      {/* Invisible placeholder to help center the title when back button is present */}
      <View style={styles.backButtonPlaceholder} />
    </View>
  );
};

// --- Component: TermsOfServiceScreen ---
const TermsOfServiceScreen: React.FC = () => { // Removed onNavigateBack from props
  const router = useRouter(); // Get the router instance

  const handleNavigateBack = () => {
    if (router.canGoBack()) {
      router.back(); // Go to the previous screen in the stack
    } else {
      // Fallback if there's no screen to go back to (e.g., deep link)
      // Optionally, navigate to a default screen like settingspage
      router.replace('/settingspage'); 
    }
  };

  const termsText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non tortor at enim varius gravida. Aliquam faucibus justo ac lacus vehicula, at rutrum velit egestas. Suspendisse auctor, tortor at bibendum vestibulum, est purus interdum leo, sit amet vulputate est lectus sed odio. In elit dui, malesuada vitae iaculis vel, vehicula et nunc. Maecenas convallis et libero sit amet imperdiet. Cras in massa ornare, ullamcorper nisi nec, malesuada nisi. Donec nisi tellus, faucibus nec auctor non, elementum sed lectus. Proin sollicitudin viverra justo, non imperdiet orci posuere vel. Ut vel risus metus. Maecenas efficitur arcu sed mollis tincidunt. In et odio tempus, porttitor leo et, aliquam est.

In hac habitasse platea dictumst. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In sed eleifend mi, sit amet tempor odio. Cras a auctor mi. Aenean quis nisi eu elit elementum molestie. Pellentesque aliquam finibus orci id cursus. Nulla laoreet ut massa quis convallis. Donec mauris massa, commodo nec ullamcorper quis, venenatis eget odio. Nullam ligula erat, eleifend vitae urna nec, pharetra posuere enim. Donec placerat consequat vulputate. Nulla facilisi. Donec nibh turpis, facilisis vitae lacus sed, aliquam fermentum ex. Sed ultrices nulla id lorem porta, aliquet faucibus lacus congue. Praesent in mi sem.

Donec lobortis sapien velit, quis pulvinar libero pulvinar ac. Integer quis lacus sodales, dignissim dui ut, sollicitudin dolor. Curabitur sit amet nibh laoreet, accumsan mi sit amet, malesuada orci. Nam nisi elit, tristique non consequat sed, molestie at neque. Curabitur eget pretium erat. Aliquam viverra, lorem et laoreet accumsan, lectus purus finibus ex, a iaculis nisl lacus vel tellus. Aenean posuere facilisis consectetur. Donec sed ex at arcu malesuada eleifend. Sed eget dolor at est consectetur auctor id sed libero. Sed id gravida est. Donec sed egestas diam, ac scelerisque metus. Duis rutrum vel nibh eu posuere. Vivamus congue ante tortor, in mattis enim auctor nec. Nunc eget magna nec purus varius rhoncus a auctor magna. Sed faucibus cursus maximus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

In sit amet est ut augue elementum dictum. Pellentesque a diam odio. Curabitur venenatis lacus id mi malesuada pellentesque. Cras lacus ex, cursus eu quam eu, ornare placerat quam. In finibus, eros sed aliquet tincidunt, turpis ante rhoncus leo, nec tristique eros justo sed metus. Donec volutpat aliquam lectus eu euismod. Curabitur ac turpis laoreet, feugiat erat vitae, facilisis augue. Nam efficitur sodales felis eget iaculis. Morbi vitae nulla at lectus suscipit aliquam. Aliquam nec aliquet libero. Morbi lacinia ultricies nunc. Nunc cursus bibendum pharetra. Phasellus sed erat vel justo commodo convallis. Vestibulum vehicula in ipsum in rutrum. Vivamus lorem ante, euismod a volutpat ac, cursus eu quam.

Donec in ornare turpis. Ut id fringilla neque, eget accumsan arcu. Morbi lacinia ultricies nisl at pellentesque. Maecenas ipsum mi, efficitur ut molestie id, placerat a leo. Vivamus id lacus est. Sed vel tristique nisi. Nullam eget metus quis dolor varius tincidunt. Nulla arcu nulla, porttitor non libero vel, finibus suscipit massa. Phasellus venenatis metus ac nisl porta, in ultrices nisl consectetur. Donec vestibulum elit vel porta suscipit. Nam ut dui efficitur, molestie augue sit amet, faucibus ex.`;

  return (
    <SafeAreaView style={styles.safeAreaViewWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#87CEEB" />
      <View style={styles.screenRootContainer}>
        <ScreenHeader onBackPress={handleNavigateBack} /> {/* Use the new handler */}
        <View style={styles.separatorLine} />
        <ScrollView
          style={styles.termsScrollView}
          contentContainerStyle={styles.termsContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.termsCard}>
            <Text style={styles.termsTitle}>Terms of Service</Text>
            <Text style={styles.termsBody}>{termsText}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  safeAreaViewWrapper: {
    flex: 1,
    backgroundColor: '#87CEEB', // Matches the header background for a seamless look
  },
  screenRootContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Main content area background
  },

  // ScreenHeader Styles
  headerContainer: {
    backgroundColor: '#A0E0FF', // Light sky blue
    paddingVertical: 15,        // Vertical padding for the header
    paddingHorizontal: 15,      // Horizontal padding for the header
    flexDirection: 'row',       // Align items in a row: back-button, title, placeholder
    alignItems: 'center',       // Vertically center items in the header
    justifyContent: 'space-between', // Distribute space: back button left, title center, placeholder right
    minHeight: 90,              // Ensure header has a decent height
  },
  backButton: {
    padding: 5, // Increases touchable area for the back button
  },
  headerTitleWrapper: {
    flex: 1, // Allows the title wrapper to take available space for centering
    alignItems: 'center', // Center the title and subtitle horizontally
    paddingTop: 35, // Added padding to move the title block down
  },
  headerTitlePrimary: {
    fontSize: 48,
    fontWeight: '500', // Light font weight for "Go-Tanya"
    color: '#000000',
    textAlign: 'center',
    // paddingTop: 50,
    lineHeight: 50, // Adjust line height for "Go-" and "Tanya"
  },
  headerSubtitleVersion: {
    fontSize: 14,
    color: '#1A1A1A', // Dark grey for subtitle
    marginTop: 6,
    textAlign: 'center',
  },
  backButtonPlaceholder: {
    // This invisible view has the same width as the back button
    // to help keep the title perfectly centered.
    width: 28 + 10, // (Icon size + padding of back button)
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#000000', // Black separator line below the header
  },

  // TermsOfServiceScreen Content Styles
  termsScrollView: {
    flex: 1, // ScrollView should take up remaining vertical space
  },
  termsContentContainer: {
    paddingHorizontal: 20, // Keep horizontal padding
    paddingTop: 20,        // Keep top padding
    paddingBottom: 60,     // Increased bottom padding (e.g., from 20 to 40)
  },
  termsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8, // Rounded corners for the card
    padding: 20, // Padding inside the card
    borderWidth: 1,
    borderColor: '#E0E0E0', // Light grey border for the card
    // Optional: Add shadow for depth (iOS and Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Android shadow
  },
  termsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16, // Space below the title
    textAlign: 'left', // Align title to the left as per image
  },
  termsBody: {
    fontSize: 16,
    lineHeight: 24, // Improves readability of the text block
    color: '#333333', // Dark grey for the main text body
    textAlign: 'left',
  },
});

export default TermsOfServiceScreen;