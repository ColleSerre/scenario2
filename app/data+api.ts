import { Patient } from "@/types/patient";
import { ExpoRequest, ExpoResponse } from "expo-router/server";

export function GET(req: ExpoRequest) {
  const patients: Patient[] = [
    {
      name: "Alice",
      age: 25,
      meds: [
        {
          name: "Ibuprofen",
          recommended: 1,
          amount: 0,
        },
        {
          name: "Paracetamol",
          recommended: 1,
          amount: 0,
        },
        {
          name: "Aspirin",
          recommended: 1,
          amount: 0,
        },
      ],
      symptoms: ["Headache", "Fever", "Cough"],
      notes: [],
      visits: [
        {
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
              recommended: 1,
            },
            {
              name: "Aspirin",
              amount: 0,
              recommended: 1,
            },
          ],
          symptoms: ["Headache", "Fever", "Cough"],
          mood: 0,
          notes: "",
        },
      ],
    },
    {
      name: "Bob",
      age: 30,
      meds: [
        {
          name: "Ibuprofen",
          recommended: 1,
          amount: 0,
        },
        {
          name: "Paracetamol",
          recommended: 1,
          amount: 0,
        },
        {
          name: "Aspirin",
          recommended: 1,
          amount: 0,
        },
      ],
      symptoms: ["Headache", "Fever", "Cough"],
      notes: [],
      visits: [
        {
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
              recommended: 1,
            },
            {
              name: "Aspirin",
              amount: 0,
              recommended: 1,
            },
          ],
          symptoms: ["Headache", "Fever", "Cough"],
          mood: 0,
          notes: "",
        },
      ],
    },
  ];

  return ExpoResponse.json(
    {
      patients: patients,
    },
    {
      status: 200,
    }
  );
}
