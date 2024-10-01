import axios from "axios";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useContext, useRef } from "react";
import { db } from "../config";
import { ref, onValue } from "firebase/database";
import { DataContext } from "../constants/DataContext";

export const FetchDataIncome = () => {
  const { todoIncome, setTodoIncome } = useContext(DataContext);

  useEffect(() => {
    const starCountRef = ref(db, "income/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newItemIncome = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        console.log("Income: " + newItemIncome);
        setTodoIncome(newItemIncome);
      } else {
        setTodoIncome([]); // Xử lý trường hợp dữ liệu không tồn tại
      }
    });
  }, []);
};

export const FetchDataExpenses = () => {
  const { todoExpenses, setTodoExpenses } = useContext(DataContext);

  useEffect(() => {
    const starCountRef = ref(db, "expenses/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const newItemIncome = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      console.log("Expenses: " + newItemIncome);
      setTodoExpenses(newItemIncome);
    });
  }, []);
};

const styles = StyleSheet.create({});
