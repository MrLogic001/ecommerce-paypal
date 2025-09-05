import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index"
import adminProductsSlice from './admin/product-slice/'
import shoppingProductsSlice from './shop/productSlice'
import shoppingCartReducer from './shop/cartSlice.js'
import shopAddressSlice from './shop/addressSlice'
import shopOrderSlice from './shop/orderSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
        shopProducts: shoppingProductsSlice,
        shopCart: shoppingCartReducer,
        shopAddress: shopAddressSlice,
        shopOrder: shopOrderSlice,
    }
})

export default store