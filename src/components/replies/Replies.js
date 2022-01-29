import React from "react";
import "./Replies.css";

import {
  Max,
  Amy,
  Juli,
  Ramses,
  Plus,
  Minus,
  Reply,
  Delete,
  Edit,
} from "../imports";

const Replies = ({ replies, currentUser }) => {
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
    <>
      {replies.map((reply, index) => {
        return (
          <div key={reply.id} className="replies__comment-container">
            <div
              className={`replies__border 
            ${index !== replies.length - 1 && "not-last"}`}
            ></div>
            <div className="replies__comment-score">
              <div className="replies__comment-increment">
                <Plus />
              </div>
              <p>{reply.score}</p>
              <div className="replies__comment-decrement">
                <Minus />
              </div>
            </div>
            <div className="replies__comment-contents">
              <div className="replies__comment-userdetails-container">
                <img src={getImageURL(reply.user.username)}></img>
                <a>{reply.user.username}</a>
                {currentUser === reply.user.username ? (
                  <p className="replies__comment-current-user">you</p>
                ) : (
                  ""
                )}
                <p>{reply.createdAt}</p>
              </div>
              <div className="replies__comment-description">
                <p>
                  <a>@{reply.replyingTo} </a>
                  {reply.content}
                </p>
              </div>
            </div>
            {currentUser !== reply.user.username ? (
              <div className="replies__reply-icon">
                <Reply />
                <p>Reply</p>
              </div>
            ) : (
              <div className="replies__delete-edit_container">
                <div className="replies__delete">
                  <Delete />
                  <p>Delete</p>
                </div>
                <div className="replies__edit">
                  <Edit />
                  <p>Edit</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Replies;
