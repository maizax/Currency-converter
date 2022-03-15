import React from "react";

const Context = React.createContext({
  toAmount: 0,
  toCurrency: "",
  fromAmount: 0,
  fromCurrency: "",
  login: false,
  setLogin: false,
});

export default Context;
