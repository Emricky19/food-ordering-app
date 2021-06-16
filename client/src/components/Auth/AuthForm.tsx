import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../../store/auth-context";
import { LOGIN_USER, REGISTER_USER } from "../../util/graphql";

import Modal from "../UI/Modal";
import classes from "./AuthForm.module.css";

interface userCredentials {
  username: string;
  password: string;
}

type ErrorsType = {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  general: string | undefined;
}

const AuthForm: React.FC<{ onClose: () => void }> = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors ] = useState<ErrorsType | null>(null);
  const [values, setValues] = useState<userCredentials>({
    username: "",
    ...(!isLogin && { email: '' }),
    password: ""
  });

  const { login } = useContext(AuthContext);

  const MUTATION = isLogin ? LOGIN_USER : REGISTER_USER;

  const [loginUser, { loading }] = useMutation(MUTATION, {
    update(_, { data }) {
      const userData = MUTATION === LOGIN_USER ? data.loginUser : data.registerUser;
      login(userData);
      props.onClose()
      window.location.reload(true)
    },
    onError(err) {      
      setErrors(err.graphQLErrors[0].extensions?.exception.errors)
      console.log(err.graphQLErrors[0].extensions?.exception.errors);
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
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                onChange={changeHandler}
                required
              />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              onChange={changeHandler}
              required
            />
          </div>
          {errors?.general && <p style={{color: 'red', marginTop: '10px'}}>{errors.general}</p>}
          <div className={classes.actions}>
            <button type="submit" disabled={loading}>
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
