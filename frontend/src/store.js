// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import {thunk} from 'redux-thunk';
// import { productDetailsReducer, productReducer } from './reducers/productReducer';

// const reducer = combineReducers({
//     products: productReducer,
//     productDetails:productDetailsReducer
// });

// let initialState = {};


// const store = configureStore({
//   reducer,
//   initialState,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
//   // 默认情况下，Redux Toolkit 已经包含了 DevTools 支持
// });

// export default store;



import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from './reducers/productReducer';
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { shopCartReducer } from "./reducers/shopCartReducer"
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: shopCartReducer,
    newOrder: newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    product:productsReducer,
    allOrders: allOrdersReducer,
    order:orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
  
});

// 获取初始状态
const preloadedState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
        shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    }
};

// 配置 store
const store = configureStore({
    reducer,
    preloadedState, // 使用 preloadedState 替代 initialState
    // Redux Toolkit 默认包含了 redux-thunk 和 DevTools
});

export default store;