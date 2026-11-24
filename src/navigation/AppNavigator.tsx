import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ClientsListScreen from '../screens/ClientsListScreen';
import ClientDetailsScreen from '../screens/ClientDetailsScreen';
import ClientFormScreen from '../screens/ClientFormScreen';
import { RootStackParamList } from '../types/client';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* Desativa o cabeçalho nativo para utilizar o GradientHeader personalizado */}
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ClientsList" component={ClientsListScreen} />
        <Stack.Screen name="ClientDetails" component={ClientDetailsScreen} />
        <Stack.Screen name="ClientForm" component={ClientFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
