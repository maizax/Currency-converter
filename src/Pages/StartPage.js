import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./StartPage.module.css";
import Context from "../components/store/cart-context";

export default function StartPage() {
  const history = useHistory();

  const goToHomePage = () => {
    history.push("/converter");
  };

  const { login, setLogin } = useContext(Context);

  const startPageLogin = () => {
    setLogin(true);
  };

  return (
    <div className={classes.load}>
      <h1 className={classes.welcome}> Welcome to Currency Converter</h1>
      {!login ? (
        <button className={classes.button} onClick={startPageLogin}>
          Login
        </button>
      ) : (
        <button className={classes.button} onClick={goToHomePage}>
          Start Now
        </button>
      )}
    </div>
  );
}
