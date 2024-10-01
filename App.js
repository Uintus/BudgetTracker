import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DataProvider } from "./src/constants/DataContext";
import HomeScreen from "./src/screens/HomeScreen";
import OverviewScreen from "./src/screens/OverviewScreen";
import AddItemScreen from "./src/screens/AddItemScreen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Platform } from "react-native";
import "firebase/database";
import { FetchDataIncome, FetchDataExpenses } from "./src/data/GetData";


const Tab = createBottomTabNavigator();

export default function App() {
  const windowDimensions = useWindowDimensions();
  const width = windowDimensions.width;
  const height = windowDimensions.height;
  const isPortrait = height > width;

  console.log(isPortrait);

  console.log("width: " + width + " height: " + height);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
    },
    mainbar: {
      width: width - 90,
      height: Platform.OS === "ios" ? height - 820 : height - 770,
      marginBottom: Platform.OS === "ios" ? 30 : 20,
      backgroundColor: "white",
    },
    mainbarL: {
      width: width - 150,
      height: Platform.OS === "ios" ? height - 350 : height - 770,
      marginBottom: Platform.OS === "ios" ? 30 : 20,
      // backgroundColor: "red",
    },

    bar: {
      borderColor: "white",
      width: Platform.OS === "ios" ? width - 90 : width - 120,
      height: Platform.OS === "ios" ? height - 820 : height - 770,
      backgroundColor: "#070926",
      marginBottom: Platform.OS === "ios" ? 30 : 20,
      borderRadius: 20,
    },
    home: {
      marginBottom: -25,
      width: Platform.OS === "ios" ? width - 230 : width - 300,
      height: Platform.OS === "ios" ? height - 820 : height - 770,
      backgroundColor: "#070926",
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 100,
    },
    homeL: {
      marginBottom: -25,
      width: Platform.OS === "ios" ? width - 700 : width - 300,
      height: Platform.OS === "ios" ? height - 350 : height - 770,
      backgroundColor: "#070926",
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 350,
      marginBottom: Platform.OS === "ios" ? -13 : 20,
    },
    plus: {
      marginBottom: -25,
      width: Platform.OS === "ios" ? width - 230 : width - 300,
      height: Platform.OS === "ios" ? height - 820 : height - 770,
      backgroundColor: "#070926",
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 80,
    },
    plusL: {
      marginBottom: -13,
      width: Platform.OS === "ios" ? width - 700 : width - 300,
      height: Platform.OS === "ios" ? height - 350 : height - 770,
      backgroundColor: "#070926",
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 65,
    },
    trend: {
      marginBottom: -25,
      width: Platform.OS === "ios" ? width - 300 : width - 300,
      height: Platform.OS === "ios" ? height - 820 : height - 770,
      backgroundColor: "#070926",
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: -30,
    },
    trendL: {
      marginBottom: -25,
      width: Platform.OS === "ios" ? width - 800 : width - 300,
      height: Platform.OS === "ios" ? height - 350 : height - 770,
      backgroundColor: "#070926",
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: -270,
      marginBottom: Platform.OS === "ios" ? -13 : 20,
    },
  });

  const tabBarOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: isPortrait ? styles.mainbar : styles.mainbarL,
  };

  return (
    <DataProvider>
      <FetchDataIncome />
      <FetchDataExpenses />
      <View style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={tabBarOptions}>
            <Tab.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View style={[isPortrait ? styles.home : styles.homeL]}>
                    <FontAwesome
                      name="home"
                      style={{
                        color: focused ? "white" : "#575656",
                        fontSize: 28,
                        marginRight: 70,
                      }}
                    />
                  </View>
                ),
              }}
            />

            <Tab.Screen
              name="AddItemScreen"
              component={AddItemScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View style={[isPortrait ? styles.plus : styles.plusL]}>
                    <FontAwesome
                      name="plus"
                      style={{
                        color: focused ? "#C04BF2" : "#575656",
                        fontSize: 40,
                        marginRight: 70,
                      }}
                    />
                  </View>
                ),
              }}
            />

            <Tab.Screen
              name="OverviewScreen"
              component={OverviewScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View style={[isPortrait ? styles.trend : styles.trendL]}>
                    <FontAwesome
                      name="bar-chart-o"
                      style={{
                        color: focused ? "white" : "#575656",
                        fontSize: 26,
                        marginLeft: 20,
                      }}
                    />
                  </View>
                ),
              }}
            ></Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </DataProvider>
    
      
    
  );
}
