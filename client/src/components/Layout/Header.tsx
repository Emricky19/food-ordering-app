import React from "react";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header: React.FC<{onShowCart: () => void }> = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Foodie</h1>
        <HeaderCartButton click={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A food full of delicious food" />
      </div>
    </>
  );
};

export default Header;
