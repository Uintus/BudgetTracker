import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [todoExpenses, setTodoExpenses] = useState([]);
  const [todoIncome, setTodoIncome] = useState([]);
  const [totalBalance, setTotalBalance] = useState(15000);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  {
    /** total Balance */
  }
  useEffect(() => {
    let partialBalance1 = 0;
    let partialBalance2 = 0;
  
    todoIncome.forEach((income) => {
      partialBalance1 += income.cost;
    });
    setTotalIncome(partialBalance1);
  
    todoExpenses.forEach((expense) => {
      partialBalance2 += expense.cost;
    });
    setTotalExpenses(partialBalance2);
  
    const newTotalBalance = partialBalance1 - partialBalance2 + 15000;
    setTotalBalance(newTotalBalance);
    console.log("partialBalance1: " + partialBalance1);
    console.log("partialBalance2: " + partialBalance2);
    console.log("total: " + newTotalBalance);
  }, [todoIncome, todoExpenses]);

  return (
    <DataContext.Provider
      value={{
        todoExpenses,
        setTodoExpenses,
        todoIncome,
        setTodoIncome,
        totalBalance,
        setTotalBalance,
        totalIncome,
        totalExpenses,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
