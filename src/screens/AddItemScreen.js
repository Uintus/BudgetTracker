import { StatusBar } from "expo-status-bar";
import React, { useState} from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import moment from "moment";

import axios from "axios";

export default function AddItemScreen() {
  const windowDimensions = useWindowDimensions();
  const width = windowDimensions.width;
  const height = windowDimensions.height;
  const isPortrait = height > width;

  const [showAddExpenses, setShowAddExpenses] = useState(false);
  const [showAddIncome, setShowAddIncome] = useState(false);

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
      justifyContent: "center",
      alignItems: "center",
    },
    containerSL: {
      // borderWidth: 0.5,
      width: width - 150,
      height: height - 40,
      marginTop: 120,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },

    addExpenses: {
      width: 200,
      height: 70,
      backgroundColor: "#F46040",
      marginTop: -123,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    addIncome: {
      width: 200,
      height: 70,
      backgroundColor: "#22D82A",
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 17,
      color: "white",
      fontWeight: "500",
    },
    Ortext: {
      marginVertical: 10,
      fontSize: 15,
    },

    expenses_cont: {
      width: width - 90,
      height: height,
      // borderWidth: 0.5,
      marginTop: 30,
      backgroundColor: "white",
    },
    exit: {
      fontSize: 30,
      color: "#4E4C4C",
      marginTop: -10,
      textAlign: "right",
    },

    box: {
      marginTop: 120,
      justifyContent: "center",
      alignItems: "center",
    },
    name: {
      fontWeight: "500",
      fontSize: 20,
      marginBottom: 20,
      marginTop: -70,
    },
    cost: {
      width: 250,
      height: 80,
      backgroundColor: "#ECEBEB",
      borderRadius: 40,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 25,
    },

    num: {
      fontSize: 20,
      fontWeight: "500",
    },
    input: {
      fontSize: 25,
      fontWeight: "500",
    },
    nameBox: {
      width: 300,
      height: 70,
      backgroundColor: "#ECEBEB",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    nameText: {
      fontSize: 18,
      marginLeft: -300 / 1.3,
    },
    inputName: {
      // borderWidth: 0.5,
      width: 270,
      height: 50,
    },
    noteBox: {
      width: 300,
      height: 200,
      backgroundColor: "#ECEBEB",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 40,
    },
    noteText: {
      fontSize: 18,
      marginLeft: -300 / 1.25,
    },
    inputNote: {
      // borderWidth: 0.5,
      width: 270,
      height: 170,
      // justifyContent: "none",
      // alignItems: "center",
    },
    saveItem: {
      width: 180,
      height: 60,
      backgroundColor: "#AE35CF",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
    },
    save: {
      fontSize: 16,
      color: "white",
    },

    alertCome: {
      // borderWidth: 0.5,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
    },
    textCom: {
      color: "#31B404",
      fontSize: 16,
    },
    textEr: {
      color: "#B43104",
      fontSize: 16,
    },

    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "white",
      marginTop: -30,
    },
  });
  // const datacontext = useContext(DataContext);

  const handleScreenPress = () => {
    Keyboard.dismiss();
  };

  const [showAlertCom, setShowAlertCom] = useState(false);
  const [showAlertEr, setShowAlertEr] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputNote, setInputNote] = useState("");

  const handleInputChange = (num) => {
    setInputValue(num);
  };
  const handleInputName = (text) => {
    setInputName(text);
  };
  const handleInputNote = (text) => {
    setInputNote(text);
  };

  const saveItem = async (url) => {
    try {
      const newData = {
        name: inputName,
        cost: parseInt(inputValue),
        date: moment().format("DD/MM/YYYY"),
        note: inputNote,
      };

      // Kiểm tra các thuộc tính
      if (!newData.name || !newData.cost || !newData.date || !newData.note) {
        setShowAlertEr(true);
        setShowAlertCom(false);
        setTimeout(() => {
          setShowAlertEr(false);
          setShowAlertCom(false);
        }, 1500);
        setInputValue("");
        setInputName("");
        setInputNote("");
        return;
      }

      const response = await axios.post(url, newData);
      setShowAlertEr(false);
      setShowAlertCom(true);
      setTimeout(() => {
        setShowAlertEr(false);
        setShowAlertCom(false);
      }, 1500);
      console.log("Dữ liệu đã được thêm thành công:", response.data);
      setInputValue("");
      setInputName("");
      setInputNote("");
    } catch (error) {
      setShowAlertEr(true);
      setShowAlertCom(false);
      setTimeout(() => {
        setShowAlertEr(false);
        setShowAlertCom(false);
      }, 1500);
      console.error("Lỗi khi thêm dữ liệu:", error);
    }
  };

  console.log("alertCom: " + showAlertCom);

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={styles.container}>
        <View style={isPortrait ? styles.containerS : styles.containerSL}>
          <TouchableOpacity
            style={styles.addExpenses}
            activeOpacity={0.8}
            onPress={() => setShowAddExpenses(true)}
          >
            <Text style={styles.text}>Add Expenses</Text>
          </TouchableOpacity>

          <Text style={styles.Ortext}>or</Text>

          <TouchableOpacity
            style={styles.addIncome}
            activeOpacity={0.8}
            onPress={() => setShowAddIncome(true)}
          >
            <Text style={styles.text}>Add Income</Text>
          </TouchableOpacity>

          {showAddExpenses && (
            <View style={styles.expenses_cont}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setShowAddExpenses(false),
                    setShowAlertCom(false),
                    setShowAlertEr(false);
                }}
              >
                <Text style={styles.exit}>x</Text>
              </TouchableOpacity>

              {showAlertCom && (
                <View style={styles.alertCome}>
                  <Text style={styles.textCom}>Added successfully!</Text>
                </View>
              )}
              {showAlertEr && (
                <View style={styles.alertCome}>
                  <Text style={styles.textEr}>Add not successful!</Text>
                </View>
              )}

              <View style={styles.box}>
                <Text style={styles.name}>Add Expenses</Text>
                <View style={styles.cost}>
                  <Text style={styles.num}>$</Text>
                  <TextInput
                    style={styles.input}
                    // defaultValue="0"
                    value={inputValue}
                    onChangeText={handleInputChange}
                    keyboardType="numeric"
                  />
                </View>
                <Text style={styles.nameText}>Name</Text>
                <View style={styles.nameBox}>
                  <TextInput
                    style={styles.inputName}
                    value={inputName}
                    onChangeText={handleInputName}
                    keyboardType="default"
                  />
                </View>
                <Text style={styles.noteText}>Note</Text>
                <View style={styles.noteBox}>
                  <TextInput
                    style={styles.inputNote}
                    value={inputNote}
                    onChangeText={handleInputNote}
                    keyboardType="default"
                  />
                </View>

                <TouchableOpacity
                  style={styles.saveItem}
                  activeOpacity={0.8}
                  onPress={() =>
                    saveItem(
                      "https://expensestracks-default-rtdb.firebaseio.com/expenses.json"
                    )
                  }
                >
                  <Text style={styles.save}>SAVE</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {showAddIncome && (
            <View style={styles.expenses_cont}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setShowAddIncome(false),
                    setShowAlertCom(false),
                    setShowAlertEr(false);
                }}
              >
                <Text style={styles.exit}>x</Text>
              </TouchableOpacity>

              {showAlertCom && (
                <View style={styles.alertCome}>
                  <Text style={styles.textCom}>Added successfully!</Text>
                </View>
              )}
              {showAlertEr && (
                <View style={styles.alertCome}>
                  <Text style={styles.textEr}>Add not successful!</Text>
                </View>
              )}

              <View style={styles.box}>
                <Text style={styles.name}>Add Income</Text>
                <View style={styles.cost}>
                  <Text style={styles.num}>$</Text>
                  <TextInput
                    style={styles.input}
                    // defaultValue="0"
                    value={inputValue}
                    onChangeText={handleInputChange}
                    keyboardType="numeric"
                  />
                </View>
                <Text style={styles.nameText}>Name</Text>
                <View style={styles.nameBox}>
                  <TextInput
                    style={styles.inputName}
                    value={inputName}
                    onChangeText={handleInputName}
                    keyboardType="default"
                  />
                </View>
                <Text style={styles.noteText}>Note</Text>
                <View style={styles.noteBox}>
                  <TextInput
                    style={styles.inputNote}
                    value={inputNote}
                    onChangeText={handleInputNote}
                    keyboardType="default"
                  />
                </View>

                <TouchableOpacity
                  style={styles.saveItem}
                  activeOpacity={0.6}
                  onPress={() =>
                    saveItem(
                      "https://expensestracks-default-rtdb.firebaseio.com/income.json"
                    )
                  }
                >
                  <Text style={styles.save}>SAVE</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}
