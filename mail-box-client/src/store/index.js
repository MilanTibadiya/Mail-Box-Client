import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlicer"
import mailSlice from "./MailSlicer";

const store = configureStore({
    reducer: { 
        auth: authSlice.reducer,
        mail: mailSlice.reducer
    },
});

export default store;