import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './components/HomeScreen'
import DetailsScreen from './components/DetailsScreen'
import SearchScreen from "./components/SearchScreen"
import CartScreen from "./components/CartScreen"


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={
          {
            headerShown: false
          }
        } />
        <Stack.Screen
          name="Details" 
          component={DetailsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Search"
          component = {SearchScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Cart"
          component = {CartScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;