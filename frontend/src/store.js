import { createStore, combineReducers, applyMiddleware } from "redux";
import jwt_decode from "jwt-decode";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productDetailsReducer, cartReducer, userLoginReducer } from "./reducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userInfo: userLoginReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? jwt_decode(JSON.parse(localStorage.getItem("userInfo")).access)
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
  userInfo: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
