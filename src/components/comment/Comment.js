import React, { useState, useEffect } from "react";
import "./Comment.css";
import { v4 as uuidv4 } from "uuid";
import ScoreButton from "../scoreButton/ScoreButton";

//Import Images
import { Max, Amy, Juli, Ramses, Reply, Delete, Edit } from "../imports";

const Comment = ({
  comment,
  currentUser,
  setDeleteCommentId,
  setUpdateCommentStorage,
  setUpdateReplyStorage,
}) => {
  const [replyClick, setReplyClick] = useState(false);
  const [replyTextAreaValue, setReplyTextAreaValue] = useState("");
  const [editTextAreaValue, setEditTextAreaValue] = useState(comment.content);
  const [editClick, setEditClick] = useState(false);
  const [deleteClick, setDeleteClick] = useState(false);

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

  const onSendReplyComment = () => {
    localStorage.setItem(
      "newReply",
      JSON.stringify({
        id: uuidv4(),
        content: replyTextAreaValue.replace(`@${comment.user.username}`, ""),
        replyingTo: comment.user.username,
        user: {
          image: {
            webp: currentUser.image.webp,
          },
          username: currentUser.username,
        },
        createdAt: new Date(Date.now()).toLocaleDateString(),
        score: 0,
        newScore: 0,
        postId: comment.id,
      })
    );
    setUpdateReplyStorage(JSON.parse(localStorage.getItem("newReply")));
    setReplyTextAreaValue(`@${comment.user.username} `);
    setReplyClick(false);
  };

  const onUpdateCommentClick = () => {
    localStorage.setItem(
      "updatedText",
      JSON.stringify({
        id: comment.id,
        content: editTextAreaValue,
      })
    );
    setUpdateCommentStorage(JSON.parse(localStorage.getItem("updatedText")));
    setEditClick(false);
  };

  const onDeleteClick = () => {
    setDeleteClick(true);
    setEditClick(false);
  };

  const onReplyClick = () => {
    console.log("clicked");
    setReplyClick(!replyClick);
  };

  const onReplyTextAreaChange = (event) => {
    setReplyTextAreaValue(event.target.value);
  };

  const onEditClick = () => {
    setEditClick(!editClick);
  };

  const onEditTextAreaChange = (event) => {
    setEditTextAreaValue(event.target.value);
  };

  const onConfirmDelete = () => {
    setDeleteCommentId(comment.id);
    setDeleteClick(false);
  };

  return (
    <>
      <div key={comment.id} className="comments__comment-container">
        <ScoreButton
          currentUser={currentUser.username}
          postUser={comment.user.username}
          value={comment.score}
          newScore={comment.newScore}
          data={comment}
        />
        <div className="comments__comment-contents">
          <div className="comments__comment-userdetails-container">
            <img src={getImageURL(comment.user.username)}></img>
            <a>{comment.user.username}</a>
            {currentUser.username === comment.user.username ? (
              <p className="comments__comment-current-user">you</p>
            ) : (
              ""
            )}
            <p>{comment.createdAt}</p>
          </div>
          <div className="comments__comment-description">
            {editClick ? (
              <>
                <textarea
                  value={editTextAreaValue}
                  onChange={onEditTextAreaChange}
                  required
                />
                <div className="comments__edit-submit-button-container">
                  <button
                    className="comments__edit-submit-button"
                    onClick={onUpdateCommentClick}
                  >
                    UPDATE
                  </button>
                </div>
              </>
            ) : (
              <p>{comment.content}</p>
            )}
          </div>
        </div>
        {currentUser.username !== comment.user.username ? (
          <div className="comments__reply-icon" onClick={onReplyClick}>
            <Reply />
            <p>Reply</p>
          </div>
        ) : (
          <div className="comments__delete-edit_container">
            <div className="comments__delete" onClick={onDeleteClick}>
              <Delete />
              <p>Delete</p>
            </div>
            <div className="comments__edit" onClick={onEditClick}>
              <Edit />
              <p>Edit</p>
            </div>
          </div>
        )}
      </div>

      {replyClick ? (
        <div className="post__content-container">
          <div className="post__avatar-image">
            <img src={getImageURL(currentUser.username)} />
          </div>
          <div className="post__text-area-form">
            <textarea
              value={replyTextAreaValue}
              onChange={onReplyTextAreaChange}
              required
            />
          </div>
          <div className="post__button">
            <button onClick={onSendReplyComment}>REPLY</button>
          </div>
        </div>
      ) : (
        ""
      )}

      {deleteClick && (
        <div className="modal">
          <div className="modal__content">
            <h2>Delete Comment</h2>
            <p>
              Are you sure you want to delete this comment? This will remove the
              comment and can't be undone.
            </p>
            <div className="modal__button-container">
              <button
                className="modal__cancel"
                onClick={() => setDeleteClick(false)}
              >
                NO, CANCEL
              </button>
              <button className="modal__delete" onClick={onConfirmDelete}>
                YES, DELETE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
