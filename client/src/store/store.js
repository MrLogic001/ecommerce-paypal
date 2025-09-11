import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index"
import adminProductsSlice from './admin/product-slice/'
import adminOrderSlice from './admin/order-slice'
import shoppingProductsSlice from './shop/productSlice'
import shoppingCartReducer from './shop/cartSlice.js'
import shopAddressSlice from './shop/addressSlice'
import shopOrderSlice from './shop/orderSlice'
import shopSearchSlice from './shop/searchSlice'
import shopReviewSlice from './shop/reviewSlice'
import commonFeatureSlice from './commonSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,

        adminProducts: adminProductsSlice,
        adminOrders: adminOrderSlice,

        shopProducts: shoppingProductsSlice,
        shopCart: shoppingCartReducer,
        shopAddress: shopAddressSlice,
        shopOrder: shopOrderSlice,
        shopSearch: shopSearchSlice,
        shopReview: shopReviewSlice,

        commonFeature: commonFeatureSlice
    }
})

export default store