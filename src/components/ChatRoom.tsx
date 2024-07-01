// ChatRoom.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import '../styles/ChatRoom.css';

const ChatRoom: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isParticipant, setIsParticipant] = useState(false);

    useEffect(() => {
        const checkParticipation = async () => {
            const chatDoc = await getDoc(doc(db, 'chatRooms', roomId));
            const chatData = chatDoc.data();
            if (chatData && chatData.participants.includes(auth.currentUser?.uid)) {
                setIsParticipant(true);
            } else {
                setIsParticipant(false);
            }
        };

        checkParticipation();
    }, [roomId]);

    useEffect(() => {
        if (isParticipant) {
            const q = query(collection(db, `chatRooms/${roomId}/messages`), orderBy('timestamp'));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const messagesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMessages(messagesData);
            });

            return () => unsubscribe();
        }
    }, [roomId, isParticipant]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const user = auth.currentUser;
        if (!user) return;

        await addDoc(collection(db, `chatRooms/${roomId}/messages`), {
            text: newMessage,
            user: user.email,
            userId: user.uid,
            timestamp: serverTimestamp()
        });

        setNewMessage('');
    };

    if (!isParticipant) {
        return <div>Nie masz dostępu do tego czatu.</div>;
    }

    return (
        <div className='ChatRoomContainer'>
            <h1>Konwersacja z {roomId}</h1>
            <div className='messagesContainer'>
                {messages.map((message: any, index: number) => {
                    const isCurrentUser = message.userId === auth.currentUser?.uid;
                    return (
                        <div key={index} className={`message ${isCurrentUser ? 'currentUser' : 'otherUser'}`}>
                            <small>{message.timestamp?.toDate().toLocaleString()}</small> <br />
                            {message.text} <br />
                        </div>
                    );
                })}
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
