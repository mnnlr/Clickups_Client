import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import customAxios from '../CustomAxios/customAxios';
import { showToast } from '../components/Toastconfig';

const ResetPassword = () => {

    const [Password, setPassword] = useState(null);
    const [ConfirmPassword, setConfirmPassword] = useState(null);
      const navigate=useNavigate();
    const {token}=useParams();
        console.log(token)
    const handleUpdatePassword=async(e)=>{
        try{
        e.preventDefault();
        if(Password===ConfirmPassword){
            const responce=await customAxios.post(`/api/users/reset-password/${token}`,{
                Password:Password,
                ConfirmPassword:ConfirmPassword
        })
              if(responce.status===200){
                showToast("Password Update Successfully","success");
                setTimeout(() => navigate("/signin"), 2000);
              }
            }else{
              showToast("Password Does Not Match","warning")
            }  
          }catch(error){
      showToast("Something went wrong try later","error")
        console.log(error)
    }
    }

  return (
    <div className='h-[89vh] flex flex-col gap-2 items-center justify-center'>
      <h1 className='text-xl'>Update Password</h1>
      <div className=' bg-white shadow w-1/4 h-2/5 rounded-lg divide-y divide-gray-200 px-3 pt-5'>
      <form onSubmit={handleUpdatePassword} className='h-full w-full flex flex-col justify-around'>
        <div>
        <label htmlFor="Password">Password</label>
          <input 
          required
          onChange={(e)=>setPassword(e.target.value)}
          type="password" id='Password'
           placeholder='Enter New Password'
            className='border rounded-lg text-sm w-full p-2 mt-2 '
            />
            </div>
             <input 
          required
          onChange={(e)=>setConfirmPassword(e.target.value)}
          type="password" id='passwordc'
           placeholder='Confirm Your Password'
            className='border rounded-lg text-sm w-full p-2 '
            />
          <button type="submit" className='max-w-full bg-blue-600 rounded-lg p-2 text-white'>Update Password</button>
        </form>
        </div>
      </div>

)
}

export default ResetPassword