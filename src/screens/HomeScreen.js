import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DataContext } from "../constants/DataContext";
import { getData } from "../data/GetData";

export default function HomeScreen() {
  const windowDimensions = useWindowDimensions();
  const width = windowDimensions.width;
  const height = windowDimensions.height;
  const isPortrait = height > width;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    containerS: {
      width: width - 90,
      height: height - 100,
      // borderWidth: 0.5,
      marginTop: 120,
      backgroundColor: "white",
    },
    containerSL: {
      // borderWidth: 0.5,
      width: width - 150,
      height: height - 40,
      marginTop: 120,
      backgroundColor: "white",
    },

    header: {
      // borderWidth: 0.5,
      flexDirection: "row",
      // justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
    },
    dots: {
      width: 25,
      height: 25,
    },
    header_text: { fontSize: 20, marginLeft: (width - 90) / 3 },

    card: {
      height: height - 670,
      overflow: "hidden",
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
    },
    card_cont: {
      // borderWidth: 0.5,
      width: width - 140,
      height: height - 720,
    },

    balance: {
      fontSize: 15,
      color: "white",
      marginBottom: 6,
    },
    balance_gr: {
      flexDirection: "row",
      marginLeft: 6,
      marginBottom: 50,
    },
    balance_num: {
      fontSize: 18,
      color: "white",
      fontWeight: "bold",
    },

    income: {
      // borderWidth: 0.5,
      width: width - 300,
      marginRight: 45,
    },
    incomeGr: {
      flexDirection: "row",
      // justifyContent: "center",
      alignItems: "center",
      marginBottom: 6,
    },

    income_gr: {
      flexDirection: "row",
    },
    nextCir: {
      width: 25,
      height: 25,
      backgroundColor: "#56CF5B",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 30,
      marginRight: 6,
    },
    nextCirUp: {
      width: 25,
      height: 25,
      backgroundColor: "#D32727",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 30,
      marginRight: 6,
    },
    next1: {
      width: 18,
      height: 18,
      transform: [{ rotate: "90deg" }],
    },
    next: {
      width: 18,
      height: 18,
      transform: [{ rotate: "-90deg" }],
    },
    income_text: {
      color: "white",
    },
    incomeGr2: {
      flexDirection: "row",
      marginLeft: 6,
    },
    incomeGr2_2: {
      flexDirection: "row",
      marginLeft: 14,
    },
    income_num: {
      color: "white",
      fontWeight: "600",
    },

    transactions: {
      // borderWidth: 0.5,
      height: height - 523,
    },

    trans_text: {
      fontSize: 19,
      fontWeight: "bold",
      marginBottom: 10,
    },

    item: {
      height: height - 820,
      marginBottom: 10,
      borderRadius: 10,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    item_box: {
      // borderWidth: 0.5,
      height: height - 840,
      width: width - 120,
      flexDirection: "row",
    },
    item_Cost: {
      // borderWidth: 0.5,
      flexDirection: "row",
      width: width - 264,
      marginLeft: width - 350,
      justifyContent: "center",
      alignItems: "center",
    },
    item_Name: {
      fontSize: 15,
      fontWeight: "600",
      marginBottom: 8,
    },
    item_Time: {
      fontSize: 14,
      color: "#575656",
    },
    cost_ex: {
      //  textAlign: "right"
      fontWeight: "600",
      color: "#D32727",
    },
    cost_in: {
      fontWeight: "600",
      color: "#56CF5B",
    },

    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.03)",
    },
  });
  const { totalBalance, totalIncome, totalExpenses, todoIncome, todoExpenses } =
    useContext(DataContext);

  return (
    <View style={styles.container}>
      <View style={isPortrait ? styles.containerS : styles.containerSL}>
        {/* header */}
        <View style={styles.header}>
          <Image style={styles.dots} source={require("../assets/more.png")} />
          <Text style={styles.header_text}>Home</Text>
        </View>

        {/* card */}
        <ImageBackground
          style={styles.card}
          source={require("../assets/bg.jpg")}
        >
          <View style={styles.card_cont}>
            <Text style={styles.balance}>Total Balance</Text>
            <View style={styles.balance_gr}>
              <Text style={styles.balance_num}>$ </Text>
              <Text style={styles.balance_num}>{totalBalance}</Text>
            </View>

            <View style={styles.income_gr}>
              <View style={styles.income}>
                <View style={styles.incomeGr}>
                  <View style={styles.nextCir}>
                    <Image
                      style={[styles.next1]}
                      source={require("../assets/next.png")}
                    />
                  </View>
                  <Text style={styles.income_text}>Income</Text>
                </View>

                <View style={styles.incomeGr2}>
                  <Text style={styles.income_num}>$ </Text>
                  <Text style={styles.income_num}>{totalIncome}</Text>
                </View>
              </View>

              <View style={styles.income}>
                <View style={styles.incomeGr}>
                  <View style={styles.nextCirUp}>
                    <Image
                      style={styles.next}
                      source={require("../assets/next.png")}
                    />
                  </View>
                  <Text style={styles.income_text}>Expenses</Text>
                </View>
                <View style={styles.incomeGr2_2}>
                  <Text style={styles.income_num}>$ </Text>
                  <Text style={styles.income_num}>{totalExpenses}</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* transactions */}
        <Text style={styles.trans_text}>Transactions</Text>
        <View style={styles.transactions}>
          <ScrollView showsVerticalScrollIndicator='false'>
            {/** expenses */}
            {todoExpenses.map((item, index) => {
              return (
                <View style={styles.item} key={index}>
                  <View style={styles.item_box}>
                    <View>
                      <Text style={styles.item_Name}>{item.name}</Text>
                      <Text style={styles.item_Time}>{item.date}</Text>
                    </View>
                    <View style={styles.item_Cost}>
                      <Text style={styles.cost_ex}>-$ </Text>
                      <Text style={styles.cost_ex}>{item.cost}</Text>
                    </View>
                  </View>

                  <View style={styles.overlay} />
                </View>
              );
            })}

            {/** income */}
            {todoIncome.map((item, index) => {
              return (
                <View style={styles.item} key={index}>
                  <View style={styles.item_box}>
                    <View>
                      <Text style={styles.item_Name}>{item.name}</Text>
                      <Text style={styles.item_Time}>{item.date}</Text>
                    </View>
                    <View style={styles.item_Cost}>
                      <Text style={styles.cost_in}>+$ </Text>
                      <Text style={styles.cost_in}>{item.cost}</Text>
                    </View>
                  </View>

                  <View style={styles.overlay} />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
