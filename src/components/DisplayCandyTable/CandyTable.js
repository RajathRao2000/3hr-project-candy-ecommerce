import React, { useContext } from "react";
import Store from "../../store/store";
import keys from "../../keys";
import axios from "axios";

function CandyTable() {
  const { productList, AddToCart } = useContext(Store);
  console.log(productList);

  const getCartList=async(productId)=>{
    const {data,status} = await axios.get(`${keys.baseUrl}/CartList.json`)
    if(data){for(let i=0;i<Object.keys(data).length;i++){
      if(productId===data[Object.keys(data)[i]].productId){
        return {...data[Object.keys(data)[i]],cartId:Object.keys(data)[i]}
      }
    }}
    return false

  }

  const ClickHandler=async (productData,quantity)=>{
    console.log("Click Handler CandyTable",productData,quantity)
    const exists=await getCartList(productData.productId)
    if(!exists){
      const res=await axios.post(`${keys.baseUrl}/CartList.json`,{
        ...productData,quantity
      })
      console.log("successful post",res,"post")
      AddToCart(res.data,quantity,"post")
    }else{
      console.log(exists)
      const res=await axios.patch(`${keys.baseUrl}/CartList/${exists.cartId}.json`,{
        quantity: exists.quantity+=quantity
      })
      console.log("patch res",res.data,"patch")
      AddToCart(res.data,quantity,"patch")

    }


  }

  return (
    <table>
      <thead>
        <tr>
          <th>Candy Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Selection</th>
        </tr>
      </thead>
      <tbody>

        {productList.map((product) => {
          return (
            <tr key={Math.random()}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>Rs {product.price}</td>
              <td>
                <button onClick={()=>ClickHandler(product,1)}>Add 1</button>
                <button onClick={()=>ClickHandler(product,2)}>Add 2</button>
                <button onClick={()=>ClickHandler(product,3)}>Add 3</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CandyTable;
