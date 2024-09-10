import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../CustomAxios/customAxios";

export const loginAction = createAsyncThunk(
  "/auth/login",
  async (loginData, { rejectWithValue }) => {
    console.log('loginData', loginData);
    try {
      const { data, status } = await axiosPrivate.post(
        "api/users/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if(status === 200){
          return data.Data;
        }
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
  }
);
