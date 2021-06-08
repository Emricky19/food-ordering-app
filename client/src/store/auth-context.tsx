import React, { createContext, FC, useState } from "react";
import jwtDecode from "jwt-decode";

interface User {
  id: string;
  username: string;
  token: string;
  exp: number;
}

interface AuthContextInferface {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

type initState = {
  user: User | null;
};
const initialState: initState = {
  user: null,
};

const storedToken = localStorage.getItem("token");

if(storedToken){
    const decodedToken: User = jwtDecode(storedToken);

    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
    } else {
      initialState.user = decodedToken;
    }
}


export const AuthContext = createContext<AuthContextInferface>({
  user: initialState.user,
  login: (userData) => {},
  logout: () => {},
});

const AuthProvider: FC = (props) => {
  const [user, setUser] = useState<User | null>(initialState.user);

  const loginHandler = (userData: User) => {
    localStorage.setItem("token", userData.token);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  const contextValue: AuthContextInferface = {
    user,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
