import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

/* displays more details about the patient after a user clicks on the patient name*/
const PatientDetailScreen = ({ route }) => {
  const { patient } = route.params;
  const navigation = useNavigation();
  const dateOfBirth = new Date(patient.dateOfBirth);
  // Format the date to "YYYY - MM - DD"
  const formattedDateOfBirth = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(dateOfBirth);

  //show an alert when deleting a record
  const showDeleteConfirmation = (patientName) => {
    Alert.alert(
      "Delete Record",
      `Are you sure you want to delete the record of ${patientName}?`,
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
                      navigation.push('Home');
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

  return (
    <View>
      {/* edit and delete icons */}
      <View style={styles.iconsContainer}>
      <TouchableOpacity
          onPress={() =>
            /* redirect to view patient clinical data */
            showDeleteConfirmation(`${patient.firstName} ${patient.lastName}`)
          }
        >
        <FontAwesome
          name="user-md"
          size={30}
          color="#007ACC"
          style={styles.icon}
        /></TouchableOpacity>
         <TouchableOpacity
          onPress={() =>
            /* redirect to edit patient clinical data */
            showDeleteConfirmation(`${patient.firstName} ${patient.lastName}`)
          }
        >
        <FontAwesome
          name="edit"
          size={30}
          color="#007ACC"
          style={styles.icon}
        /></TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            showDeleteConfirmation(`${patient.firstName} ${patient.lastName}`)
          }
        >
          <FontAwesome name="trash" size={30} color="red" style={styles.icon} />
        </TouchableOpacity>
      </View>
      {/*patient information  */}
    <ScrollView>
      <View style={styles.detailCard}>
        <Text style={styles.label}>Name:</Text>
        <Text
          style={styles.value}
        >{`${patient.firstName} ${patient.lastName}`}</Text>
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{patient.age}</Text>
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{patient.gender}</Text>
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.label}>Date of Birth</Text>
        <Text style={styles.value}>{formattedDateOfBirth}</Text>
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{`${patient.address}, ${patient.city}, ${patient.province}, ${patient.postalCode}`}</Text>
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.label}>Contact:</Text>
        <Text style={styles.value}>{patient.contactNumber}</Text>
      </View>
     
      <View style={styles.detailCard}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{patient.email}</Text>
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.label}>ID Number:</Text>
        <Text style={styles.value}>{patient.identification}</Text>
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.label}>ID Type:</Text>
        <Text style={styles.value}>{patient.identificationType}</Text>
      </View>
      {/* Add more patient details here */}
    </ScrollView>
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
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    width: "30%",
  },
  value: {
    fontSize: 16,
    width: "70%",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginHorizontal: 10,
    padding: 5,
  },
});

export default PatientDetailScreen;
