import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authentication/authSlice'
import dashboardReducer from './dashboards/dashboardSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer
    }
})

export default store;