import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';
import customAxios from '../CustomAxios/customAxios';
// import { useDispatch, useSelector } from 'react-redux';
// import { LoginSuccess } from '../redux/authentication/authSlice';

export const LoginPage = () => {

    const [loginFormData, setLoginFormData] = useState(null);
    const navigate = useNavigate();

    //----------------Handle Form Change-----------------
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    //----------------Handle form submit-----------------
    const handleLoginSubmitBtn = (e) => {
        e.preventDefault();

        if (loginFormData && loginFormData.email && loginFormData.password) {
            // console.log(loginFormData);
            try {
               customAxios.post('/api/users/login', { email: loginFormData.email, password: loginFormData.password }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }).then((response) => {
                    console.log(response);
                    Cookies.set('User', response.data.token);
                    navigate('/')
                    window.location.reload();
                })
            } catch (err) {
                console.log(`ERROR on login button function: ${err}`)
            }
        } else {
            alert('Please enter E-mail and Password.');
        }
    }

    return (
        <div className="h-auto flex flex-col justify-center sm:py-12" >
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <h1 className="font-bold text-center text-2xl mb-5">MNNLR  Workspace</h1>
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    <form className="px-5 py-7">
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                        <input onChange={handleFormChange} placeholder='Enter your E-mail' name='email' type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                        <input onChange={handleFormChange} placeholder='Enter your Password' name='password' type="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                        <button type='submit' onClick={handleLoginSubmitBtn} className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">Login</button>
                    </form>
                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center justify-center sm:text-left whitespace-nowrap">
                                <button className=" transition duration-200 mx-5 px-5 pt-2 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-7 h-7 align-text-top" viewBox="0 0 24 24"><path fill="gray" d="M16 7.992C16 3.58 12.416 0 8 0S0 3.58 0 7.992c0 2.43 1.104 4.62 2.832 6.09c.016.016.032.016.032.032c.144.112.288.224.448.336c.08.048.144.111.224.175A8 8 0 0 0 8.016 16a8 8 0 0 0 4.48-1.375c.08-.048.144-.111.224-.16c.144-.111.304-.223.448-.335c.016-.016.032-.016.032-.032c1.696-1.487 2.8-3.676 2.8-6.106m-8 7.001c-1.504 0-2.88-.48-4.016-1.279c.016-.128.048-.255.08-.383a4.2 4.2 0 0 1 .416-.991c.176-.304.384-.576.64-.816c.24-.24.528-.463.816-.639c.304-.176.624-.304.976-.4A4.2 4.2 0 0 1 8 10.342a4.18 4.18 0 0 1 2.928 1.166q.552.552.864 1.295q.168.432.24.911A7.03 7.03 0 0 1 8 14.993m-2.448-7.4a2.5 2.5 0 0 1-.208-1.024c0-.351.064-.703.208-1.023s.336-.607.576-.847s.528-.431.848-.575s.672-.208 1.024-.208c.368 0 .704.064 1.024.208s.608.336.848.575c.24.24.432.528.576.847c.144.32.208.672.208 1.023c0 .368-.064.704-.208 1.023a2.8 2.8 0 0 1-.576.848a2.8 2.8 0 0 1-.848.575a2.72 2.72 0 0 1-2.064 0a2.8 2.8 0 0 1-.848-.575a2.5 2.5 0 0 1-.56-.848zm7.424 5.306c0-.032-.016-.048-.016-.08a5.2 5.2 0 0 0-.688-1.406a4.9 4.9 0 0 0-1.088-1.135a5.2 5.2 0 0 0-1.04-.608a3 3 0 0 0 .464-.383a4.2 4.2 0 0 0 .624-.784a3.6 3.6 0 0 0 .528-1.934a3.7 3.7 0 0 0-.288-1.47a3.8 3.8 0 0 0-.816-1.199a3.9 3.9 0 0 0-1.2-.8a3.7 3.7 0 0 0-1.472-.287a3.7 3.7 0 0 0-1.472.288a3.6 3.6 0 0 0-1.2.815a3.8 3.8 0 0 0-.8 1.199a3.7 3.7 0 0 0-.288 1.47q0 .528.144 1.007c.096.336.224.64.4.927c.16.288.384.544.624.784q.216.216.48.383a5 5 0 0 0-1.04.624c-.416.32-.784.703-1.088 1.119a5 5 0 0 0-.688 1.406c-.016.032-.016.064-.016.08C1.776 11.636.992 9.91.992 7.992C.992 4.14 4.144.991 8 .991s7.008 3.149 7.008 7.001a6.96 6.96 0 0 1-2.032 4.907" /></svg>
                                    <Link to='/signup' className="inline-block">Don't have an Account</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="text-center sm:text-left whitespace-nowrap">
                            <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <Link to="/" className="inline-block ml-1">Back to Home Page</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
