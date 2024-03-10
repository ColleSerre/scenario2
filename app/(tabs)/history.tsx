import { View, Text } from "react-native";
import { Visit } from "../../types/visits";
const mockData: Visit[] = [
  {
    date: new Date(),
    meds: [
      {
        name: "Paracetamol",
        amount: 1,
        recommended: 2,
      },
    ],
    symptoms: ["Headache"],

    mood: "5",
    notes: "",
  },
];

const History = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingLeft: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        History
      </Text>

      <Text>Alice</Text>
      {mockData.map((visit) => (
        <View key={visit.date.toISOString()}>
          <Text>{visit.date.toISOString()}</Text>
          {visit.meds.map((med) => (
            <Text key={med.name}>
              {med.name} {med.amount} / {med.recommended}
            </Text>
          ))}
          {visit.symptoms.map((symptom) => (
            <Text key={symptom}>{symptom}</Text>
          ))}
          <Text>{visit.mood}</Text>
        </View>
      ))}
    </View>
  );
};

export default History;
