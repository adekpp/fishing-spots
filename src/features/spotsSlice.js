import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toRequest: {}
}

const spotsSlice = createSlice({
    name: "spots",
    initialState,
    reducers: {
        setToRequest: (state,{ payload }) => {
            state.toRequest = payload
        }
    }
})
export const {setToRequest} = spotsSlice.actions
export default spotsSlice.reducer