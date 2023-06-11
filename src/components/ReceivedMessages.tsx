import React, { useEffect } from 'react';
import { Alert, Accordion, Row, Col } from 'react-bootstrap';
import { Status } from '../constants';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchMessagesFulfilled, fetchMessagesPending, fetchMessagesRejected } from '../redux/messageSlice';
import { getMessages } from '../services/messages.service';

const ReceivedMessages: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.app);
    const { messages, message, status } = useAppSelector((state) => state.message);

    useEffect(() => {
        dispatch(fetchMessagesPending());
        const interval = setInterval(() => {
            getMessages(user.id!)
                .then(({ data: { data } }) => dispatch(fetchMessagesFulfilled(data)))
                .catch((error) => dispatch(fetchMessagesRejected(error.message)));
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [dispatch, user]);

    if (status === Status.Idle) {
        return null;
    }

    if (status === Status.Loading) {
        return <Alert variant="info">Loading...</Alert>;
    }

    if (status === Status.Failed) {
        return <Alert variant="danger">{message}</Alert>;
    }

    return (
        <>
            <h2>Received Messages:</h2>
            <Accordion>
                {messages.map((message) => (
                    <Accordion.Item key={message.id} eventKey={message.id.toString()}>
                        <Accordion.Header>
                            <Row>
                                <Col xs={8}>
                                    <h6>{message.username}</h6>
                                </Col>
                                <Col xs={8}>
                                    <span>{'timestamp'}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={8}>
                                    <h4>{message.title}</h4>
                                </Col>
                            </Row>
                        </Accordion.Header>
                        <Accordion.Body>
                            <p>{message.message}</p>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </>
    );
};

export default ReceivedMessages;
