import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  console.log("addToCart:", id, qty);
  const { data } = await axios.get(`/api/products/${id}`);
  console.log("Add to cart fetch result", data);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.count_in_stock,
      qty,
    },
  });
  console.log("Getting state object", getState());
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
