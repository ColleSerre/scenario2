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
        paddingHorizontal: 20,
        gap: 35,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        History
      </Text>
      <View
        style={{
          gap: 20,

          borderRadius: 10,
          padding: 20,
          borderColor: "black",
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Alice
        </Text>
        {mockData.map((visit) => (
          <View key={visit.date.toISOString()} style={{ gap: 10 }}>
            <Text
              style={{
                fontSize: 20,
              }}
            >
              {visit.date.toDateString()}
            </Text>
            {visit.meds.map((med) => (
              <Text
                key={med.name}
                style={{
                  fontSize: 20,
                }}
              >
                {med.name}: {med.amount} / {med.recommended}
              </Text>
            ))}
            {visit.symptoms.map((symptom) => (
              <Text
                key={symptom}
                style={{
                  fontSize: 20,
                }}
              >
                {symptom}
              </Text>
            ))}
            <Text
              style={{
                fontSize: 20,
              }}
            >
              Mood {visit.mood} / 10
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default History;
