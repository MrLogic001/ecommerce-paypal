import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading: false,
    productsList: []
}

export const addNewProduct = createAsyncThunk('/products/addnewproduct', async (formData) => {
    const response = await axios.post('http://localhost:5000/api/admin/products/add', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response?.data
})

export const getAllProducts = createAsyncThunk('/products/getallproducts', async () => {
    const response = await axios.get('http://localhost:5000/api/admin/products/get',  {
    })
    return response?.data
})

export const editProduct = createAsyncThunk('/products/editproduct', async ({ id, formData }) => {
    const response = await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response?.data
})

export const deleteProduct = createAsyncThunk('/products/deleteproduct', async (id) => {
    const response = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`)
    
    return response?.data
})

const adminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllProducts.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllProducts.fulfilled, (state, action) => {
            console.log(action.payload.data);            
            
            state.isLoading = false;
            state.productsList = action.payload.data
        })
         .addCase(getAllProducts.rejected, (state) => {
            
            state.isLoading = false;
            state.productsList = [];
        })
    }
})

export default adminProductsSlice.reducer