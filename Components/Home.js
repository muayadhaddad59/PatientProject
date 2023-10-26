import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the desired icon library

const HomeScreen = ({ navigation }) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/patients')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPatients(data);
      })
      .catch((error) => {
        console.error('Error fetching patient data:', error);
      });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.patientCard}
      onPress={() => {
        navigation.navigate('PatientDetail', { patient: item });
      }}
    >

<Icon name="user" size={30} color="#007ACC" /> 
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>{item.firstName}</Text>
        <Text style={styles.patientAge}>Age: {item.age}</Text>
        {/* Add more patient details here */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <FlatList
        data={patients}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  patientCard: {
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  patientInfo: {
    flex: 1,
    marginLeft: 10,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  patientAge: {
    color: '#888',
  },
});

export default HomeScreen;