import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack, Tabs } from "expo-router";
import { Pressable, SafeAreaView, View } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Patient } from "@/types/patient";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const Header = (props: { patients: Patient[] }) => {
  const { patients } = props;
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      {patients.map((patient) => (
        <Link
          key={patient.name}
          href={{
            pathname: "/",
            params: { patientName: patient.name },
          }}
          style={{
            padding: 10,
            borderBottomWidth: 2,
            borderBottomColor: "transparent",
            backgroundColor: "#1e88e5",
          }}
        >
          {patient.name}
        </Link>
      ))}
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Log a Visit",
            tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          }}
        />

        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="history" color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
}
