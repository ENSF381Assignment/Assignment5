import React, {useState} from 'react';
import Productpage from './Productpage';

const LoginForm = ({switchForm}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username !== '' && password !== '') {
            try {
                const userData = {
                    Username: username,
                    Password: password
                };
                const response = await fetch('http://127.0.0.1:5000/login_api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });
                const responseData = await response.json();
                if (responseData.error === 0) {
                    setMessage('Logged in!');
                    return <Productpage />;
                } else if (responseData.error !== 1) {
                    setMessage('Username or password incorrect.');
                } else {
                    setMessage('An unknown error occurred.');
                }
            } catch (error) {
                console.error('Error during the fetch operation:', error);
                setMessage('Failed to send data to the server.');
            }
        } else {
            setMessage('All fields are required!')
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {message && <p style={{color:'red'}}>{message}</p>}
            Username: <input type='text' placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)}/><br></br>
            Password: <input type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}/><br></br>
            <button type="submit">Login</button><br></br>
            <button type="button" onClick={switchForm}>Switch to Signup</button>
        </form>
    );
};

export default LoginForm;