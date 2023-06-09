import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Badge } from 'react-bootstrap';
import SendMessageForm from './components/SendMessageForm';
import ReceivedMessages from './components/ReceivedMessages';

const App: React.FC = () => {
    const [draft, setDraft] = useState('');
    const [username, setUsername] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleDraftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDraft(e.target.value);
    };

    const handleStartChat = () => {
        const name = draft.trim();
        if (!name) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } else {
            setUsername(name);
        }
    };

    return (
        <Container className="mt-4">
            <div>
                <h2>Enter your name: <Badge bg="primary">{username}</Badge></h2>
                <Row>
                    <Col xs={8}>
                        <Form.Control type="text" value={draft} onChange={handleDraftChange} />
                    </Col>
                    <Col xs={4}>
                        <Button onClick={handleStartChat}>Start Chat</Button>
                    </Col>
                </Row>
                {showAlert && (
                    <Alert variant="danger" className="mt-3" dismissible>
                        Please enter a valid username.
                    </Alert>
                )}
            </div>
            {username && (
                <div>
                    <SendMessageForm />
                    <hr />
                    <ReceivedMessages />
                </div>
            )}
        </Container>
    );
};

export default App;
