import { createContext } from "react";

const Store = createContext({
  productList: [],
  AddToList: () => {},
  cartList: [],
  AddToCart: () => {},
});

export default Store;
