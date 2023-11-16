import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListPatients from "./Components/ListPatients";
import PatientDetailScreen from "./Components/PatientDetailScreen";
import HomeScreen from "./Components/HomeScreen";
import CriticalPatients from "./Components/CriticalPatients";
import AddClinicalData from "./Components/AddClinicalData";

//create stack and bottom nav
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define a function for the Home stack navigator
function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="List Patients" component={ListPatients} />
      <Stack.Screen name="Patient Detail" component={PatientDetailScreen} />
      <Stack.Screen name="Critical Patients" component={CriticalPatients} />
      <Stack.Screen name="Clinical Data" component={AddClinicalData} />
    </Stack.Navigator>
  );
}

// Main App component
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#007ACC" barStyle="light-content" />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="List Patients" component={ListPatients} />
          <Tab.Screen
            name="Critical Patients"
            component={CriticalPatients}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
});
