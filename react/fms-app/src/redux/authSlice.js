import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // user: {"id": 1, "username": "admin", "password": "admin123", "role": "admin" }
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginAccess: (state, action) => {
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        }
    }
})

export const {loginAccess, logout} = authSlice.actions;
export default authSlice.reducer;

