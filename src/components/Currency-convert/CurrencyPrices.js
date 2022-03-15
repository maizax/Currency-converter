import React, { useEffect, useState, useCallback, useContext } from "react";
import CurrencyRow from "./CurrencyRow";
import Loading from "../UI/Loading";
import classes from "./CurrencyPrices.module.css";
import { FaExchangeAlt } from "react-icons/fa";
import Date from "../UI/Date";
import Context from "../store/cart-context";

const BASE_URL = "https://api.coingate.com/v2/rates";

export default function Fetch(props) {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState(1);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reverser, setReverser] = useState(true);
  const [onClick, setOnClick] = useState(false);

  const { login, setLogin } = useContext(Context);

  const currencyPageLogin = () => {
    setLogin(true);
  };

  const { setToAmount1, setToCurrency1, setFromAmount1, setFromCurrency1 } =
    useContext(Context);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = (amount * exchangeRate).toFixed(6);
  } else {
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(6);
  }

  const cryptoHandler = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setCurrencyOptions([...Object.keys(data.merchant)]);
      setFromCurrency(Object.keys(data.merchant.EUR)[1]);
      setToCurrency(Object.keys(data.merchant.BTC)[1]);
      setExchangeRate(data.merchant[Object.keys(data.merchant.BTC)[1]].EUR);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    cryptoHandler();
  }, [cryptoHandler]);

  const cryptoRateHandler = useCallback(async () => {
    if (fromCurrency != null && toCurrency != null) {
      try {
        const response = await fetch(
          `${BASE_URL}/merchant/${fromCurrency}/${toCurrency}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        setExchangeRate(data);
      } catch (error) {
        setError(error.message);
      }
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    cryptoRateHandler();
  }, [cryptoRateHandler]);

  function handleFromAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(false);
  }

  const onChangeFromCurrencyHandler = (event) => {
    setFromCurrency(event.target.value);
  };

  const onChangetoCurrencyHandler = (event) => {
    setToCurrency(event.target.value);
  };

  const reverseHandler = () => {
    setReverser((prevReverser) => !prevReverser);
  };

  const buyCrypto = () => {
    setOnClick(true);
    setToAmount1(toAmount);
    setToCurrency1(toCurrency);
    setFromAmount1(fromAmount);
    setFromCurrency1(fromCurrency);
    setTimeout(() => {
      setOnClick(false);
    }, 1500);
  };

  const click = onClick ? classes.click : classes.button;

  let content = (
    <div className={classes.center}>
      <h1 className={classes.convert}>Convert </h1>
      <br></br>
      <span className={classes.text1}>Amount:</span>{" "}
      <span className={classes.text2}>From:</span>{" "}
      <span className={classes.text3}>Amount:</span>{" "}
      <span className={classes.text4}>To:</span>
      <div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={reverser ? fromCurrency : toCurrency}
          onChangeCurrency={onChangeFromCurrencyHandler}
          onChangeAmount={handleFromAmountChange}
          amount={reverser ? fromAmount : toAmount}
        />

        <FaExchangeAlt className={classes.reverse} onClick={reverseHandler} />

        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={reverser ? toCurrency : fromCurrency}
          onChangeCurrency={onChangetoCurrencyHandler}
          onChangeAmount={handleToAmountChange}
          amount={reverser ? toAmount : fromAmount}
        />
      </div>
      <div className={classes.btnText}>
        {!login ? (
          <button className={classes.button} onClick={currencyPageLogin}>
            Login
          </button>
        ) : (
          <button onClick={buyCrypto} className={`${click}`}>
            {onClick ? <div>Added!</div> : <div>Add to Cart</div>}
          </button>
        )}
      </div>
      <div className={classes.date}>
        {reverser ? fromCurrency : toCurrency} to{" "}
        {reverser ? toCurrency : fromCurrency} conversion - Last updated{" "}
        <Date />
      </div>
    </div>
  );

  return (
    <>
      {error}
      {!error && loading && <Loading />}
      {!error && !loading && content}
    </>
  );
}
