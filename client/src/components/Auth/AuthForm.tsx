import React, { useState, useRef } from "react";
import Modal from "../UI/Modal";
import classes from "./AuthForm.module.css";

const AuthForm: React.FC<{onClose: () => void}> = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const switchAuthModeHandler = () => {
    setIsLogin(!isLogin);
  };

  const submitHandler = (e: React.FormEvent) => {
    const enteredUsername = usernameInputRef.current!.value;
    const eneterPassword = passwordInputRef.current!.value;
    console.log({
      enteredUsername,
      eneterPassword,
    });
  };

  return (
    <Modal click={props.onClose}>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" ref={usernameInputRef} required />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              ref={passwordInputRef}
              required
            />
          </div>
          <div className={classes.actions}>
            <button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </button>
            <button className={classes.toggle} onClick={switchAuthModeHandler}>
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default AuthForm;
