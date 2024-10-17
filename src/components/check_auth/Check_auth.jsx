import React, { useEffect, useState } from "react";
import { setUser } from "../../redux/authentication/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Check_auth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useSelector((state) => state.login);
  const dispatch = useDispatch();
  console.log("login", user);
  const navigate = useNavigate();
  const privateAxios = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const response = async () => {
      try {
        const { data } = await privateAxios.get("/api/authenticate", {
          headers: {
            "Content-Type": "Application/json",
            authorization: `Bearer ${user?.Data?.accessToken}`,
          },
          withCredentials: true,
        });

        console.log('the data from check_auth', data)
        if (isMounted) {
          setIsLoading(false);
          dispatch(setUser(data.Data));
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
  }, [navigate]);

  if (isLoading) return null;

  return user?._id ? <Outlet /> : <Navigate to='/signin' />;

};

export default Check_auth;
