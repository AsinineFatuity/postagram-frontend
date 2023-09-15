import React, {useState, useContext} from "react";
import { format } from "timeago.js";
import { Image, Card, Dropdown } from "react-bootstrap";
import { randomAvatar } from "../../utils";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import { Context } from "../Layout";

function Comment(props){
    const {postId, comment, refresh} = props;
    const {toaster, setToaster} = useContext(Context)
    const user = getUser()

    const handleDelete = () => {

    }
    return (
        <Card className="rounded-3 my-2">
            <Card.Body>
                <Card.Title className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row">
                        <Image
                        src={randomAvatar()}
                        roundedCircle
                        width={48}
                        height={48}
                        className="me-2 border border-primary border-2"
                        />

                        <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                            <p className="fs-6 m-0">{comment.author.username}</p>
                            <p className="fs-6 fw-lighter">
                                <small>{format(comment.created)}</small>
                            </p>
                        </div>
                    </div>
                    {user.id === comment.author.id && (
                        <div>
                            <Dropdown>
                                <Dropdown.Toggle></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        Modify
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={handleDelete} className="text-danger">
                                        Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    )}
                </Card.Title>
                <Card.Text>{comment.body}</Card.Text>
            </Card.Body>

        </Card>
    )
}
export default Comment;