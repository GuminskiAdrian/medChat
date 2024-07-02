// ChatList.tsx

import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import "../styles/ChatList.css";

const ChatList: React.FC = () => {
    const [chatRooms, setChatRooms] = useState<any[]>([]);
    const history = useHistory();

    useEffect(() => {
        const fetchChatRooms = async () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                try {
                    const q = query(
                        collection(db, "chatRooms"),
                        where("participants", "array-contains", currentUser.uid)
                    );
                    const querySnapshot = await getDocs(q);
                    const roomsData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setChatRooms(roomsData);
                } catch (error) {
                    console.error("Error fetching chat rooms:", error);
                }
            }
        };

        fetchChatRooms();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth); // Wywołanie metody signOut
            history.push("/"); // Przekierowanie do strony logowania po wylogowaniu
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="ChatListContainer">
            <div className="container">
                <button onClick={handleLogout} className="LogoutButton">
                    Wyloguj
                </button>
                <h1>Twoje czaty:</h1>
            </div>
            <ul className="ChatList">
                {chatRooms.map((chat) => (
                    <li key={chat.id}>
                        <Link to={`/ChatRoom/${chat.id}`}>{chat.id}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;