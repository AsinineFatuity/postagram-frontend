import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useUserActions } from "../../hooks/user.actions";

function LoginForm() {
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({});
    const [error, setError] = useState(null);
    const userActions = useUserActions();

    const handleSubmit = (event) => {
        event.preventDefault();
        const loginForm = event.currentTarget;

        if (loginForm.checkValidity() === false) {
        event.stopPropagation();
        }
        setValidated(true);
        
        const data = {
            email: form.email,
            password: form.password
        };

        userActions.login(data).catch((err) => {
            if(err.message){
                setError(err.request.response);
            }
        })
    };

    return (
        <Form
        id="registration-form"
        className = "border p-4 rounded"
        noValidate
        validated = {validated}
        onSubmit = {handleSubmit}
        >
            <Form.Group className="mb-3">
                <Form.Label>Username/Email</Form.Label>
                <Form.Control
                value = {form.username}
                onChange = { (e) => setForm({...form, email:e.target.value})}
                required
                type="text"
                placeholder="Enter your username/email"
                />
                <Form.Control.Feedback type="invalid">
                    This field is required
                </Form.Control.Feedback>

            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                value = {form.password}
                onChange = { (e) => setForm({...form, password:e.target.value})}
                required
                type="password"
                placeholder="Enter your password"
                />
                <Form.Control.Feedback type="invalid">
                    This field is required
                </Form.Control.Feedback>
            </Form.Group>

            <div className="text-content text-danger">
                {error && <p>{error}</p>}
            </div>

            <Button variant="primary" type="submit">
                Login
            </Button>

        </Form>
    )
}
export default LoginForm;
