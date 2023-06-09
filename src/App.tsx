import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Badge } from 'react-bootstrap';
import SendMessageForm from './components/SendMessageForm';
import ReceivedMessages from './components/ReceivedMessages';

const App: React.FC = () => {
    const [draft, setDraft] = useState('');
    const [username, setUsername] = useState('');

    const handleDraftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDraft(e.target.value);
    };

    const handleStartChat = () => {
        setUsername(draft.trim());
    };

    return (
        <Container className="mt-4">
            <h2>Enter your name: <Badge bg="primary">{username}</Badge></h2>
            <Row>
                <Col xs={8}>
                    <Form.Control type="text" value={draft} onChange={handleDraftChange} />
                </Col>
                <Col xs={4}>
                    <Button onClick={handleStartChat} disabled={!draft.trim()}>Start Chat</Button>
                </Col>
            </Row>
            {username && (
                <>
                    <SendMessageForm />
                    <hr />
                    <ReceivedMessages />
                </>
            )}
        </Container>
    );
};

export default App;
