import React, { useState, useContext} from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import { BASE_API_URL } from "../../hooks/user.actions";
import { Context } from "../Layout";

function CreatePost(props) {
    const { refresh } = props;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({})
    const {setToaster} = useContext(Context)
    const user = getUser()

    const handleSubmit = (event) => {
        event.preventDefault();
        const createPostForm = event.currentTarget;
        if (createPostForm.checkValidity() === false){
            event.stopPropagation()
        }
        setValidated(true)
        const data = {
            author: user.id,
            body: form.body
        }
        axiosService.post(`${BASE_API_URL}/post/`, data).then(
            ()=>{
                handleClose()
                setToaster({
                    type: "success",
                    message: "Post created 🚀",
                    show: true,
                    title: "Post Success"
                })
                setForm({})
                refresh();
            }).catch((error)=>{
                setToaster({
                    type: "danger",
                    message: "An error occured",
                    show: true,
                    title: "Post Error"
                })
                console.error(error)
            })
    }

    return (
        <>
        <Form.Group className="my-3 w-75">
            <Form.Control 
            className="py-2 rounded-pill border-primary text-primary"
            type="text"
            placeholder="Write a post"
            onClick={handleShow}
            />
        </Form.Group>
        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Create Post</Modal.Title>
            </Modal.Header>
            <Modal.Body className="border-0">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control
                        name="body"
                        value={form.body}
                        onChange = { (e)=> setForm({...form, body: e.target.value})}
                        as="textarea"
                        rows={3}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit} disabled={form.body === undefined}>
                Post
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}
export default CreatePost;
