import React from 'react';
import { Container } from 'react-bootstrap';
import SendMessageForm from './components/SendMessageForm';
import ReceivedMessages from './components/ReceivedMessages';
import UserForm from './components/UserForm';
import { setUsername } from './redux/appSlice';
import { useAppDispatch, useAppSelector } from './hooks';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { username } = useAppSelector(state => state.app);

    const handleStartChat = (newUserName: string) => {
        dispatch(setUsername(newUserName));
    };

    return (
        <Container className="mt-4">
            <UserForm name={username} onSubmit={handleStartChat} />
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
