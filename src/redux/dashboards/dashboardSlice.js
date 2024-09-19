import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dashboards: {},
    error: null,
};

const dashboardSlice = createSlice({

    name: 'dashboard',
    initialState,

    reducers: {
        dashboardData(state, action) {
            state.dashboards = action.payload
            state.error = null
        },

        dashboardError(state, action) {
            state.error = action.payload
        }
    }
})

export const { dashboardData, dashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;