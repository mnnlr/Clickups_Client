import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserAuthenticated: false,
    token: null,
    err: null
}

const authSlice = createSlice({

    name: 'auth',
    initialState,

    reducers: {
        LoginSuccess: (state, action) => {
            state.isUserAuthenticated = true;
            state.token = action.payload;
            state.err = null;
        },

        LoginFail: (state, action) => {
            state.isUserAuthenticated = false;
            state.token = null;
            state.err = action.payload;
        },

        Logout: (state) => {
            state.isUserAuthenticated = false;
            state.token = null;
        }
    }
})

export const { LoginSuccess, LoginFail, Logout } = authSlice.actions;
export default authSlice.reducer;