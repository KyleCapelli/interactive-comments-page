import React, { useState } from "react";
import "./Replies.css";
import { v4 as uuidv4 } from "uuid";
import ScoreButton from "../scoreButton/ScoreButton";

import { Max, Amy, Juli, Ramses, Reply, Delete, Edit } from "../imports";

const Replies = ({
  reply,
  currentUser,
  setDeleteReplyId,
  totalReplies,
  index,
  setRepliesReplyStorage,
  setRepliesUpdateCommentStorage,
}) => {
  const [replyClick, setReplyClick] = useState(false);
  const [replyTextAreaValue, setReplyTextAreaValue] = useState("");
  const [editClick, setEditClick] = useState(false);
  const [editTextAreaValue, setEditTextAreaValue] = useState(reply.content);
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

  const onRepliesUpdateClick = () => {
    localStorage.setItem(
      "updatedRepliesText",
      JSON.stringify({
        id: reply.id,
        content: editTextAreaValue,
      })
    );
    setRepliesUpdateCommentStorage(
      JSON.parse(localStorage.getItem("updatedRepliesText"))
    );
    setEditClick(false);
  };

  const onRepliesReplyClick = () => {
    localStorage.setItem(
      "newRepliesReply",
      JSON.stringify({
        id: uuidv4(),
        content: replyTextAreaValue.replace(`@${reply.user.username}`, ""),
        replyingTo: reply.user.username,
        user: {
          image: {
            webp: currentUser.image.webp,
          },
          username: currentUser.username,
        },
        createdAt: new Date(Date.now()).toLocaleDateString(),
        score: 0,
        newScore: 0,
        postId: reply.id,
      })
    );
    setRepliesReplyStorage(JSON.parse(localStorage.getItem("newRepliesReply")));
    setReplyTextAreaValue(`@${reply.user.username} `);
    setReplyClick(false);
  };

  const onDeleteClick = () => {
    setDeleteClick(true);
    setEditClick(false);
  };

  const onReplyClick = () => {
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
    setDeleteReplyId(reply.id);
    setDeleteClick(false);
  };

  return (
    <>
      <div key={reply.id} className="replies__comment-container">
        <div
          className={`replies__border 
            ${index !== totalReplies - 1 && "not-last"}`}
        ></div>
        <ScoreButton
          currentUser={currentUser.username}
          postUser={reply.user.username}
          value={reply.score}
          newScore={reply.newScore}
          data={reply}
        />
        <div className="replies__comment-contents">
          <div className="replies__comment-userdetails-container">
            <img
              src={getImageURL(reply.user.username)}
              alt={reply.user.username}
            />
            <a>{reply.user.username}</a>
            {currentUser.username === reply.user.username ? (
              <p className="replies__comment-current-user">you</p>
            ) : (
              ""
            )}
            <p>{reply.createdAt}</p>
          </div>
          <div className="replies__comment-description">
            {editClick ? (
              <>
                <textarea
                  value={editTextAreaValue}
                  onChange={onEditTextAreaChange}
                  required
                />
                <div className="replies__edit-submit-button-container">
                  <button
                    className="replies__edit-submit-button"
                    onClick={onRepliesUpdateClick}
                  >
                    UPDATE
                  </button>
                </div>
              </>
            ) : (
              <p>
                <a>@{reply.replyingTo} </a>
                {reply.content}
              </p>
            )}
          </div>
        </div>
        {currentUser.username !== reply.user.username ? (
          <div className="replies__reply-icon" onClick={onReplyClick}>
            <Reply />
            <p>Reply</p>
          </div>
        ) : (
          <div className="replies__delete-edit_container">
            <div className="replies__delete" onClick={onDeleteClick}>
              <Delete />
              <p>Delete</p>
            </div>
            <div className="replies__edit" onClick={onEditClick}>
              <Edit />
              <p>Edit</p>
            </div>
          </div>
        )}
      </div>

      {replyClick ? (
        <div className="replies__comment-container reply">
          <div
            className={`replies__border 
            ${index !== totalReplies - 1 && "not-last"}`}
          ></div>
          <div className="post__avatar-image">
            <img
              src={getImageURL(currentUser.username)}
              alt={currentUser.username}
            />
          </div>
          <div className="post__text-area-form">
            <textarea
              value={replyTextAreaValue}
              onChange={onReplyTextAreaChange}
              required
            />
          </div>
          <div className="reply__button">
            <button onClick={onRepliesReplyClick}>REPLY</button>
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

export default Replies;
