import React, { useState, useContext } from "react";
import classes from "./Cart.module.css";
import {
  FaCcPaypal,
  FaGooglePay,
  FaApplePay,
  FaCreditCard,
} from "react-icons/fa";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import Context from "../components/store/cart-context";

export default function Cart(props) {
  const [enableConfirm, setEnableConfirm] = useState(false);

  const {
    toAmount1,
    toCurrency1,
    fromAmount1,
    fromCurrency1,
    setToAmount1,
    setToCurrency1,
    setFromAmount1,
    setFromCurrency1,
  } = useContext(Context);

  const [onConfirm, setOnConfirm] = useState(false);

  let cartIsEmpty = (
    <>
      <p className={classes["main-container"]}>Your cart is empty!</p>
      <>
        <button onClick={props.onClose} className={classes.link3}>
          Close
        </button>
        <button onClick={props.onClose} className={classes.link}>
          <Link to="/converter" className={classes.link}>
            Buy crypto
          </Link>
        </button>
      </>
    </>
  );

  const confirm = () => {
    setOnConfirm(true);
    setToAmount1("");
    setToCurrency1("");
    setFromAmount1("");
    setFromCurrency1("");
  };

  const empty = () => {
    setToAmount1("");
    setToCurrency1("");
    setFromAmount1("");
    setFromCurrency1("");
  };

  const enableConfirmHandler = () => {
    setEnableConfirm(true);
  };

  let basket = (
    <>
      <div className={classes["main-container"]}>
        <div className={classes.text}>
          You are purchasing: {toAmount1} {toCurrency1}
        </div>
        <div className={classes.text}>
          Amount to pay: {fromAmount1} {fromCurrency1}
        </div>
      </div>

      <div className={classes.text1}>Choose payment method:</div>
      <div className={classes["radio-buttons"]}>
        <label htmlFor="paypal" className={classes["custom-radio"]}>
          <input
            onChange={enableConfirmHandler}
            type="radio"
            name="radio"
            id="paypal"
            value="paypal"
          />
          <FaCcPaypal className={classes["radio-btn"]} />
        </label>

        <label htmlFor="google" className={classes["custom-radio"]}>
          <input
            onChange={enableConfirmHandler}
            type="radio"
            name="radio"
            id="google"
            value="google"
          />
          <FaGooglePay className={classes["radio-btn"]} />
        </label>

        <label htmlFor="apple" className={classes["custom-radio"]}>
          <input
            onChange={enableConfirmHandler}
            type="radio"
            name="radio"
            id="apple"
            value="apple"
          />
          <FaApplePay className={classes["radio-btn"]} />
        </label>

        <label htmlFor="cc" className={classes["custom-radio"]}>
          <input
            onChange={enableConfirmHandler}
            type="radio"
            name="radio"
            id="cc"
            value="cc"
          />
          <FaCreditCard className={classes["radio-btn"]} />
        </label>
      </div>

      <>
        <button className={classes.lastBtn1} onClick={props.onClose}>
          Close
        </button>
        <button className={classes.lastBtn2} onClick={empty}>
          Empty Cart
        </button>
        <button
          disabled={!enableConfirm}
          className={classes.lastBtn3}
          onClick={confirm}
        >
          Confirm
        </button>
      </>
    </>
  );
  let thanksPage = (
    <>
      <>
        <h1>Thank you for your purchase!</h1>
      </>
      <>
        <button onClick={props.onClose} className={classes.link12}>
          <Link to="/" className={classes.link1}>
            Home
          </Link>
        </button>
        <button onClick={props.onClose} className={classes.link2}>
          <Link to="/converter" className={classes.link2}>
            Buy more
          </Link>
        </button>
      </>
    </>
  );

  let valid = toAmount1 !== "";

  return (
    <Modal onClose={props.onClose}>
      {!onConfirm && !valid && cartIsEmpty}
      {valid && !onConfirm && basket}
      {onConfirm && thanksPage}
    </Modal>
  );
}
