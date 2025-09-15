import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "@/store/auth-slice";

const initialState = {
  isLoading: false,
  shoppingProducts: [],
  productDetails: null,
  isError: null,
};

export const getAllFilteredProducts = createAsyncThunk(
  "/products/getallproducts",
  async ({ filterParams, sortParams }) => {

    const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams
    })
    const response = await axios.get(
      `${backendUrl}/api/shop/products/get?${query}`,
      {}
    );
    return response?.data;
  }
);

export const getProductDetails = createAsyncThunk(`/products/getproductdetails/`, async(id) => {

    const result = await axios.get(`${backendUrl}/api/shop/products/get/${id}`)

    return result?.data
})

const shoppingProductsSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {
      setProductDetails: (state) => {
      state.productDetails = null;
      }
  },
  extraReducers(builder) {
    builder
      .addCase(getAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFilteredProducts.fulfilled, (state, action) => {
        console.log(action.payload);

        state.isLoading = false;
        state.shoppingProducts = action.payload.data;
      })
      .addCase(getAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.shoppingProducts = [];
        state.isError = action.payload;
      })
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        console.log(action.payload);

        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = [];
        state.isError = action.payload;
      })
  },
});

export const { setProductDetails } = shoppingProductsSlice.actions

export default shoppingProductsSlice.reducer;
