import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserAuthenticated: false,
    user: null,
    err: null
}

const authSlice = createSlice({

    name: 'auth',
    initialState,

    reducers: {
        LoginSuccess: (state, action) => {
            state.isUserAuthenticated = true;
            state.user = action.payload;
            state.err = null;
        },

        LoginFail: (state, action) => {
            state.isUserAuthenticated = false;
            state.user = null;
            state.err = action.payload;
        },

        Logout: (state) => {
            state.isUserAuthenticated = false;
            state.user = null;
        }
    }
})

export const { LoginSuccess, LoginFail, Logout } = authSlice.actions;
export default authSlice.reducer;