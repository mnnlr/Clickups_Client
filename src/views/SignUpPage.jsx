import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import customAxios from '../CustomAxios/customAxios';
import { showToast } from '../components/Toastconfig';
import { toast } from 'react-toastify';

export const SignUpPage = () => {

    const [signinFormData, setSigninFormData] = useState(null);

    const navigate = useNavigate();

    //----------------Handle Form Change-----------------
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setSigninFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    //----------------Handle form submit-----------------
    const handleSigninSubmitBtn = async (e) => {
        e.preventDefault();

        if (signinFormData && signinFormData.email && signinFormData.password && signinFormData.name && signinFormData.confirmPassword) {
            if (signinFormData.password === signinFormData.confirmPassword) {
                try {
                    console.log(signinFormData);
                    
                    const response = await customAxios.post('/api/users/signup', signinFormData, {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    });
                    
                    if (response.data.success) {
                        toast.success(response.data.message); // Show success message
                        navigate('/signin'); // Navigate only after successful signup
                    } else {
                        toast.error(response.data.message || "Signup failed. Please try again.");
                    }
                } catch (error) {
                    const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
                    toast.error(errorMessage);
                }
            } else {
                alert('Password and Confirm Password should be the same.');
            }
        } else {
            alert('Please enter all fields.');
        }
    }

    return (
        <div className="h-auto flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <h1 className="font-bold text-center text-2xl mb-5">MNNLR  Workspace</h1>
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    <form className="px-5 py-7">
                        <div className="mb-4">
                            <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="name">Name</label>
                            <input onChange={handleFormChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" type="text" id="name" name="name" placeholder="John Doe" />
                        </div>
                        <div className="mb-4">
                            <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="MnnlrId">Mnnlr Id</label>
                            <input onChange={handleFormChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" type="text" id="MnnlrId" name="MnnlrId" placeholder="mern-dev-john@example.com" />
                        </div>
                        <div className="mb-4">
                            <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="email">Email</label>
                            <input onChange={handleFormChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" type="email" id="email" name="email" placeholder="john@example.com" />
                        </div>
                        <div className="mb-4">
                            <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="password">Password</label>
                            <input onChange={handleFormChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" type="password" id="password" name="password" placeholder="********" />
                        </div>
                        <div className="mb-4">
                            <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="confirm-password">Confirm Password</label>
                            <input onChange={handleFormChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" type="password" id="confirm-password" name="confirmPassword" placeholder="********" />
                        </div>
                        <button className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block" type="submit" onClick={handleSigninSubmitBtn}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}