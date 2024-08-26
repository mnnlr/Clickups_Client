import React from 'react'
import { Logout } from '../redux/authentication/authSlice'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const LogoutBtn = ({ btnStyle }) => {

    const userToken = Cookies.get('User')
    const navigate = useNavigate();

    if (!userToken) return null
    const handleLoginBtn = () => {
        try {
            Cookies.remove('User');
            window.location.reload();
        } catch (err) {
            console.log(`ERROR on logout button function: ${err}`)
        }
    }

    return (
        <button className={btnStyle} onClick={handleLoginBtn} >Logout</button>
    )
}