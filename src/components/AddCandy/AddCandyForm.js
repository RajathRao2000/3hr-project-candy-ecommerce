import React, { useContext, useRef } from "react";
import axios from "axios";

import keys from "../../keys";
import Store from "../../store/store";

function AddCandyForm() {
  const { AddToList } = useContext(Store);
  const enteredName = useRef();
  const enteredDesc = useRef();
  const enteredPrice = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = {
      name: enteredName.current.value,
      description: enteredDesc.current.value,
      price: enteredPrice.current.value,
      quantity: 0,
    };

    console.log(formData, keys.baseUrl);
    try {
      console.log(`${keys.baseUrl}/CandyList`);
      const res = await axios.post(`${keys.baseUrl}/CandyList.json`, {
        ...formData,
      });
      console.log(res);
      if (res.status === 200) {
        console.log("post success", res.data);
        AddToList(formData);
      } else {
        console.log("error ", res.error);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <section className="form-section">
      <form onSubmit={submitHandler}>
        <label htmlFor="candy-name">Name:</label>
        <input
          defaultValue={"eclair"}
          id="candy-name"
          ref={enteredName}
        ></input>
        <label htmlFor="candy-desc">Description:</label>
        <input
          defaultValue={"chocolaty"}
          id="candy-desc"
          ref={enteredDesc}
        ></input>
        <label htmlFor="candy-price">price:</label>
        <input
          defaultValue={3}
          id="candy-price"
          type="number"
          ref={enteredPrice}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default AddCandyForm;
