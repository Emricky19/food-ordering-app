import React from "react";

import CartContext from "./cart-context";

const CartProvider = (props) => {
  const addItemHandler = (item) => {};

  const removeItemHandler = (id) => {};
  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return <CartContext value={cartContext}>{props.children}</CartContext>;
};

export default CartProvider;
