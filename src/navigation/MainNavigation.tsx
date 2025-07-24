import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigationProp } from './types';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { useAuth } from '@/services/api/AuthContext';

const Stack = createStackNavigator();

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true
        }}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name='LoginScreen'
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='ProfileScreen'
          component={ProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
