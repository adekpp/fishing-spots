import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toRequest: null,
    selectedSpot: null
}

const spotsSlice = createSlice({
    name: "spots",
    initialState,
    reducers: {
        setToRequest: (state,{ payload }) => {
            state.toRequest = payload
        },
        setSelectedSpot: (state, { payload }) => {
            state.selectedSpot = payload
        }
    }
})
export const {setToRequest, setSelectedSpot} = spotsSlice.actions
export default spotsSlice.reducer