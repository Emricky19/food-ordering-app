import React, { useContext } from "react";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

import { AuthContext } from "../../store/auth-context";

const Header: React.FC<{ onShowCart: () => void; onShowAuthForm: () => void }> =
  (props) => {
    const { user: isLoggedIn, logout } = useContext(AuthContext);
    return (
      <>
        <header className={classes.header}>
          <h1>Foodie</h1>
          <div className={classes["header-items"]}>
            <HeaderCartButton click={props.onShowCart} />
            {!isLoggedIn && (
              <span
                className={classes["material-icons"]}
                onClick={props.onShowAuthForm}
              >
                login
              </span>
            )}
            {isLoggedIn && (
              <span
                className={classes["material-icons"]}
                onClick={() => logout()} 
              >
                logout
              </span>
            )}
          </div>
        </header>
        <div className={classes["main-image"]}>
          <img src={mealsImage} alt="A food full of delicious food" />
        </div>
      </>
    );
  };

export default Header;
