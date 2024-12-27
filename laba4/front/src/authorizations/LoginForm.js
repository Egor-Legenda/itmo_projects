import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(username, password));
    };

    useEffect(() => {
        if (authState.user) {
            navigate('/home');
        }
    }, [authState.user, navigate]);

    useEffect(() => {
        if (authState.error) {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [authState.error]);
    return (
        <div>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>

            {showError && <p className="error-popup">{authState.error}</p>}
        </div>
    );
};

export default LoginForm;
