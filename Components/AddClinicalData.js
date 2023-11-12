import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import PatientDetailScreen from './PatientDetailScreen';

const AddClinicalData = ({ navigation, route }) => {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [bloodOxygenLevel, setBloodOxygenLevel] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [clinicStaff, setClinicStaff] = useState('');

  //extract patientId from route parameters
  const { patientId } = route.params;
  console.log(route.params)

  //save clinical data
  const saveClinicalData = async () => {
    try {
      //POST request to save clinical data
      const response = await fetch(`http://localhost:3000/patients/${patientId}/clinicaldata`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bp_systolic: systolic,
          bp_diastolic: diastolic,
          respiratory_rate: respiratoryRate,
          blood_oxygen_level: bloodOxygenLevel,
          pulse_rate: heartRate,
          clinic_staff: clinicStaff,
        }),
      });
      
      if (response.ok) {
        // partse the response JSON is success
        const newClinicalData = await response.json();
        Alert.alert('Record Saved', 'Clinical data record saved successfully ', [
          {
            text: 'OK',
            onPress: () => {
              
              // Navigate back to the Clinical Data screen
              navigation.goBack();
            },
          },
        ]);
      } else {
        console.error('Error saving clinical data:', response.statusText);
        Alert.alert('Error', 'Failed to save clinical data. Please try again.');
      }
    } catch (error) {
      console.error('Error saving clinical data:', error);
      Alert.alert('Error', 'Failed to save clinical data. Please try again.');
    }
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.label}>patiend id: ${patientId}</Text>
      
      <Text style={styles.label}>Blood Pressure (Systolic):</Text>
      <TextInput
        style={styles.input}
        value={systolic}
        onChangeText={setSystolic}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Blood Pressure (Diastolic):</Text>
      <TextInput
        style={styles.input}
        value={diastolic}
        onChangeText={setDiastolic}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Respiratory Rate:</Text>
      <TextInput
        style={styles.input}
        value={respiratoryRate}
        onChangeText={setRespiratoryRate}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Blood Oxygen Level:</Text>
      <TextInput
        style={styles.input}
        value={bloodOxygenLevel}
        onChangeText={setBloodOxygenLevel}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Heart Rate:</Text>
      <TextInput
        style={styles.input}
        value={heartRate}
        onChangeText={setHeartRate}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Clinic Staff:</Text>
      <TextInput
        style={styles.input}
        value={clinicStaff}
        onChangeText={setClinicStaff}
      /> 

      <Button title="Save Record" onPress={saveClinicalData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});

export default AddClinicalData;
