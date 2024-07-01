import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import "../styles/Login.css";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const [message, setMessage] = useState<string | null>(null); // Stan do przechowywania wiadomości

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            history.push("/ChatList");
        } catch (error) {
            console.error(error);
            setMessage("Błąd logowania. Sprawdź swoje dane."); // Ustawianie wiadomości błędu logowania
        }
    };

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setMessage("Rejestracja udana! Teraz możesz się zalogować."); // Ustawianie wiadomości sukcesu rejestracji
        } catch (error) {
            console.error(error);
            setMessage("Błąd rejestracji. Spróbuj ponownie."); // Ustawianie wiadomości błędu rejestracji
        }
    };

    return (
        <div className="LoginContainer">
            <div className="info">
                <h1>MedChat</h1>
                <p>konsultacja z lekarzem online</p>
            </div>
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
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={handleRegister}>Register</button>
                </div>
            </div>
            {message && <div className="message">{message}</div>} {/* Wyświetlanie wiadomości */}
        </div>
    );
};

export default Login;
