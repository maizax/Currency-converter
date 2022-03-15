import React from "react";
import classes from "./CurrencyRow.module.css";

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;

  return (
    <span className={classes.span}>
      <input
        label="Amount"
        className={classes.input}
        type="number"
        value={amount}
        onChange={onChangeAmount}
        min="0"
        step="0.01"
      />
      <select
        className={classes.select}
        value={selectedCurrency}
        onChange={onChangeCurrency}
      >
        {currencyOptions.map((crypto, index) => (
          <option key={index} value={crypto}>
            {crypto}
          </option>
        ))}
      </select>
    </span>
  );
}
