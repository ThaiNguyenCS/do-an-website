import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: "",
    isLogined: false,
    username: ""
}

const cartSlicer = createSlice(
    {
        initialState,
        name: "app",
        reducers: 
        {   
            login (state, payload) {

            },

            logout (state, payload) {
                state = initialState;
            }
        }
    }
)

export default cartSlicer.reducer;
export const {login, logout} = cartSlicer.actions;