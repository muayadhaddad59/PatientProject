import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PatientDetailScreen = ({ route }) => {
  const { patient } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.detailCard}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{`${patient.firstName} ${patient.lastName}`}</Text>
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{patient.age}</Text>
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{patient.email}</Text>
      </View>
      {/* Add more patient details here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  detailCard: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '30%',
  },
  value: {
    fontSize: 16,
    width: '70%',
  },
});

export default PatientDetailScreen;
