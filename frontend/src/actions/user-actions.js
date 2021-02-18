import axios from "axios";
import jwt_decode from "jwt-decode";

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_REQUEST,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post("/api/auth/login/", { email: email, password: password }, config);
    const decodedJWT = jwt_decode(data.access);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: decodedJWT,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT_REQUEST,
  });
};

export const register = (email, password, username, first_name) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/auth/register/",
      { email: email, password: password, username: username, first_name: first_name },
      config
    );
    const decodedJWT = jwt_decode(data.access);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: decodedJWT,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
  }
};
