import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);


    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(register(username, password));

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

            {showError && <div className="error-popup">{authState.error}</div>}
        </div>
    );
};

export default RegisterForm;
