import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categories: '',
}

export const configure = createSlice({
    name: 'control',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
    }
})

export const {setCategories } = configure.actions

export default configure.reducer
