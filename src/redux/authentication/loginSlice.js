import { createSlice } from "@reduxjs/toolkit";
import { loginAction, logoutAction } from "../actions/loginAction";
import Cookies from 'js-cookie';
import { act } from "react";

const initialState = {
    user: {},
    isLoading: false,
    error: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logoutSuccess: (state) => {
          state.user = null;
          state.token = null;
          Cookies.remove = 'User';
        },
        setUser: (state, action) => {
            console.log('action from update user', action.payload);
            state.isLoading = false;

            state.user = {
                _id: action?.payload?._id?action?.payload?._id : state?.user?._id,
                name: action?.payload?.name?action?.payload?.name: state?.user?.name,
                email: action?.payload?.email?action?.payload?.email: state?.user?.email,
                role:action?.payload?.role?action?.payload?.role: state?.user?.role,
                accessToken: action?.payload?.accessToken? action?.payload?.accessToken: state?.user?.accessToken
            }
        }
      },
      
    extraReducers: (builder) => {
        builder
        .addCase(loginAction.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(loginAction.fulfilled, (state, action) => {
            console.log('this is action login', action.payload)
            state.isLoading = false,
            state.user = action?.payload?.Data
        })
        .addCase(loginAction.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action?.payload;
        })
        // logout action
        .addCase(logoutAction.fulfilled, (state)=> {
            state.isLoading = false;
            state.user = null;
            state.error= null;
        })
    }
});

export const { logoutSuccess, setUser } = loginSlice.actions;

export default loginSlice.reducer;