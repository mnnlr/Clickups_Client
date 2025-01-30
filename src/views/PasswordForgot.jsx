import React from 'react'
import { useState, useEffect } from 'react';
import customAxios from '../CustomAxios/customAxios';
import { showToast } from '../components/Toastconfig';
const PasswordForgot = () => {
  const [email, setEmail] = useState(null);
  const [btnDisable, setbtnDisable] = useState(false)
  const [timer, settimer] = useState(0);
  const handleSubmitbtn = async (e) => {
    try {
      e.preventDefault();
      const responce = await customAxios.post('/api/users/Forgot-Password',
        { email: email }
      )
      if (responce.status === 200) {
        showToast("A password registration link has been sent to your email.", "success");
        setbtnDisable(true);
        settimer(60);
      }
      console.log(responce)
    } catch (error) {
      console.log(error)
      showToast("Someting went wrong please try later")
    }
  }

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval=setInterval(() => {
        settimer((prevtime) =>
          prevtime - 1
        )
      }, 1000);
    }


    // Re-enable the button when the timer reaches 0
    if (timer === 0 && btnDisable) {
      setbtnDisable(false);
    }

    // Cleanup interval on component unmount or when timer changes
    return () => clearInterval(interval);

  }, [timer, btnDisable]);
  return (
    <div className='h-[89vh] flex flex-col gap-2 items-center justify-center'>
      <h1 className='text-xl'>Forgot Password</h1>
      <div className=' bg-white shadow w-1/4 h-1/4 rounded-lg divide-y divide-gray-200 px-3 pt-5'>
        <form onSubmit={handleSubmitbtn} className='h-full w-full flex flex-col justify-around'>
          <label htmlFor="email">Email</label>
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            type="email" id='email'
            placeholder='Confirm Your Email'
            className='border rounded-lg text-sm w-full p-2 '
          />
          <button type="submit" disabled={btnDisable} className={`max-w-full ${btnDisable?"bg-blue-400":"bg-blue-600"} rounded-lg p-2 text-white`}>{btnDisable ? (<p>Resend Link In {timer}</p>) : "Send Reset Link"}</button>
        </form>
      </div>
    </div>

  )
}

export default PasswordForgot