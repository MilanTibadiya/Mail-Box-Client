import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isLogin: false,
    IdToken: localStorage.getItem('idToken'),
}

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            localStorage.setItem('idToken',action.payload);
            state.isLogin = true;
            state.IdToken = action.payload
        },
        logout(state) {
            localStorage.removeItem('idToken')
            localStorage.removeItem('userEmail')
             state.isLogin = false
             state.IdToken = null
        },
    }
})
export const authAction = authSlice.actions
export default authSlice