import { StatusBar } from "expo-status-bar";
import axios from "axios";
import React, { useState, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  useWindowDimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { DataContext } from "../constants/DataContext";

export default function OverviewScreen() {
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
      borderWidth: 0.5,
      marginTop: 120,
      backgroundColor: "white",
    },

    header: {
      // borderWidth: 0.5,
      flexDirection: "row",
      // justifyContent: "center",
      alignItems: "center",
      marginBottom: 50,
    },
    dots: {
      width: 25,
      height: 25,
    },
    header_text: { fontSize: 20, marginLeft: (width - 90) / 4 },

    tab: {
      alignItems: "center",
      marginBottom: 40,
    },
    tabBox: {
      // borderWidth: 0.5,
      width: width - 100,
      height: height - 830,
      flexDirection: "row",
      borderRadius: 15,
      backgroundColor: "#F6F1F1",
    },
    income_tab: {
      // borderWidth: 0.5,
      flex: 1,
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#2DD134",
    },
    expenses_tab: {
      // borderWidth: 0.5,
      flex: 1,
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F46040",
    },
    tab_text: {
      fontSize: 16,
      fontWeight: "500",
      color: "white",
    },

    transactions: {
      // borderWidth: 0.5,
      height: height - 355,
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
      marginTop: -50,
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
      color: "#281259",
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
      width: 120,
      height: 60,
      backgroundColor: "#AE35CF",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
    },
    deleteItem: {
      width: 120,
      height: 60,
      backgroundColor: "#281259",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
    },
    save: {
      fontSize: 14,
      color: "white",
    },
    buttons: {
      width: 270,
      flexDirection: "row",
      justifyContent: "space-around",
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
      backgroundColor: "rgba(0, 0, 0, 0.03)",
    },
  });
  const { todoIncome, todoExpenses } = useContext(DataContext);

  const handleScreenPress = () => {
    Keyboard.dismiss();
  };

  const [showExpensesItem, setShowExpensesItem] = useState(false);
  const [showIncomeItem, setShowIncomeItem] = useState(true);

  const [showExpenses, setShowExpenses] = useState(false);
  const [showIncome, setShowIncome] = useState(false);

  const [selectedItem, setSelectedItem] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputNote, setInputNote] = useState("");

  const [showAlertCom, setShowAlertCom] = useState(false);
  const [showAlertEr, setShowAlertEr] = useState(false);

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
      const itemId = selectedItem.id; // ID của mục cần cập nhật

      const newData = {
        name: inputName,
        note: inputNote,
        cost: parseInt(inputValue),
      };

      if (!newData.name || !newData.cost || !newData.note) {
        setShowAlertEr(true);
        setShowAlertCom(false);
        setTimeout(() => {
          setShowAlertEr(false);
          setShowAlertCom(false);
        }, 1500);

        return;
      }

      const response = await axios.patch(`${url}/${itemId}.json`, newData);
      setShowAlertEr(false);
      setShowAlertCom(true);
      console.log("Dữ liệu đã được cập nhật thành công:", response.data);
      setTimeout(() => {
        setShowAlertEr(false);
        setShowAlertCom(false);
      }, 1500);
    } catch (error) {
      setShowAlertEr(true);
      setShowAlertCom(false);
      console.error("Lỗi khi cập nhật dữ liệu:", error);
      setTimeout(() => {
        setShowAlertEr(false);
        setShowAlertCom(false);
      }, 1500);
    }
  };

  const isLastData = async (url) => {
    const newData = {
      name: "inputName",
      note: "inputNote",
      cost: parseInt("inputValue"),
    };
    try {
      const response = await axios.get(`${url}.json`);
      return !response.data; // Trả về true nếu dữ liệu không tồn tại
    } catch (error) {
      console.error("Lỗi khi kiểm tra dữ liệu:", error);
      return false;
    }
  };

  const deleteItem = async (url) => {
    try {
      const isLast = await isLastData(url); // Kiểm tra nếu đó là dữ liệu cuối cùng
      console.log("last: " + isLast);
      const itemId = selectedItem.id;
      if (isLast) {
        // Nếu đó là dữ liệu cuối cùng, sử dụng phương thức POST để cập nhật thành mảng rỗng
        await axios.post(`${url}.json`, []);

        setShowAlertEr(false);
        setShowAlertCom(true);
        console.log("Đã thêm [] thành công");
        await axios.delete(`${url}/${itemId}.json`);
      } else {
        // Nếu không phải dữ liệu cuối cùng, xóa dữ liệu bằng cách gửi yêu cầu DELETE với itemId
        // Kiểm tra và lấy giá trị của itemId từ selectedItem

        await axios.delete(`${url}/${itemId}.json`);

        setShowAlertEr(false);
        setShowAlertCom(true);
        console.log("Dữ liệu đã được xóa thành công");
      }

      setInputValue("");
      setInputName("");
      setInputNote("");

      setTimeout(() => {
        setShowIncome(false);
        setShowExpenses(false);
      }, 1000);
    } catch (error) {
      setShowAlertEr(true);
      setShowAlertCom(false);
      console.error("Lỗi khi xóa dữ liệu:", error);
    }
  };
  console.log(inputNote);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleScreenPress}>
        <View style={isPortrait ? styles.containerS : styles.containerSL}>
          {/** show item detail */}
          {showExpenses || showIncome ? (
            <>
              {showExpenses && (
                <View style={styles.expenses_cont}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      setShowAlertCom(false), setShowAlertEr(false);
                      setShowExpenses(false);
                    }}
                  >
                    <Text style={styles.exit}>x</Text>
                  </TouchableOpacity>

                  {showAlertCom && (
                    <View style={styles.alertCome}>
                      <Text style={styles.textCom}>Successfully!</Text>
                    </View>
                  )}
                  {showAlertEr && (
                    <View style={styles.alertCome}>
                      <Text style={styles.textEr}>Unsuccessfully!</Text>
                    </View>
                  )}

                  <View style={styles.box}>
                    <Text style={styles.name}>Expenses</Text>
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

                    {/** button */}
                    <View style={styles.buttons}>
                      <TouchableOpacity
                        style={styles.deleteItem}
                        activeOpacity={0.8}
                        onPress={() =>
                          deleteItem(
                            "https://expensestracks-default-rtdb.firebaseio.com/expenses"
                          )
                        }
                      >
                        <Text style={styles.save}>DELETE</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.saveItem}
                        activeOpacity={0.8}
                        onPress={() =>
                          saveItem(
                            "https://expensestracks-default-rtdb.firebaseio.com/expenses"
                          )
                        }
                      >
                        <Text style={styles.save}>UPDATE</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              {showIncome && (
                <View style={styles.expenses_cont}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      setShowAlertCom(false), setShowAlertEr(false);
                      setShowIncome(false);
                    }}
                  >
                    <Text style={styles.exit}>x</Text>
                  </TouchableOpacity>

                  {showAlertCom && (
                    <View style={styles.alertCome}>
                      <Text style={styles.textCom}>Successfully!</Text>
                    </View>
                  )}
                  {showAlertEr && (
                    <View style={styles.alertCome}>
                      <Text style={styles.textEr}>Unsuccessfully!</Text>
                    </View>
                  )}

                  <View style={styles.box}>
                    <Text style={styles.name}>Income</Text>
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

                    <View style={styles.buttons}>
                      <TouchableOpacity
                        style={styles.deleteItem}
                        activeOpacity={0.8}
                        onPress={() =>
                          deleteItem(
                            "https://expensestracks-default-rtdb.firebaseio.com/income"
                          )
                        }
                      >
                        <Text style={styles.save}>DELETE</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.saveItem}
                        activeOpacity={0.8}
                        onPress={() =>
                          saveItem(
                            "https://expensestracks-default-rtdb.firebaseio.com/income"
                          )
                        }
                      >
                        <Text style={styles.save}>UPDATE</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </>
          ) : (
            <View>
              {/* header */}
              <View style={styles.header}>
                <Image
                  style={styles.dots}
                  source={require("../assets/more.png")}
                />
                <Text style={styles.header_text}>Overview</Text>
              </View>

              {/* Tab */}
              <View style={styles.tab}>
                <View style={styles.tabBox}>
                  <TouchableOpacity
                    style={styles.income_tab}
                    activeOpacity={0.8}
                    onPress={() => {
                      setShowIncomeItem(true), setShowExpensesItem(false);
                    }}
                  >
                    <Text style={styles.tab_text}>Income</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.expenses_tab}
                    activeOpacity={0.8}
                    onPress={() => {
                      setShowExpensesItem(true), setShowIncomeItem(false);
                    }}
                  >
                    <Text style={styles.tab_text}>Expenses</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* transactions */}
              <View style={styles.transactions}>
                <ScrollView>
                  {/** expenses */}
                  {showExpensesItem &&
                    todoExpenses.map((item, index) => (
                      <TouchableOpacity
                        style={styles.item}
                        key={index}
                        activeOpacity={0.8}
                        onPress={() => {
                          setSelectedItem(item);
                          setShowExpenses(true);
                          setInputName(item.name);
                          setInputNote(item.note);
                          setInputValue(item.cost.toString());
                        }}
                      >
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
                      </TouchableOpacity>
                    ))}

                  {/** income */}
                  {showIncomeItem &&
                    todoIncome.map((item, index) => {
                      return (
                        <TouchableOpacity
                          style={styles.item}
                          key={index}
                          activeOpacity={0.8}
                          onPress={() => {
                            setSelectedItem(item);
                            setShowIncome(true);
                            setInputName(item.name);
                            setInputNote(item.note);
                            setInputValue(item.cost.toString());
                          }}
                        >
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
                        </TouchableOpacity>
                      );
                    })}
                </ScrollView>
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>

      <StatusBar style="auto" />
    </View>
  );
}
