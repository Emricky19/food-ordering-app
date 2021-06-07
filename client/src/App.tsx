import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import AuthForm from "./components/Auth/AuthForm";

import AuthProvider from "./store/auth-context";
import CartProvider from "./store/CartProvider";

const App = () => {
  const [isCartShown, setIsCartShown] = useState(false);
  const [isAuthFormShown, setIsAuthFormShown] = useState(false);

  const showCartHandler = () => {
    setIsCartShown(true);
  };

  const hideCartHandler = () => {
    setIsCartShown(false);
  };

  const showAuthForm = () => {
    setIsAuthFormShown(true);
  };

  const hideAuthForm = () => {
    setIsAuthFormShown(false);
  };
  return (
    <AuthProvider>
      <CartProvider>
        {isAuthFormShown && <AuthForm onClose={hideAuthForm} />}
        {isCartShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} onShowAuthForm={showAuthForm} />
        <main>
          <Meals />
        </main>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
