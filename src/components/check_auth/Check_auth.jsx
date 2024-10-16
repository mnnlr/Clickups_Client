import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../../CustomAxios/customAxios";
import { updateUser } from "../../redux/authentication/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const Check_auth = () => {
  const [authData, setAuthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.login);
  const dispatch = useDispatch();
  console.log("login", userData);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const response = async () => {
      try {
        const { data } = await axiosPrivate("/api/authenticate", {
          headers: {
            "Content-Type": "Application/json",
            // authorization: `Bearer ${userData?.user?.token}`,
          },
          withCredentials: true,
        });

        console.log('the data from check_auth', data)
        if (isMounted) {
          setIsLoading(false);
          dispatch(updateUser(data.Data));
        }
      } catch (err) {
        navigate("/signin");
        return console.log("error on authentication", err);
      }
    };
    isMounted && response();
    return () => {
      isMounted = false;
    };
  }, [navigate, userData?.user?.token]);

  if (isLoading) return null;

  return userData?.user?._id ? <Outlet /> : <Navigate to='/signin' />;

};

export default Check_auth;
