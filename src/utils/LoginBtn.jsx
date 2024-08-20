import React from 'react'
import { useDispatch } from 'react-redux'
import { LoginSuccess, LoginFail } from '../redux/authentication/authSlice'

export const LoginBtn = () => {

    const dispatch = useDispatch();

    const handleLoginBtn = () => {
        try {
            const userData = { // Dumy Data
                name: 'John Doe',
                email: 'C8O4I@example.com',
            }
            console.log("login")
            dispatch(LoginSuccess(userData))
        } catch (err) {
            console.log(`ERROR on login button function: ${err}`)
            dispatch(LoginFail(err.message))
        }
    }

    return (
        <button onClick={handleLoginBtn} >LogIn</button>
    )
}
