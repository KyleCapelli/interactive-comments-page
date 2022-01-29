import React from "react";
import "./Comment.css";

//Import Images
import {
  Max,
  Amy,
  Juli,
  Ramses,
  Minus,
  Plus,
  Reply,
  Delete,
  Edit,
} from "../imports";

const Comment = ({ comment, currentUser }) => {
  function getImageURL(username) {
    switch (username) {
      case "amyrobson":
        return Amy;
      case "juliusomo":
        return Juli;
      case "maxblagun":
        return Max;
      case "ramsesmiron":
        return Ramses;
      default:
        return;
    }
  }

  return (
    <div key={comment.id} className="comments__comment-container">
      <div className="comments__comment-score">
        <div className="comments__comment-increment">
          <Plus />
        </div>
        <p>{comment.score}</p>
        <div className="comments__comment-decrement">
          <Minus />
        </div>
      </div>
      <div className="comments__comment-contents">
        <div className="comments__comment-userdetails-container">
          <img src={getImageURL(comment.user.username)}></img>
          <a>{comment.user.username}</a>
          {currentUser === comment.user.username ? (
            <p className="comments__comment-current-user">you</p>
          ) : (
            ""
          )}
          <p>{comment.createdAt}</p>
        </div>
        <div className="comments__comment-description">
          <p>{comment.content}</p>
        </div>
      </div>
      {currentUser !== comment.user.username ? (
        <div className="comments__reply-icon">
          <Reply />
          <p>Reply</p>
        </div>
      ) : (
        <div className="comments__delete-edit_container">
          <div className="comments__delete">
            <Delete />
            <p>Delete</p>
          </div>
          <div className="comments__edit">
            <Edit />
            <p>Edit</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
