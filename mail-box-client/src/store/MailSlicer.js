import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allMails: []
};

const mailSlice = createSlice({
    initialState: initialState,
    name: 'mail',
    reducers: {
        setMail(state, action) {
            state.allMails = action.payload
        }
    }
})

export const mailAction = mailSlice.actions;

export default mailSlice;