import { configureStore } from "@reduxjs/toolkit";
import modalReducer from './features/modalSlice'
import spotsReducer from './features/spotsSlice'

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        spots: spotsReducer
    }
})