import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { IoKeyOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
                username,
                email,
                password,
            });

            // On successful signup
            if (response.status === 201) {
                setSuccess('Account created successfully! Please log in.');
                login(); // Optionally, automatically log in the user
                navigate('/'); // Redirect to login page or dashboard
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.detail || 'Signup failed. Please try again.');
            } else {
                setError('An error occurred. Please try again.');
            }
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
                    <h2>Sign Up <IoKeyOutline /></h2>
                    <p>Enter details to create your account</p>
                    <button className="google-button">
                        <FcGoogle /> Sign up with Google
                    </button>
                    <p className="divider">------ Or sign up with Email ------</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
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
                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <div className="password-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="confirm-password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <span onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                                </span>
                            </div>
                        </div>
                        {error && <p className="error">{error}</p>}
                        {success && <p className="success">{success}</p>}
                        <button type="submit" className="login-button">Sign Up</button>
                    </form>
                    <p className="register-link">
                        Already have an account? <a href="/login">Log in</a>
                    </p>
                </div>
                <div className="photo-column">
                    
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
