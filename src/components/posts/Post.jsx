import React, { useState } from "react";
import { format } from "timeago.js";
import { LikeFilled, CommentOutlined, LikeOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Image, Card, Dropdown, Button, Modal, Form } from "react-bootstrap";
import { randomAvatar } from "../../utils";
import Toaster from "../Toaster"
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";


const MoreToggleIcon = React.forwardRef(({onClick}, ref) => (
  <Link 
  to="#"
  ref = {ref}
  onClick={ (e) =>{
    e.preventDefault();
    onClick(e)
  }}
  >
    <MoreOutlined/>
  </Link>
))
function Post(props) {
  const { post, refresh } = props;
  const [showToast, setShowToast] = useState(false)
  const user = getUser()

  const handleDelete = () =>{
    axiosService.delete(`/post/${post.id}/`)
    .then(() => {
      setShowToast(true)
      refresh()
    })
    .catch( (error) => console.error(error))
  }

  const handleLikeClick = (action) => {
    axiosService
      .post(`/post/${post.id}/${action}/`)
      .then(() => {
        refresh();
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Card className="rounded-3 my-4">
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
              <p className="fs-6 m-0">{post.author.username}</p>
              <p className="fs-6 fw-lighter">
                <small>{format(post.created)}</small>
              </p>
            </div>
            </div>

            {user.id === post.author.id && (
              <div>
                <Dropdown>
                  <Dropdown.Toggle as={MoreToggleIcon}></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Update</Dropdown.Item>
                    <Dropdown.Item onClick={handleDelete}
                    className="text-danger"
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}

          </Card.Title>
          <Card.Text>{post.body}</Card.Text>
          <div className="d-flex flex-row">
            <LikeFilled
              style={{
                color: "#fff",
                backgroundColor: "#0D6EFD",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                fontSize: "75%",
                padding: "2px",
                margin: "3px",
              }}
            />
            <p className="ms-1 fs-6">
              <small>{post.likes_count}</small>
            </p>
          </div>
        </Card.Body>
        <Card.Footer className="d-flex bg-white w-50 justify-content-between border-0">
          <div className="d-flex flex-row">
            <LikeOutlined
              style={{
                width: "24px",
                height: "24px",
                padding: "2px",
                fontSize: "20px",
                color: post.liked ? "#0D6EFD" : "#C4C4C4",
              }}
              onClick={() => {
                post.liked
                  ? handleLikeClick("remove_like")
                  : handleLikeClick("like");
              }}
            />
            <p className="ms-1">
              <small>Like</small>
            </p>
          </div>
          <div className="d-flex flex-row">
            <CommentOutlined
              style={{
                width: "24px",
                height: "24px",
                padding: "2px",
                fontSize: "20px",
                color: "#C4C4C4",
              }}
            />
            <p className="ms-1 mb-0">
              <small>Comment</small>
            </p>
          </div>
        </Card.Footer>
      </Card>
      <Toaster
      title="Post!"
      message = "Post deleted"
      type="danger"
      showToast = {showToast}
      onClose = { () => setShowToast(false)}
      />
    </>
  );
}

export default Post;
