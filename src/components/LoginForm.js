import React, {useState} from 'react';

const LoginForm = ({switchForm}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username !== '' && password !== '' ){
            //send to back end
        }
        else {
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