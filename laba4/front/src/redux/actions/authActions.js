import axios from 'axios';


export const login = (username, password) => async (dispatch) => {
    try {
        const response = await axios.post(
            'http://localhost:8080/laba3-1.0-SNAPSHOT/rest-server/auth/login',
            { username, password },
            {
                withCredentials: true, // Включаем отправку куки
            }
        );

        const user = response.data; // Получаем данные пользователя из ответа

        // Сохраняем данные в localStorage
        localStorage.setItem('user', JSON.stringify(user));

        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
                user: response.data.user,
                token: response.data.token,
            },
        });
    } catch (error) {
        dispatch({
            type: 'LOGIN_FAILURE',
            payload: error.response?.data?.message || 'Login failed',
        });
    }
};

export const register = (username, password) => async (dispatch) => {
    try {
        const response = await axios.post(
            'http://localhost:8080/laba3-1.0-SNAPSHOT/rest-server/auth/register',
            { username, password },
            {
                withCredentials: true,
            }
        );

        const user = response.data;
        localStorage.setItem('user', JSON.stringify(user));

        dispatch({
            type: 'REGISTER_SUCCESS',
            payload: {
                user: response.data.user,
                token: response.data.token,
            },
        });
    } catch (error) {
        dispatch({
            type: 'REGISTER_FAILURE',
            payload: error.response?.data?.message || 'Register failed',
        });
    }
};



export const logout = () => {
    return { type: 'LOGOUT' };
};
