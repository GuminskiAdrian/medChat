import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ChatRoom: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>(); 
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const q = query(collection(db, `chatRooms/${roomId}/messages`), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messagesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(messagesData);
        });

        return () => unsubscribe();
    }, [roomId]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        await addDoc(collection(db, `chatRooms/${roomId}/messages`), {
            text: newMessage,
            user: "anonymous", // Replace with actual user information
            timestamp: serverTimestamp()
        });

        setNewMessage('');
    };

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
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatRoom;
