import React, { useEffect, useState } from "react";
import keys from "../keys";
import axios from "axios";
import Store from "./store";

function StoreProvider(props) {
  const [store, setStore] = useState({
    productList: [],
    AddToList: addToProductList,
    cartList: [],
    AddToCart: AddToCartList,
  });
  const getCartList = async (productId) => {
    const { data, status } = await axios.get(`${keys.baseUrl}/CartList.json`);
    if (data) {
      setStore(prev=>{
        const newList={...prev}
        newList.cartList=Object.keys(data).map((cartId)=>{
          const cart=data[cartId]
          return {
            name:cart.name,
            description: cart.description,
            price: cart.price,
            productId: cart.productId,
            quantity: cart.quantity
          }
        })
        return newList
      })

    }
    return false;
  };
  useEffect(() => {
    const getProductList = async () => {
      try {
        const { data, status } = await axios.get(
          `${keys.baseUrl}/CandyList.json`
        );

        if (status == 200) {
          setStore((prev) => {
            const newList = { ...prev };
            newList.productList = data?Object.keys(data).map((itemId) => {
              const product = data[itemId];
              return {
                productId: itemId,
                name: product.name,
                description: product.description,
                price: product.price,
              };
            }):[];
            return newList;
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    getProductList();


    getCartList()
  }, []);

  function addToProductList(formData) {
    // const { name, description, price } = formData;
    setStore((prev) => {
      const newList = { ...prev };
      newList.productList.push(formData);
      return newList;
    });
  }

  // function addToProductList(productData,quantity) {
  //   // const { name, description, price } = formData;
  //   console.log(productData,quantity)
  // }

  function AddToCartList(productData, quantity,method) {
    getCartList()
    // if(method==="post"){
    //   setStore(prev=>{
    //     const newList = {...prev}
    //   })
    // }
  }

  return <Store.Provider value={store}>{props.children}</Store.Provider>;
}

export default StoreProvider;
