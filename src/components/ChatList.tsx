// ChatList.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ChatList: React.FC = () => {
    const [chatRooms, setChatRooms] = useState<any[]>([]);

    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'chatRooms'));
                const roomsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name
                }));
                console.log('Rooms data:', roomsData); 
                setChatRooms(roomsData);
            } catch (error) {
                console.error('Error fetching chat rooms:', error);
            }
        };

        fetchChatRooms();
    }, []);

    return (
        <div>
            <h1>Wybierz czat:</h1>
            <ul>
                {chatRooms.map(chat => (
                    <li key={chat.id}>
                        <Link to={`/chat/${chat.id}`}>{chat.id}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;
