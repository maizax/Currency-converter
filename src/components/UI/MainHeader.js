import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";
import { BiSearch } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import Context from "../store/cart-context";

export default function MainHeader(props) {
  const { login } = useContext(Context);

  return (
    <header className={classes.header}>
      <NavLink to="/" exact>
        <div className={classes.logo}>CC</div>
      </NavLink>
      <nav className={classes.nav}>
        <ul>
          {login && (
            <li>
              <NavLink activeClassName={classes.active} to="/converter">
                Converter
              </NavLink>
            </li>
          )}
          {login && (
            <li>
              <NavLink activeClassName={classes.active} to="/search" exact>
                <BiSearch />
              </NavLink>
            </li>
          )}
          {login && (
            <li>
              <FaShoppingCart
                className={classes.cart}
                onClick={props.onShowCart}
              />
            </li>
          )}
          <li>
            <div className={classes.cart}>
              {!login && <p onClick={props.onLogin}>Login</p>}

              {login && <p onClick={props.onLogin}>Logout</p>}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
