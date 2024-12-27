import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


const LogoutButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);

    const handleLogout = async () => {
        try {
            // Отправляем запрос на логаут
            const response = await axios.post(
                'http://localhost:8080/laba3-1.0-SNAPSHOT/rest-server/auth/logout',
                {},
                { withCredentials: true }
            );
            console.log('Ответ сервера:', response.data);
            dispatch({ type: 'LOGOUT' });
            // Очищаем localStorage
            localStorage.removeItem('user');
            console.log('Перенаправление...');

            // Перенаправляем на главную страницу
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Ошибка при выходе из системы:', error);
        }
    };
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/', { replace: true });
        }
    }, [authState.user, navigate]);
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
            <button
                className="logout-button"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default LogoutButton;
