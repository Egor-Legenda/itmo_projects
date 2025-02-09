import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import TimeDisplay from '../components/TimeDisplay';


import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Header from "../cap/Header";

const Authorization = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Provider store={store}>
            <div id = "style">
            <Header />
            </div>
            <div id="time-container">
                <TimeDisplay/>
            </div>
            <div className="authorization-container">
                <div className="form-wrapper">
                    <div className="form-header">
                        <h2>{isLogin ? 'Login' : 'Register'}</h2>
                        <button
                            className="toggle-button"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Перейти к регистрации' : 'Перейти ко входу'}
                        </button>
                    </div>
                    {isLogin ? <LoginForm/> : <RegisterForm/>}
                </div>
            </div>
        </Provider>
    );
};

export default Authorization;