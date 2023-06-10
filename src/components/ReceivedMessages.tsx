import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { io } from 'socket.io-client';
import { ReceivedMessage } from '../interfaces';
import { REACT_APP_API_URI, Status } from '../constants';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchMessagesFulfilled, fetchMessagesPending, fetchMessagesRejected } from '../redux/messageSlice';

const socket = io(REACT_APP_API_URI);

const ReceivedMessages: React.FC = () => {
    const dispatch = useAppDispatch();
    const { username } = useAppSelector((state) => state.app);
    const { messages, message, status } = useAppSelector((state) => state.message);

    useEffect(() => {
        dispatch(fetchMessagesPending());
        fetch(`/messages/${username}`)
            .then((response) => response.json())
            .then((data) => dispatch(fetchMessagesFulfilled(data)))
            .catch((error) => dispatch(fetchMessagesRejected(error.message)));
    }, [dispatch, username]);

    useEffect(() => {
        socket.on('messageReceived', (message: ReceivedMessage) => {
            fetchMessagesFulfilled([...messages, message]);
        });

        return () => {
            socket.off('messageReceived');
        };
    }, [messages]);

    if (status === Status.Idle) {
        return null;
    }

    if (status === Status.Loading) {
        return <h2>Loading...</h2>;
    }

    if (status === Status.Failed) {
        return <h2>{message}</h2>;
    }

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
