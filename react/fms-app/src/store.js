import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice";
import truckReducer from "./redux/truckSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        trucks: truckReducer
    }
})

export default store;