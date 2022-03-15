import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import MainHeader from "./components/UI/MainHeader";
import StartPage from "./Pages/StartPage";
import CurrencyInfo from "./components/Currency-convert/CurrencyInfo";
import CurrencyPrices from "./components/Currency-convert/CurrencyPrices";
import Cart from "./Pages/Cart";
import Context from "./components/store/cart-context";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [toAmount1, setToAmount1] = useState("");
  const [toCurrency1, setToCurrency1] = useState("");
  const [fromAmount1, setFromAmount1] = useState("");
  const [fromCurrency1, setFromCurrency1] = useState("");
  const [login, setLogin] = useState(false);

  const showLogin = () => {
    setLogin((prevLogin) => !prevLogin);
  };

  const providerValue = {
    toAmount1,
    setToAmount1,
    toCurrency1,
    setToCurrency1,
    fromAmount1,
    setFromAmount1,
    fromCurrency1,
    setFromCurrency1,
    login,
    setLogin,
  };

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Context.Provider value={providerValue}>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <MainHeader onShowCart={showCartHandler} onLogin={showLogin} />
      <Switch>
        <Route path="/" exact>
          <StartPage onLogin={showLogin} />
        </Route>
        <Route path="/converter" exact>
          <CurrencyPrices onShowCart={showCartHandler} />
        </Route>
        <Route path="/search" exact>
          <CurrencyInfo onLogin={showLogin} />
        </Route>
      </Switch>
    </Context.Provider>
  );
}

export default App;
