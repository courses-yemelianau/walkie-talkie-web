import React, { useEffect, useState } from 'react';

interface Message {
    recipient: string;
    title: string;
    body: string;
}

const ReceivedMessages: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        // Fetch messages from the server
        // You'll need to implement the server-side logic for retrieving messages

        // Example mock data
        const mockMessages: Message[] = [
            { recipient: 'John', title: 'Message 1', body: 'Hello, John!' },
            { recipient: 'John', title: 'Message 2', body: 'How are you?' },
        ];

        setMessages(mockMessages);
    }, []);

    return (
        <div>
            <h2>Received Messages:</h2>
            {messages.map((message, index) => (
                <div key={index}>
                    <h4>{message.title}</h4>
                    <p>{message.body}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default ReceivedMessages;
