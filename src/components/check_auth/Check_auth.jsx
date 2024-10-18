import React, { useEffect, useState } from "react";
import { setUser } from "../../redux/authentication/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Check_auth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  console.log("login", user);
  // console.log('access tokoen', user.accessToken)
  const navigate = useNavigate();
  const privateAxios = useAxiosPrivate();
  const location = useLocation();

  useEffect(() => {
  
    let isMounted = true;
    const response = async () => {
      try {
        // if (!user?.accessToken) {
        //   // If there is no token, navigate to signin
        //   console.log("No accessToken found, redirecting to /signin");
        //   navigate("/signin", { state: { from: location } });
        //   return;
        // }
        console.log("Sending authentication request with token:", user?.accessToken)
        const { data } = await privateAxios.get("/api/authenticate", {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        });

        console.log("the data from check_auth", data);
        if (isMounted) {
          dispatch(setUser(data.Data));
          console.log("Updated user after dispatch:", data.Data);
          setIsLoading(false);
        }
      } catch (err) {
        navigate("/signin", { state: { from: location } } );
      }
    };
    isMounted && response();
    return () => {
      isMounted = false;
    };
  }, [navigate, location]);

  if (isLoading) return <div>...loading</div>;

  return user?._id ? <Outlet /> : <Navigate to="/signin" replace state={{ from: location }}/>;
};

export default Check_auth;
