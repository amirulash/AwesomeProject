import * as React from 'react';
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faUserGraduate, faEdit, faUserPen, faMap, faMosque, faHome } from '@fortawesome/free-solid-svg-icons';
import { WebView } from 'react-native-webview';
import { Card } from 'react-native-paper'; // Make sure this library is installed

import Portofolio from './App';
import Createdata from './Createdata';
import Listdata from './Listdata';
import Editdata from './Editdata';
import Mahasiswa from './mahasiswa';

const webmap = require('./peta/map.html');

// HomeScreen - Allows the user to create new data entries
function HomeScreen() {
  return (
    <Createdata />
  );
}

// MapsScreen - Displays an interactive map for the user to explore
function MapsScreen() {
  return (
    <WebView
      source={webmap}
    />
  );
}

// SettingsScreen - Shows a list of data entries, enabling users to explore and view details
function SettingsScreen() {
  return (
    <Listdata />
  );
}

// EditdataScreen - Allows users to edit existing data entries
function EditdataScreen() {
  return (
    <Editdata />
  );
}

// ProfilScreen - Displays the user's profile or portfolio information
function ProfilScreen() {
  return (
    <View>
      <Portofolio />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            position: 'relative',
            backgroundColor: '#FF6F61', // Muted Coral for background
            borderRadius: 20,
            height: 70,
            marginHorizontal: 15,
            marginBottom: 10,
            shadowColor: '#000',
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 10 },
            shadowRadius: 15,
            elevation: 5, // Shadow for Android
            borderTopWidth: 0, // No border on top of tab bar
            backgroundColor: '#FFFBFB', // Lighter background color for content
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
            marginBottom: 5,
            transition: '0.3s', // Smooth transition when switching tabs
          },
          tabBarIconStyle: {
            marginTop: 5,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Icon selection for each tab
            if (route.name === 'Home') {
              iconName = faHome;
            } else if (route.name === 'Maps') {
              iconName = faMap;
            } else if (route.name === 'Explore Masjid Tuban') {
              iconName = faMosque;
            } else if (route.name === 'Edit') {
              iconName = faUserPen;
            } else if (route.name === 'Profil') {
              iconName = faUser;
            }

            return (
              <FontAwesomeIcon
                icon={iconName}
                color={focused ? '#007bb5' : '#A9A9A9'} // Active tab color: Tomato, Inactive tab color: Gray
                size={26}
                style={{
                  transform: focused ? [{ scale: 1.2 }] : [{ scale: 1 }],
                  transition: '0.3s', // Smooth scale transition
                }}
              />
            );
          },
          tabBarActiveTintColor: '#007bb5', // Active tab color
          tabBarInactiveTintColor: '#A9A9A9', // Inactive tab color
          tabBarLabelPosition: 'below-icon', // Label below the icon
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="Maps"
          component={MapsScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Maps',
          }}
        />
        <Tab.Screen
          name="Explore Masjid Tuban"
          component={SettingsScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Explore',
          }}
        />
        <Tab.Screen
          name="Edit"
          component={EditdataScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Edit Data',
          }}
        />
        <Tab.Screen
          name="Profil"
          component={ProfilScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Profile',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Overlay to make text readable
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 150,
  },
  listitem: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  symbol: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  caption: {
    fontSize: 18,
    color: '#EBF3E8',
    fontFamily: 'Sans-serif',
    textAlign: 'center',
  },
  description: {
    textAlign: 'justify',
    color: '#EBF3E8',
    marginHorizontal: 8,
    fontFamily: 'Sans-serif',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  featuresTitle: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#EBF3E8',
  },
  features: {
    marginTop: 10,
  },
  featuresText: {
    color: '#EBF3E8',
  },
});
