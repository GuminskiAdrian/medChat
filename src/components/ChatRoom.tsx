import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import '../styles/ChatRoom.css';

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

        const user = auth.currentUser;
        if (!user) return;

        await addDoc(collection(db, `chatRooms/${roomId}/messages`), {
            text: newMessage,
            user: user.email, // Używamy e-maila użytkownika
            timestamp: serverTimestamp()
        });

        setNewMessage('');
    };

    return (
        <div className='ChatRoomContainer'>
            <h1>Konwersacja z {roomId}</h1>
            <div>
                {messages.map((message: any, index: number) => (
                    <div key={index}>
                        <small>{message.timestamp?.toDate().toLocaleString()}</small> <br />
                        <strong>{message.user}:</strong> {message.text} <br />
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
                <button type="submit">Wyślij</button>
            </form>
        </div>
    );
};

export default ChatRoom;
