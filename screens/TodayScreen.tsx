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
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TodayScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
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
