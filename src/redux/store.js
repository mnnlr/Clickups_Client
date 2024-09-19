import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authentication/authSlice'
import dashboardReducer from './dashboards/dashboardSlice'
import loginReducer from './authentication/loginSlice'
import ThemeReducer from './Mode/ThemeSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        login: loginReducer,
        darkMode: ThemeReducer
    }
})

export default store;