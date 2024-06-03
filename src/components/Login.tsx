// Login.tsx

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory(); // Inicjalizacja hooka useHistory

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Po udanym zalogowaniu przekieruj do strony czatu
            history.push('/ChatList');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
