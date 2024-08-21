import React from 'react'
import { useDispatch } from 'react-redux'
import { Logout } from '../redux/authentication/authSlice'
import { useNavigate } from 'react-router-dom';

export const LogoutBtn = ({ btnStyle }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginBtn = () => {
        try {
            dispatch(Logout())
            navigate('/')
        } catch (err) {
            console.log(`ERROR on logout button function: ${err}`)
        }
    }

    return (
        <button className={btnStyle} onClick={handleLoginBtn} >Logout</button>
    )
}