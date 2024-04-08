import React, { useState } from 'react';

const SignupForm = ({switchForm}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username !== '' && password !== '' && confirmPassword !== '' && email !== '') {
            if (password === confirmPassword) {
                setMessage('User signed up successfully!')
                //send to back end
            }
            else {
                setMessage('Passwords do not match!')
            }
        }
        else {
            setMessage('All fields are required!')
        }
    };

    return (
        <form onSubmit={handleSubmit} >
            <h2>Signup</h2>
            {message && <p style={{color:'red'}}>{message}</p>}
            Username: <input type='text' placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} /><br></br>
            Password: <input type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} /><br></br>
            Confirm Password: <input type='password' placeholder='Confirm your password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><br></br>
            Email: <input type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} /><br></br>
            <button type='submit'>Signup</button><br></br>
            <button type='button' onClick={switchForm}>Switch to Login</button>
        </form>
    );
};


export default SignupForm;