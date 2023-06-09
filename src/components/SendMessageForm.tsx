import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SendMessageForm: React.FC = () => {
    const [recipient, setRecipient] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecipient(e.target.value);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle message submission logic here
    };

    const recipients = ['John', 'Jane', 'Alice', 'Bob']; // Replace with your own recipient data

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="recipient">
                <br />
                <Form.Label>Recipient:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter recipient"
                    value={recipient}
                    onChange={handleRecipientChange}
                    list="recipients"
                />
                <datalist id="recipients">
                    {recipients.map((recipient, index) => (
                        <option key={index} value={recipient} />
                    ))}
                </datalist>
            </Form.Group>
            <br />
            <Form.Group controlId="title">
                <Form.Label>Title:</Form.Label>
                <Form.Control type="text" placeholder="Enter title" value={title} onChange={handleTitleChange} />
            </Form.Group>
            <br />
            <Form.Group controlId="message">
                <Form.Label>Message:</Form.Label>
                <Form.Control as="textarea" rows={3} value={message} onChange={handleMessageChange} />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
                Send Message
            </Button>
        </Form>
    );
};

export default SendMessageForm;
