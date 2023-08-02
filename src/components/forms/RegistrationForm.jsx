import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../../helpers/axios";

function RegistrationForm() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const registrationForm = event.currentTarget;
    if (registrationForm.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    const data = {
      username: form.username,
      password: form.password,
      email: form.email,
      first_name: form.first_name,
      last_name: form.last_name,
      bio: form.bio,
    };
    axios
      .post(`${BASE_API_URL}/api/auth/register/`, data)
      .then((res) => {
        //Register the account ant tokens in the store
        localStorage.setItem(
          "auth",
          JSON.stringify({
            access: res.data.access,
            refresh: res.data.refresh,
            user: res.data.user,
          })
        );
        navigate("/");
      })
      .catch((err) => {
        if (err.message) {
          setError(err.request.response);
        }
      });
  };
  return(
    <Form
    id="registration-form"
    className="border p-4 rounded"
    noValidate
    validated = {validated}
    onSubmit = {handleSubmit}
    >
    <Form.Group className="mb-3">
      <Form.Label>First Name</Form.Label>
      <Form.Control
      value = {form.first_name}
      onChange = {(e)=> setForm({...form, first_name:e.target.value})}
      required
      type="text"
      placeholder = "Enter first name"
      />
      <Form.Control.Feedback type="invalid">
        This field is required
      </Form.Control.Feedback>
    </Form.Group>
    </Form>
  )
}

export default RegistrationForm;