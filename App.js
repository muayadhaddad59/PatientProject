import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import ListPatients from './Components/ListPatients';
import PatientDetailScreen from './Components/PatientDetailScreen';
import HomeScreen from './Components/HomeScreen';
import CriticalPatients from './Components/CriticalPatients'

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#007ACC" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="List Patients" component={ListPatients} />
          <Stack.Screen name="Patient Detail" component={PatientDetailScreen} />
          <Stack.Screen name="Critical Patients" component={CriticalPatients} />

        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF', // Customize the background color
  },
});
