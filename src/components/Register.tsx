import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword} from 'firebase/auth';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('New user registered:', userCredential.user);
            history.push('/'); // Przekierowanie do strony logowania po rejestracji
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div>
            <h1 style={{ color: 'white' }}>Rejestracja</h1>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleRegister}>Zarejestruj się</button>
            <Link to="/">Wróć do logowania</Link>
        </div>
    );
};

export default Register;
