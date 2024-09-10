import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "../actions/loginAction";
import Cookies from 'js-cookie';

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
        updateUser: (state, action) => {
            console.log('action from update user', action);
            state.user = action.payload
        }
      },
      
    extraReducers: (builder) => {
        builder
        .addCase(loginAction.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(loginAction.fulfilled, (state, action) => {
            console.log('this is actin', action)
            state.isLoading = false,
            state.user = action?.payload
        })
        .addCase(loginAction.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action?.payload;
        });
    }
});

export const { logoutSuccess, updateUser } = loginSlice.actions;

export default loginSlice.reducer;