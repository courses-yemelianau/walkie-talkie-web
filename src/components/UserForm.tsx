import React, { useState } from 'react';
import { Form, Button, Badge, Row, Col } from 'react-bootstrap';
import { createUser } from '../services/users.service';
import { User } from '../interfaces';

interface Props {
    name: string;
    onSubmit: (user: User) => void;
}

const UserFrom: React.FC<Props> = (props: Props) => {
    const { name, onSubmit } = props;
    const [draft, setDraft] = useState('');
    const trimmedDraft = draft.trim();

    const handleDraftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDraft(e.target.value);
    };

    const handleSubmit = () => {
        createUser({ name: trimmedDraft })
            .then(({ data: { data } }) => {
                onSubmit(data);
                setDraft('');
            })
            .catch(reason => console.log(reason));
    };

    return (
        <>
            <h2>Enter your name: <Badge bg="primary">{name}</Badge></h2>
            <Row>
                <Col xs={8}>
                    <Form.Control type="text" value={draft} onChange={handleDraftChange} />
                </Col>
                <Col xs={4}>
                    <Button onClick={handleSubmit} disabled={!trimmedDraft}>Start Chat</Button>
                </Col>
            </Row>
        </>
    );
};

export default UserFrom;
