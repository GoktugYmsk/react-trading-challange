import { configureStore } from '@reduxjs/toolkit'
import configure from '../components/configure/configure'

export const store = configureStore({
    reducer: {
        category: configure,
        optionCategory: configure,
        filterProducts:configure,
        basketCount:configure,
        productBasket: configure,
        activeBasket:configure,
    },
})