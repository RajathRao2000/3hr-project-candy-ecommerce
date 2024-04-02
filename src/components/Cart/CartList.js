import React, { useContext } from 'react'
import Store from '../../store/store'

function CartList() {
  const {cartList}=useContext(Store)
  return (
    <table>
    <thead>
      <tr>
        <th>Candy Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Quantity</th>
      </tr>
    </thead>
    <tbody>

      {cartList.map((product) => {
        return (
          <tr key={Math.random()}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>Rs {product.price}</td>
            <td>
          {product.quantity}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
  )
}

export default CartList