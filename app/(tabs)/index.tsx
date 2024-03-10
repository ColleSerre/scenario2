import { Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useEffect, useReducer, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSharedValue } from "react-native-reanimated";
import { Slider } from "react-native-awesome-slider";
import { Medication } from "../../types/medication";
import { Patient } from "@/types/patient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabOneScreen() {
  const [patients, setPatients] = useState<Patient[]>([]);

  const fetchPatients = async () => {
    const res = await fetch("http://localhost:8081/data");
    const data = await res.json();
    setPatients(data.patients);
    setPatient(data.patients[0]);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  type State = {
    date: Date;
    meds: Medication[];
    symptoms: string[];
    mood: string;
    notes: string;
  };

  const initialState: State = {
    date: new Date(),
    meds: [
      {
        name: "Ibuprofen",
        amount: 0,
        recommended: 1,
      },
      {
        name: "Paracetamol",
        amount: 0,
        recommended: 2,
      },
      {
        name: "Aspirin",
        amount: 0,
        recommended: 1,
      },
    ],
    symptoms: ["Headache", "Fever", "Cough"],
    mood: "0",
    notes: "",
  };

  const reducer = (state: State, action: { type: string; payload: any }) => {
    switch (action.type) {
      case "update":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer<React.Reducer<State, any>>(
    reducer,
    initialState
  );

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentSymptom, setCurrentSymptom] = useState("");
  const [patient, setPatient] = useState<Patient>();

  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(10);

  if (patients.length === 0 || !patient) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        paddingTop: 100,
        ...styles.container,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {patients.map((p) => (
          <TouchableOpacity
            key={p.name}
            style={{
              padding: 10,
              backgroundColor:
                p.name === patient.name ? "lightgrey" : "transparent",
              borderRadius: 5,
            }}
            onPress={() => {
              setPatient(p);
            }}
          >
            <Text
              style={{
                color: p.name === patient.name ? "white" : "black",
              }}
            >
              {p.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          gap: 20,
        }}
      >
        <Text style={styles.title}>
          {patient?.name ? `Log a Visit with ${patient.name}` : "Log a visit"}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text style={styles.title}>Date</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text>Edit</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.body}>{state.date.toDateString()}</Text>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={state.date}
            mode="date"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              dispatch({
                type: "update",
                payload: { date: selectedDate },
              });
            }}
          />
        )}
        <View
          style={{
            gap: 20,
          }}
        >
          <Text style={styles.title}>Medication</Text>
          {state.meds.map((med) => (
            <TouchableOpacity
              style={{
                padding: 10,
                borderWidth: 2,
                // change the background color if the med is selected using the name of the med
                backgroundColor: med.selected ? "lightgrey" : "transparent",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 5,
              }}
              key={med.name}
              onPress={() => {
                dispatch({
                  type: "update",
                  payload: {
                    meds: state.meds.map((m) =>
                      m === med ? { ...m, selected: !m.selected } : m
                    ),
                  },
                });
              }}
            >
              <View
                style={{
                  backgroundColor: "transparent",
                  flex: 1,
                }}
              >
                <Text style={styles.body}>{med.name}</Text>
                {med.selected && med.amount != med.recommended && (
                  <Text style={{ color: "red", flexWrap: "wrap" }}>
                    {`You have not taken the recommended amount of ${med.name} (${med.recommended})`}
                  </Text>
                )}
              </View>
              {med.selected && (
                // + and - buttons to increase or decrease the amount of meds taken
                <View
                  style={{
                    flexDirection: "row",

                    gap: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      dispatch({
                        type: "update",
                        payload: {
                          meds: state.meds.map((m) =>
                            m === med ? { ...m, amount: m.amount + 1 } : m
                          ),
                        },
                      });
                    }}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                  <Text>{med.amount}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch({
                        type: "update",
                        payload: {
                          meds: state.meds.map((m) =>
                            m === med ? { ...m, amount: m.amount - 1 } : m
                          ),
                        },
                      });
                    }}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View>
          <Text style={styles.title}>Symptoms</Text>
          <View
            style={{
              marginVertical: 10,

              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {state.symptoms.length > 0 &&
              state.symptoms.map((symptom) => (
                <View
                  key={symptom}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "lightgrey",
                    padding: 5,
                    marginVertical: 5,
                    borderRadius: 10,
                    gap: 10,
                  }}
                >
                  <Text>{symptom}</Text>

                  <TouchableOpacity
                    onPress={() =>
                      dispatch({
                        type: "update",
                        payload: {
                          symptoms: state.symptoms.filter((s) => s !== symptom),
                        },
                      })
                    }
                  >
                    <Text style={{ color: "red" }}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              padding: 10,
              marginVertical: 10,
            }}
            placeholder="Enter symptoms"
            value={currentSymptom}
            onChangeText={(text) => setCurrentSymptom(text)}
          />
          <Button
            title="Add"
            onPress={() => {
              dispatch({
                type: "update",
                payload: {
                  symptoms: [...state.symptoms, currentSymptom],
                },
              });
              setCurrentSymptom("");
            }}
          />
        </View>
        <View>
          <Text
            style={{
              ...styles.title,
              marginBottom: 10,
            }}
          >
            Mood
          </Text>
          <Slider
            progress={progress}
            minimumValue={min}
            maximumValue={max}
            onValueChange={(value) => {
              progress.value = value;
              dispatch({
                type: "update",
                payload: {
                  mood: value.toFixed(2),
                },
              });
            }}
          />
        </View>
        <Button
          title="Done"
          onPress={() => {
            // add  a new visit to the patient's visits in the async storage

            AsyncStorage.setItem(
              "Alice",
              JSON.stringify({
                ...patient,
                visits: [...(patient.visits ?? []), state],
              })
            ).then(() => {
              console.log(state);
              // navigate to the next screen
              router.push("/(tabs)/history");
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    gap: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  subheading: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  body: {
    fontSize: 16,
    textAlign: "left",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
