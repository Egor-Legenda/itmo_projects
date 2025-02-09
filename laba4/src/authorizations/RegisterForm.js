import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(register(username, password));
    };
    if (authState.user) {
        navigate('../index.html');  // Переход на главную страницу, можно изменить на путь '/index.html', если нужно
    }
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>

            {authState.error && <p>{authState.error}</p>}
        </div>
    );
};

export default RegisterForm;
