import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: "",
    isLogined: false,
    username: ""
}

const appSlicer = createSlice(
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

export default appSlicer.reducer;
export const {login, logout} = appSlicer.actions;