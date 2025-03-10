import { useSelector } from 'react-redux';
import useRefreshToken from './useRefreshToken';
import { axiosPrivate } from '../CustomAxios/customAxios';
import { useEffect } from 'react';

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();

    const { user } = useSelector((state)=>state.login);

    useEffect(()=>{
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${user?.accessToken}`;
                }
                return config;
            },(error)=>Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async(error)=>{
                const prevRequest = error?.config;
                if(error?.response?.status===403 && !prevRequest.sent){
                    prevRequest.send = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest);

                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept)
            axiosPrivate.interceptors.request.eject(responseIntercept)
        }
    },[user, refresh]);
    return axiosPrivate;
}

export default useAxiosPrivate;
