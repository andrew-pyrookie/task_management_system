import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                email,
                password,
            });
            login();
        } catch (error) {
            setError('Invalid email or password');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="container">
            <div className="login-container">
                <div className="form-column">

                        
                        <h2 className="app-name">
                        <img src="../assets/logo.png" alt="App Icon" className="app-icon" />
                            Taskly
                        </h2>
               
                    <h1>Login</h1>
                    <p>Hi, welcome back <span role="img" aria-label="wave">👋</span></p>
                    <button className="google-button">
                        <FcGoogle /> Log in with Google
                    </button>
                    <p className="divider">------ or with Email ------</p>
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="email-container" style={{ position: 'relative' }}>
                            <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                            <MdOutlineMail style={{ position: 'absolute', right: 15, top: '50%', transform: 'translateY(-50%)' }} />
                        </div>
                        </div>

                        <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-container">
                            <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                            <span onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                            </span>
                        </div>
                    </div>

                        {error && <p className="error">{error}</p>}
                        <button type="submit" className="login-button">Login</button>
                    </form>
                    <p className="register-link">
                        Not yet registered? <a href="#">Create an account</a>
                    </p>
                </div>
                <div className="photo-column">
                    
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
