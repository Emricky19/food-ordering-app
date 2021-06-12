import React from "react";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header: React.FC<{ onShowCart: () => void; onShowAuthForm: () => void }> =
  (props) => {
    return (
      <>
        <header className={classes.header}>
          <h1>Foodie</h1>
          <div className={classes["header-items"]}>
            <HeaderCartButton click={props.onShowCart} />
            <span className={classes["material-icons"]} onClick={props.onShowAuthForm}>login</span>
          </div>
        </header>
        <div className={classes["main-image"]}>
          <img src={mealsImage} alt="A food full of delicious food" />
        </div>
      </>
    );
  };

export default Header;
