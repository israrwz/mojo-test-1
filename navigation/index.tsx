/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, Image, View } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TodayScreen from "../screens/TodayScreen";
import ExploreScreen from "../screens/ExploreScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import ConnectScreen from "../screens/TodayScreen";
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const todayIcon = require("../assets/images/today.png");
  const todayIconInactive = require("../assets/images/today_inactive.png");
  const exploreIcon = require("../assets/images/explore.png");
  const exploreIconInactive = require("../assets/images/explore_inactive.png");
  const favouritesIcon = require("../assets/images/favourites.png");
  const favouritesIconInactive = require("../assets/images/favourites_inactive.png");
  const connectIcon = require("../assets/images/connect.png");
  const connectIconInactive = require("../assets/images/connect_inactive.png");

  return (
    <BottomTab.Navigator
      initialRouteName="Today"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].accent,
      }}
    >
      <BottomTab.Screen
        name="Today"
        component={TodayScreen}
        options={({ navigation }: RootTabScreenProps<"Today">) => ({
          title: "Today",
          headerTitle: "",
          tabBarIcon: ({ focused }) => <Image source={focused ? todayIcon : todayIconInactive} style={{ width: 28, height: 28 }} />,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors[colorScheme].accent },
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginRight: 26,
              })}
            >
              <Image source={require("../assets/images/account.png")} style={{ width: 20, height: 20 }} />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          title: "Explore",
          headerTitle: "",
          tabBarIcon: ({ focused }) => <Image source={focused ? exploreIcon : exploreIconInactive} style={{ width: 28, height: 28 }} />,
        }}
      />
      <BottomTab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          title: "Favourites",
          headerTitle: "",
          tabBarIcon: ({ focused }) => <Image source={focused ? favouritesIcon : favouritesIconInactive} style={{ width: 28, height: 28 }} />,
        }}
      />
      <BottomTab.Screen
        name="Connect"
        component={ConnectScreen}
        options={{
          title: "Connect",
          headerTitle: "",
          tabBarIcon: ({ focused }) => <Image source={focused ? connectIcon : connectIconInactive} style={{ width: 28, height: 28 }} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
