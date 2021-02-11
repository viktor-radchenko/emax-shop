import axios from "axios";

import { _transformProduct } from "../services";

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants";

export const listProducts = () => async (dispatch) => {
  console.log("Starting list product action");
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/products");
    console.log("This is data:", data);
    const transformedData = data.map((product) => _transformProduct(product));
    console.log(transformedData);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: transformedData });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  console.log("Starting list product action");
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);
    const transformedData = _transformProduct(data);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: transformedData });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
