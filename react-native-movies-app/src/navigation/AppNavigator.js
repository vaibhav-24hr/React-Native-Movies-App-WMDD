import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Changed to native-stack
import MoviesScreen from '../screens/MoviesScreen';
import SearchScreen from '../screens/SearchScreen';
import TVScreen from '../screens/TVScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { Colors } from '../constants/Colors';
import { Text } from 'react-native';

// Use a simple text label or icon if available. 
// Ideally I'd use icons, but I need to make sure I have an icon set.
// Expo usually has @expo/vector-icons.

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold', textTransform: 'capitalize' },
        tabBarIndicatorStyle: { backgroundColor: '#2c3e50', height: 3 }, // Dark indicator
        tabBarActiveTintColor: '#2c3e50', // Dark text for active
        tabBarInactiveTintColor: '#9ca3af', // Grey for inactive
        tabBarStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0, borderBottomWidth: 1, borderBottomColor: '#eee' }, // Clean white bar
      }}
    >
      <Tab.Screen 
        name="Movies" 
        component={MoviesScreen} 
        options={{ tabBarLabel: 'Movies' }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ tabBarLabel: 'Search Results' }}
      />
      <Tab.Screen 
        name="TV Shows" 
        component={TVScreen} 
        options={{ tabBarLabel: 'TV Shows' }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center', headerTintColor: '#fff', headerStyle: { backgroundColor: '#2c3e50' } }}>
      <Stack.Screen 
        name="Main" 
        component={MainTabs} 
        options={{ title: 'Movies App' }} 
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={({ route }) => ({ 
            title: route.params.title,
            headerBackTitle: 'Back to List',
            headerTintColor: '#06b6d4', // Blue Back Button
            headerStyle: { backgroundColor: '#fff' }, 
            headerTitleStyle: { fontWeight: 'bold', color: '#000' }, // Black Title
            headerLeftContainerStyle: { paddingLeft: 8 },
            // To make the back button blue/cyan we might need to customize, but usually it takes tintColor. 
            // If tintColor is black for title, back icon is black. 
            // Let's stick to standard behavior but ensure clean white header.
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
