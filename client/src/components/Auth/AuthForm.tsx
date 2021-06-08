import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import Modal from "../UI/Modal";
import classes from "./AuthForm.module.css";

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      id
      username
    }
  }
`;

interface userCredentials {
  username: string;
  password: string;
}

const AuthForm: React.FC<{ onClose: () => void }> = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [values, setValues] = useState<userCredentials>({
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      console.log(result);
    },
    onError(err) {
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(err.graphQLErrors[0].extensions!.exceptions.errors);
    },
    variables: values,
  });

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    setValues((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  };

  const switchAuthModeHandler = () => {
    setIsLogin(!isLogin);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    loginUser();
  };

  return (
    <Modal click={props.onClose}>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={changeHandler}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              onChange={changeHandler}
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
