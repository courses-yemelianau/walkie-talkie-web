import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { ReceivedMessage } from '../interfaces';

const ReceivedMessages: React.FC = () => {
    const [messages, setMessages] = useState<ReceivedMessage[]>([]);

    useEffect(() => {
        // Fetch messages from the server
        // You'll need to implement the server-side logic for retrieving messages

        // Example mock data
        const mockMessages: ReceivedMessage[] = [
            { username: 'John', title: 'Message 1', message: 'Hello, John!' },
            { username: 'John', title: 'Message 2', message: 'How are you?' },
        ];

        setMessages(mockMessages);
    }, []);

    return (
        <>
            <h2>Received Messages:</h2>
            <ListGroup>
                {messages.map((message, index) => (
                    <ListGroup.Item key={index}>
                        <h4>{message.title}</h4>
                        <p>{message.message}</p>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
};

export default ReceivedMessages;
