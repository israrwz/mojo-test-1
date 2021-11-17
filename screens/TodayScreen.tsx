import * as React from "react";
import { StyleSheet, Image } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export default function TodayScreen({ navigation }: RootTabScreenProps<"Today">) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <View style={{ ...styles.goalContainer, backgroundColor: Colors[colorScheme].accent }}>
        <Text style={styles.smallWhite}>Your current goal</Text>
        <View style={{ flexDirection: "row", backgroundColor: "transparent", marginBottom: 24 }}>
          <Text style={styles.bigHeading}>Feel more confident</Text>
          <Image source={require("../assets/images/pencil.png")} style={{ width: 40, height: 52 }} />
        </View>
        <View style={styles.progressBar}>
          <View style={{ ...styles.progressBar, width: 30, backgroundColor: "#EFF3FE" }}></View>
        </View>
        <Text style={{ ...styles.smallWhite, fontSize: 14 }}>1 / 7 days completed</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View>
          <Text style={styles.title}>Day 1</Text>
          <MessageBox label="Read  10 min" description="How porn affects your confidence" />
          <MessageBox label="Listen  9 min" description="Create positive views of your erections" />
        </View>
        <View style={styles.notification}>
          <View style={{ flexDirection: "row", backgroundColor: "transparent" }}>
            <Text style={{ color: "#fff" }}>Mojo's daily poll 📆</Text>
            <Text style={{ color: "#fff", textDecorationLine: "underline" }}>Open</Text>
          </View>
          <Image source={require("../assets/images/close_white.png")} style={{ width: 18, height: 18 }} />
        </View>
      </View>
    </View>
  );
}

type Message = {
  label: string;
  description: string;
};

function MessageBox({ label, description }: Message) {
  return (
    <View style={styles.messageBox}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 32,
    marginBottom: 12,
    flexGrow: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  messageBox: {
    marginBottom: 12,
    backgroundColor: "#EFF3FE",
    borderRadius: 20,
    padding: 16,
  },
  label: {
    fontSize: 14,
    color: "#101725",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#101725",
  },
  notification: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#5033FF",
    borderRadius: 12,
    color: "#fff",
    padding: 16,
  },
  goalContainer: {
    height: 158,
    paddingLeft: 16,
    paddingRight: 16,
  },
  smallWhite: {
    fontSize: 16,
    color: "#fff",
  },
  bigHeading: {
    fontSize: 30,
    lineHeight: 52,
    fontWeight: "700",
    color: "#fff",
  },
  progressBar: {
    width: 216,
    height: 6,
    backgroundColor: "#98A0D014", // with 20% opacity
    borderRadius: 8,
    marginBottom: 16,
  },
});
