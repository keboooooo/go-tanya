import { Feather } from '@expo/vector-icons'; // Using Feather for the chevron-right icon
import React from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// --- Component: SettingsItem ---
interface SettingsItemProps {
  label: string;
  onPress: () => void;
  isDestructive?: boolean; // To style the "Log Out" button differently
}

const SettingsItem: React.FC<SettingsItemProps> = ({ label, onPress, isDestructive }) => {
  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        isDestructive && styles.destructiveItemContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.7} // Standard touch feedback
    >
      <Text style={[styles.itemLabel, isDestructive && styles.destructiveItemLabel]}>
        {label}
      </Text>
      <Feather
        name="chevron-right"
        size={24}
        color={isDestructive ? '#D32F2F' : '#555555'} // Red for destructive, dark grey for normal
      />
    </TouchableOpacity>
  );
};

// --- Component: SettingsSection ---
interface ItemConfig {
  id: string;
  label: string;
  onPress: () => void;
  isDestructive?: boolean;
}

interface SettingsSectionProps {
  title: string;
  items: ItemConfig[];
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, items }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item) => (
        <SettingsItem
          key={item.id}
          label={item.label}
          onPress={item.onPress}
          isDestructive={item.isDestructive}
        />
      ))}
    </View>
  );
};

// --- Component: Header (part of the settings screen) ---
const AppHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitlePrimary}>Go-</Text>
      <Text style={styles.headerTitlePrimary}>Tanya</Text>
      <Text style={styles.headerSubtitleVersion}>Ver. 0.0.1 (alpha stage)</Text>
    </View>
  );
};

// --- Screen: SettingsScreen ---
// Dummy data for the settings list
const settingsData = [
  {
    id: 'account_management',
    title: 'Account Management',
    items: [
      { id: 'change_email', label: 'Change Email', onPress: () => Alert.alert('Navigation', 'Navigate to Change Email') },
      { id: 'change_password', label: 'Change Password', onPress: () => Alert.alert('Navigation', 'Navigate to Change Password') },
    ],
  },
  {
    id: 'privacy_policy_section',
    title: 'Privacy Policy',
    items: [
      { id: 'terms_of_service', label: 'Terms of Service', onPress: () => Alert.alert('Navigation', 'Show Terms of Service') },
      { id: 'privacy_policy_doc', label: 'Privacy Policy', onPress: () => Alert.alert('Navigation', 'Show Privacy Policy') },
    ],
  },
  {
    id: 'app_settings',
    title: 'App Settings',
    items: [
      { id: 'change_language', label: 'Change Language', onPress: () => Alert.alert('Navigation', 'Navigate to Change Language') },
      { id: 'log_out', label: 'Log Out', onPress: () => Alert.alert('Action', 'Log Out Tapped'), isDestructive: true },
    ],
  },
];

const SettingsScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <AppHeader />
      <View style={styles.separatorLine} />
      <ScrollView
        style={styles.settingsListScrollView}
        contentContainerStyle={styles.settingsListContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {settingsData.map((section) => (
          <SettingsSection
            key={section.id}
            title={section.title}
            items={section.items}
          />
        ))}
      </ScrollView>
    </View>
  );
};

// --- Main App Component ---
export default function App() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#87CEEB" />
      <SettingsScreen />
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  // App Level Styles
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#87CEEB', // Ensures notch/status bar area is blue
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Main background for the settings content area
  },

  // AppHeader Styles
  headerContainer: {
    backgroundColor: '#A0E0FF', // Light sky blue
    paddingTop: 50, // Space from top (adjust if status bar handling is different)
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center', // Center title and subtitle
  },
  headerTitlePrimary: {
    fontSize: 48,
    fontWeight: "500", // A lighter font weight
    color: '#000000',
    textAlign: 'center',
    lineHeight: 50, // To keep "Go-" and "Tanya" close
  },
  headerSubtitleVersion: {
    fontSize: 14,
    color: '#1A1A1A', // Dark grey for readability
    marginTop: 6,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#000000', // Black separator line
  },

  // Settings List Styles
  settingsListScrollView: {
    flex: 1,
  },
  settingsListContentContainer: {
    paddingHorizontal: 20, // Side padding for the list content
    paddingTop: 24,       // Top padding from the separator line
    paddingBottom: 24,    // Bottom padding
  },

  // SettingsSection Styles
  sectionContainer: {
    marginBottom: 24, // Space between sections
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    marginLeft: 4, // Small indent to align with item content
  },

  // SettingsItem Styles
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCDCDC', // Light grey border for items
    borderRadius: 12,       // Rounded corners for items
    marginBottom: 10,       // Space between items in a section
  },
  destructiveItemContainer: {
    backgroundColor: '#FFEBEE', // Very light red background (Material Red 50)
    borderColor: '#D32F2F',    // Darker red border (Material Red 700)
  },
  itemLabel: {
    fontSize: 16,
    color: '#000000',
  },
  destructiveItemLabel: {
    color: '#D32F2F', // Red text for destructive items
  },
});