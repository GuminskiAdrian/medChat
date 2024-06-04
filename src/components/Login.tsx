// Login.tsx

import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import '../styles/Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory(); // Inicjalizacja hooka useHistory

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Po udanym zalogowaniu przekieruj do strony czatu
            history.push("/ChatList");
        } catch (error) {
            console.error(error);
        }
    };

    const handleRegister = async () => {
        console.log("to bedzie dopiero");
    };

    return (
        <div className="LoginContainer">
            <h1>MedChat</h1>
            <p>konsultacja z lekarzem online</p>
            <div className="inputContainer">
                <div className="inputs">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <div className="buttons">
                    <button onClick={handleRegister}>Register</button>
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
