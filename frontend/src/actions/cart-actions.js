import axios from "axios";
import { CART_ADD_ITEM } from "../constants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  console.log("addToCart:", id, qty);
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
