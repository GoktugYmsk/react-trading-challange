import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categories: '',
    selectedCategory: '',
    inputFilter: '',
    count: 0,
    productBasket: [],
}

export const configure = createSlice({
    name: 'control',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setInputFilter: (state, action) => {
            state.inputFilter = action.payload;
        },
        setCount: (state, action) => {
            state.count = action.payload;
        },
        setProductBasket: (state, action) => {
            state.productBasket = action.payload;
        },
    }
})

export const { setCategories, setSelectedCategory, setInputFilter, setCount,setProductBasket } = configure.actions

export default configure.reducer
