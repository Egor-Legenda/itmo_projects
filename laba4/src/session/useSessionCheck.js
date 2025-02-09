import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useSessionCheck = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);

            axios.get('http://localhost:8080/laba3-1.0-SNAPSHOT/rest-server/auth/check-session', {
                withCredentials: true,
            })
                .then((response) => {
                    if (response.status === 200) {
                        dispatch({
                            type: 'LOGIN_SUCCESS',
                            payload: user,
                        });
                        navigate('/home');
                    } else {
                        localStorage.removeItem('user');
                        dispatch({ type: 'LOGOUT' });
                    }
                })
                .catch(() => {
                    localStorage.removeItem('user');
                    dispatch({ type: 'LOGOUT' });
                });
        }
    }, [dispatch]);
};
