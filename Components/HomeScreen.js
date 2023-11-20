import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';


// hook is used to create state var. Patients hold patient data and search is for filtering
const HomeScreen = ({ navigation }) => {
  const [patients, setPatients] = useState([]);
  const [searchText, setSearchText] = useState('');

  //fetch patient data from the url when the component mounts
  useEffect(() => {
    //pc ip address: 192.168.2.154:8081 / localhost: 127.0.0.1:3000
    fetch('http://127.0.0.1:3000/patients')
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
  //filter method to search using first or last name
  const filteredPatients = patients.filter(
    (patient) =>
      patient.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.patientCard}
      onPress={() => {
        navigation.navigate('Patient Detail', { patient: item });
      }}
    >
      <Icon name="user" size={30} color="#007ACC" />
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>{item.firstName} {item.lastName}</Text>
        <Text style={styles.patientAge}>Age: {item.age}</Text>
        <Text style={styles.patientContact}>Contact: {item.contactNumber}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar with Clear Icon */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search patients..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />

        {/* Clear Icon */}
        {searchText.length > 0 && (
          <TouchableOpacity
            style={styles.clearIcon}
            onPress={() => setSearchText('')}
          >
            <Icon name="times-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
      {/* Add New Patient Button */}
      <Button
        mode="contained"
        onPress={() => {
          // Navigate to the screen where you add a new patient
          navigation.navigate('Add Patient');
        }}
        style={[styles.button, { backgroundColor: '#0066ff' }]}
        >
        Add Patient
      </Button>

      {/* List All Critical Patients Button */}
      <Button
        mode="contained"
        onPress={() => {
          // Navigate to the CriticalPatientsScreen
          navigation.navigate('Critical Patients');
        }}
        style={[styles.button, { backgroundColor: '#f6546a' }]}
        >
        Critical List
      </Button>
    </View>

      {/* Patient List */}
      <FlatList
        data={filteredPatients}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  clearIcon: {
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
  patientContact: {
    color: "#007ACC",
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  patientAge: {
    color: '#888',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    },
    button: {
      width: 150,
    },
  
});

export default HomeScreen;
