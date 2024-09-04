import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [userName, setUsername] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        await AsyncStorage.setItem('username', userName);
        router.push('/');
    }; 

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );

}

export default Login;