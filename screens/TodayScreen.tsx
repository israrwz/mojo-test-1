import * as React from "react";
import { useState, useEffect } from "react";

import { StyleSheet, Image, Pressable } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

import { useSelector, useDispatch } from "react-redux";
import { ApplicationState, onLoadPoll } from "../redux";

export default function TodayScreen({ navigation }: RootTabScreenProps<"Today">) {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  const { poll, error } = useSelector((state: ApplicationState) => state.pollReducer);

  useEffect(() => {
    dispatch(onLoadPoll());
  }, [poll]);

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
        {poll.id && (
          <Pressable
            onPress={() => navigation.navigate("Modal")}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}
          >
            <View style={styles.notification}>
              <View style={{ flexDirection: "row", backgroundColor: "transparent" }}>
                <Text style={{ color: "#fff", fontFamily: "sofia", lineHeight: 20, marginRight: 8 }}>Mojo's daily poll 📆</Text>
                <Text style={{ color: "#fff", fontFamily: "sofia", lineHeight: 20, textDecorationLine: "underline" }}>Open</Text>
              </View>
              <Image source={require("../assets/images/close_white.png")} style={{ width: 18, height: 18 }} />
            </View>
          </Pressable>
        )}
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
    fontFamily: "sofia",
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
    fontFamily: "sofia-bold",
    fontSize: 24,
    marginBottom: 16,
  },
  messageBox: {
    marginBottom: 12,
    backgroundColor: "#EFF3FE",
    borderRadius: 20,
    padding: 16,
  },
  label: {
    fontFamily: "sofia",
    fontSize: 14,
    color: "#101725",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    fontFamily: "sofia",
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
    fontFamily: "sofia",
    color: "#fff",
  },
  bigHeading: {
    fontSize: 30,
    fontFamily: "sofia-bold",
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
