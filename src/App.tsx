import React from 'react';
import { Container } from 'react-bootstrap';
import SendMessageForm from './components/SendMessageForm';
import ReceivedMessages from './components/ReceivedMessages';
import UserForm from './components/UserForm';
import { setUser } from './redux/appSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { User } from './interfaces';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.app);

    const handleStartChat = (newUser: User) => {
        dispatch(setUser(newUser));
    };

    return (
        <Container className="mt-4">
            <UserForm name={user.name} onSubmit={handleStartChat} />
            {user.id && (
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
