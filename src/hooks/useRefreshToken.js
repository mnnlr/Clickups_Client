import {useDispatch} from 'react-redux';
import customAxios from '../CustomAxios/customAxios';
import { logoutSuccess, setUser } from '../redux/authentication/loginSlice';
import { useNavigate } from 'react-router-dom';

const useRefreshToken = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const refresh = async () => {
        try{
            const response = await customAxios.get("/api/v1/refresh-token", {
                withCredentials: true,
            });
            console.log('this is refresh Token', response);
            dispatch(setUser(response.data));
            return response.data.accessToken;

        }catch(error){
            console.log('this is error from refreshing Page', error);
            if(error.response.status === 401){
                navigate('/signin');
            }
        }
    };
    return refresh;
}

export default useRefreshToken;