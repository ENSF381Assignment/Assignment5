import React, { useState } from 'react';

const SignupForm = ({switchForm}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username !== '' && password !== '' && confirmPassword !== '' && email !== '') {
            if (password === confirmPassword) {
                setMessage('User signed up successfully!')
                const userData = {
                    Username: username,
                    Password: password,
                    Email: email
                };

                try {
                    const response = await fetch('http://127.0.0.1:5000/register_api', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    });
                    const responseData = await response.json();

                    if (responseData.error === 0) {
                        setMessage('User signed up successfully!');
                    } else if (responseData.error === 1) {
                        setMessage('Username is already taken.');
                    } else {
                        setMessage('An unknown error occurred.');
                    }
                } catch (error) {
                    console.error('Error during the fetch operation:', error);
                    setMessage('Failed to send data to the server.');
                }
            } else {
                setMessage('Passwords do not match!')
            }
        } else {
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