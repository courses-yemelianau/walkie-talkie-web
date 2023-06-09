import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SendMessageForm: React.FC = () => {
    const initialValues = {
        recipient: '',
        title: '',
        message: ''
    };

    const validationSchema = Yup.object({
        recipient: Yup.string().required('Recipient is required'),
        title: Yup.string().required('Title is required'),
        message: Yup.string().required('Message is required')
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, formikHelpers) => {
            // Handle message submission logic here
            console.log(values);
            setTimeout(() => {
                formikHelpers.setSubmitting(false);
            }, 1000);
        }
    });

    const recipients = ['John', 'Jane', 'Alice', 'Bob']; // Replace with your own recipient data

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="recipient">
                <Form.Label>Recipient:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter recipient"
                    {...formik.getFieldProps('recipient')}
                    list="recipients"
                />
                <datalist id="recipients">
                    {recipients.map((recipient, index) => (
                        <option key={index} value={recipient} />
                    ))}
                </datalist>
                {formik.touched.recipient && formik.errors.recipient && (
                    <Form.Text className="text-danger">{formik.errors.recipient}</Form.Text>
                )}
            </Form.Group>

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
