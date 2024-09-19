<<<<<<< HEAD
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

=======
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

>>>>>>> 5021c6d71957294c70dc404f0a3dcea3c2280e07
export default store;