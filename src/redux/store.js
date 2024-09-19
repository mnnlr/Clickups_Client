import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authentication/authSlice'
import dashboardReducer from './dashboards/dashboardSlice'
import loginReducer from './authentication/loginSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        login: loginReducer,
    }
})

export default store;