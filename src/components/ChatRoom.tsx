import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ChatRoom: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>(); // Zakładam, że parametr z URL nazywa się roomId
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const q = query(collection(db, `chatRooms/${roomId}`), orderBy('timestamp'));
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const messagesData = snapshot.docs.map(doc => doc.data());
                    setMessages(messagesData);
                });
                return unsubscribe;
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [roomId]); // Zależność useEffect zmieniona na roomId

    return (
        <div>
            <h1>Wiadomości z pokoju {roomId}</h1>
            <div>
                {messages.map((message: any, index: number) => (
                    <div key={index}>
                        <strong>{message.user}:</strong> {message.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatRoom;
