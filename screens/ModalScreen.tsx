import { stringLiteral } from "@babel/types";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { PollModel, AnswerOption } from "../redux";

export default function ModalScreen({ route, navigation }: any) {
  const { response_count, question_text, answers_options } = route.params;

  return (
    <View style={styles.container}>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <Pressable
        onPress={() => navigation.goBack(null)}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <Image source={require("../assets/images/close.png")} style={{ width: 30, height: 30 }} />
      </Pressable>
      <Text style={styles.question}>{question_text}</Text>
      {answers_options.map(({ slug, text }: AnswerOption, idx: number) => (
        <View key={idx} style={styles.option}>
          <Text style={styles.option_text}>{text}</Text>
        </View>
      ))}
      <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
        <Text style={{ fontSize: 16, lineHeight: 24, color: "#101725" }}>{response_count} responses</Text>
        <Text style={{ fontSize: 16, lineHeight: 24, color: "#101725", marginTop: 38, textDecorationLine: "underline" }}>I don't want to answer</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  question: {
    marginTop: 32,
    marginBottom: 32,
    fontSize: 30,
    fontFamily: "sofia-bold",
    // lineHeight: 52,
    color: "#101725",
  },
  option: {
    backgroundColor: "#EFF3FE",
    borderRadius: 9999,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 12,
  },
  option_text: {
    fontFamily: "sofia",
    fontSize: 18,
    lineHeight: 28,
    color: "#101725",
  },
});
