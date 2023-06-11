import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Message, User } from '../interfaces';
import { getUsers } from '../services/users.service';
import { createMessage } from '../services/messages.service';
import { useAppSelector } from '../hooks';

const SendMessageForm: React.FC = () => {
    const initialValues = {
        recipient: '',
        title: '',
        message: ''
    };

    const validationSchema = Yup.object<Message>({
        recipient: Yup.string().required('Recipient is required'),
        title: Yup.string().required('Title is required'),
        message: Yup.string().required('Message is required')
    });

    const { user } = useAppSelector(state => state.app);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, formikHelpers) => {
            createMessage({ ...values, username: user.name })
                .then(() => {
                    formikHelpers.resetForm();
                })
                .catch(reason => console.log(reason));
        }
    });

    const [recipients, setRecipients] = useState<User[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            getUsers()
                .then(({ data: { data } }) => setRecipients(data))
                .catch((error) => console.log(error));
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Form onSubmit={formik.handleSubmit}>
            <br />
            <Form.Group controlId="recipient">
                <Form.Label>Recipient:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter recipient"
                    {...formik.getFieldProps('recipient')}
                    list="recipients"
                />
                <datalist id="recipients">
                    {recipients.map((recipient) => (
                        <option key={recipient.id} value={recipient.name} />
                    ))}
                </datalist>
                {formik.touched.recipient && formik.errors.recipient && (
                    <Form.Text className="text-danger">{formik.errors.recipient}</Form.Text>
                )}
            </Form.Group>
            <br />
            <Form.Group controlId="title">
                <Form.Label>Title:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter title"
                    {...formik.getFieldProps('title')}
                />
                {formik.touched.title && formik.errors.title && (
                    <Form.Text className="text-danger">{formik.errors.title}</Form.Text>
                )}
            </Form.Group>
            <br />
            <Form.Group controlId="message">
                <Form.Label>Message:</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    {...formik.getFieldProps('message')}
                />
                {formik.touched.message && formik.errors.message && (
                    <Form.Text className="text-danger">{formik.errors.message}</Form.Text>
                )}
            </Form.Group>
            <br />
            <Button variant="primary" type="submit" disabled={!formik.isValid || formik.isSubmitting}>
                {formik.isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
        </Form>
    );
};

export default SendMessageForm;
