import { stringLiteral } from "@babel/types";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { ApplicationState, Options, AnswersModel, onSendAnswer, StatsModel } from "../redux";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ModalScreen({ route, navigation }: any) {
  const { response_count, question_text, answers_options } = route.params;

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [currentAnswer, setAnswer] = useState("");

  const { answers, error } = useSelector((state: ApplicationState) => state.answersReducer);

  const sendAnswer = async (slug: string) => {
    setLoading(true);
    setAnswer(slug);
    await sleep(300);
    await dispatch(onSendAnswer(slug));
    setLoading(false);
  };

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
      {answers_options.map(({ slug, text }: Options, idx: number) => (
        <Pressable
          key={idx}
          onPress={() => !answers.answer_stats && sendAnswer(slug)}
          style={({ pressed }) => ({
            opacity: !answers.answer_stats && pressed ? 0.5 : 1,
          })}
        >
          <View>
            <View
              style={[
                styles.option,
                currentAnswer != slug && loading ? { opacity: 0.2 } : {},
                answers.answer_stats
                  ? { width: (answers.answer_stats as any)[slug] / 100 + "%", backgroundColor: currentAnswer == slug ? "#98A0D0" : "#98A0D066" }
                  : { width: "100%" },
              ]}
            >
              {currentAnswer == slug && loading && <ActivityIndicator size="small" color="#101725" />}
              {currentAnswer == slug && !loading && <Image source={require("../assets/images/check.png")} style={{ width: 24, height: 24 }} />}
            </View>
            <Text style={[styles.option_text, currentAnswer == slug ? styles.option_text_selected : {}]}>{text}</Text>
            {answers.answer_stats && <Text style={[styles.option_text, { right: 0, position: "absolute" }]}>{Math.round((answers.answer_stats as any)[slug] / 100)}%</Text>}
          </View>
        </Pressable>
      ))}
      <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
        <Text style={{ fontSize: 16, lineHeight: 24, color: "#101725" }}>{response_count} responses</Text>
        {!answers.answer_stats && (
          <Pressable
            onPress={() => sendAnswer("null")}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}
          >
            <Text style={{ fontSize: 16, lineHeight: 24, color: "#101725", marginTop: 38, textDecorationLine: "underline" }}>I don't want to answer</Text>
            {currentAnswer == "null" && loading && <ActivityIndicator size="small" color="#101725" />}
          </Pressable>
        )}
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
    lineHeight: 36,
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
    flexDirection: "row",
    width: "10%",
    minWidth: 70,
    height: 48,
  },
  option_text: {
    position: "absolute",
    fontFamily: "sofia",
    fontSize: 18,
    lineHeight: 52,
    marginLeft: 24,
    color: "#101725",
  },
  option_text_selected: {
    marginLeft: 54,
  },
});
