import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  FlatList,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

/* displays more details about the patient after a user clicks on the patient name*/
const PatientDetailScreen = ({ route }) => {
  const { patient } = route.params;
  const navigation = useNavigation();
  const dateOfBirth = new Date(patient.dateOfBirth);
  // Format the date to "YYYY - MM - DD"
  const formattedDateOfBirth = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(dateOfBirth);

  const [selectedSegment, setSelectedSegment] = useState(0);
  const [clinicalData, setClinicalData] = useState([]);
  //show an alert when deleting a record
  const showDeleteConfirmation = (patientName) => {
    Alert.alert(
      "Delete Record",
      `Are you sure you want to delete this patient and their clinical record? ${patientName}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            //Use the patient._id to identify and delete the patient record
            try {
              const response = await fetch(
                `http://localhost:3000/patients/${patient._id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              if (response.ok) {
                console.log("Patient deleted successfully.");

                // Show a success alert
                Alert.alert("Success", "Patient record deleted successfully", [
                  {
                    text: "OK",
                    onPress: () => {
                      //return to home screen and reload the list
                      navigation.push("Home");
                    },
                  },
                ]);
              } else {
                console.error("Error deleting patient:", response.statusText);
              }
            } catch (error) {
              console.error("Error deleting patient:", error);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    if (selectedSegment === 1) {
      // Fetch clinical data when the Clinical Data segment is selected
      fetchClinicalData(patient._id);
    }
  }, [selectedSegment, patient._id]);

  const fetchClinicalData = async (patientId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/patients/${patientId}/clinicaldata`
      );
      if (response.ok) {
        const clinicalData = await response.json();
        setClinicalData(clinicalData);
      } else {
        console.error("Error fetching clinical data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching clinical data:", error);
    }
  };
  return (
    <View style={styles.container}>
      {/* edit and delete icons */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          onPress={() =>
            /* redirect to edit patient clinical data */
            showDeleteConfirmation(`${patient.firstName} ${patient.lastName}`)
          }
        >
          <FontAwesome
            name="edit"
            size={40}
            color="#007ACC"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            showDeleteConfirmation(`${patient.firstName} ${patient.lastName}`)
          }
        >
          <FontAwesome name="trash" size={40} color="red" style={styles.icon} />
        </TouchableOpacity>
      </View>
      {/*patient information  */}

      {/* Add segmented control for Personal Info and Clinical Data */}
      <SegmentedControl
        style={styles.segmentedControl}
        values={["Personal Info", "Clinical Data"]}
        selectedIndex={selectedSegment}
        onChange={(event) => {
          setSelectedSegment(event.nativeEvent.selectedSegmentIndex);
        }}
      />

      {/* Display content based on selected segment */}
      {selectedSegment === 0 ? (
        // Display Personal Info
        <FlatList
          data={[
            {
              label: "Name",
              value: `${patient.firstName} ${patient.lastName}`,
            },
            { label: "Date of Birth", value: formattedDateOfBirth },
            { label: "Age", value: `${patient.age}` },
            { label: "Gender", value: `${patient.gender}` },
            { label: "Height", value: `${patient.height} cm` },
            { label: "Weight", value: `${patient.weight} kg` },
            { label: "Address", value: patient.address },
            { label: "City", value: patient.city },
            { label: "Province", value: patient.province },
            { label: "Postal Code", value: patient.postalCode },
            { label: "Contact Number", value: patient.contactNumber },
            { label: "Email", value: patient.email },
            { label: "Identification", value: patient.identification },
            { label: "Identification Type", value: patient.identificationType },
            {
              label: "Primary Care Physician",
              value: patient.primaryCarePhysician,
            },
            {
              label: "Physician Contact Number",
              value: patient.physicianContactNumber,
            },
            { label: "List of Allergies", value: patient.listOfAllergies },
            { label: "Current Medications", value: patient.currentMedications },
            { label: "Medical Conditions", value: patient.medicalConditions },
            { label: "Insurance Provider", value: patient.insuranceProvider },
            { label: "Insurance ID Number", value: patient.insuranceIdNumber },
            {
              label: "Insurance Contact Number",
              value: patient.insuranceContactNumber,
            },
            {
              label: "Emergency Contact Person",
              value: patient.emergencyContactPerson,
            },
            {
              label: "Emergency Contact Number",
              value: patient.emergencyContactNumber,
            },
          ]}
          keyExtractor={(item) => item.label}
          renderItem={({ item }) => (
            <View style={styles.detailCard}>
              <Text style={styles.label}>{item.label}:</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          )}
        />
      ) : (
        // Display Clinical Data
        <FlatList
          data={clinicalData}
          keyExtractor={(item, index) => index.toString()} // Using index as a fallback key
          renderItem={({ item }) => (
            <View
              style={[
                styles.clinicalDataCard,
                item.is_critical_condition ? styles.criticalCard : null,
              ]}
            >
              <Text style={styles.label}>
                Critical Condition? {item.is_critical_condition ? "Yes" : "No"}
              </Text>
              <Text style={styles.label}>
                Date Taken:{" "}
                {new Date(item.updatedAt).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </Text>

              <Text style={styles.label}>
                Blood Pressure: {item.bp_systolic} / {item.bp_diastolic}
              </Text>
              <Text style={styles.label}>
                Respiratory Rate: {item.respiratory_rate}
              </Text>
              <Text style={styles.label}>
                Blood Oxygen Level: {item.blood_oxygen_level}
              </Text>
              <Text style={styles.label}>Heart Rate: {item.pulse_rate}</Text>
              <Text style={styles.label}>
                Clinic Staff: {item.clinic_staff}
              </Text>
            </View>
          )}
          ListHeaderComponent={() => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Clinical Data", {
                  patientId: patient._id,
                }); // Navigate to AddClinicalData screen
              }}
            >
              <FontAwesome
                name="plus-square"
                size={40}
                color="#007ACC"
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  detailContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  detailCard: {
    flexDirection: "row", // Change flex direction to row
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    justifyContent: "space-between", // Optional: Adjust the spacing between label and value
    alignItems: "center", // Align items to center vertically
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    // Optional: Add margin-right for spacing between label and value
    marginRight: 10,
  },
  value: {
    fontSize: 16,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginHorizontal: 10,
    padding: 5,
  },
  clinicalDataCard: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  criticalCard: {
    borderColor: "red", // You can customize the border color for critical condition
    borderWidth: 2,
  },
});

export default PatientDetailScreen;
