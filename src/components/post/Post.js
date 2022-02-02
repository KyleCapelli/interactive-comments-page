import React, { useState, useEffect } from "react";
import "./Post.css";
import { v4 as uuidv4 } from "uuid";

import { Max, Amy, Juli, Ramses } from "../imports";

const Post = ({ currentUser, setStorage }) => {
  const [textAreaValue, setTextAreaValue] = useState("");

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

  const onTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const onSendComment = () => {
    localStorage.setItem(
      "newComment",
      JSON.stringify({
        id: uuidv4(),
        content: textAreaValue,
        user: {
          image: {
            webp: currentUser.image.webp,
          },
          username: currentUser.username,
        },
        createdAt: new Date(Date.now()).toLocaleDateString(),
        score: 0,
        newScore: 0,
        replies: [],
      })
    );
    setStorage(JSON.parse(localStorage.getItem("newComment")));
    setTextAreaValue("");
  };

  return (
    <div className="post__content-container">
      <div className="post__avatar-image">
        <img
          src={getImageURL(currentUser.username)}
          alt={currentUser.username}
        />
      </div>
      <div className="post__text-area-form">
        <textarea
          value={textAreaValue}
          onChange={onTextAreaChange}
          placeholder="Add a comment..."
          required
        />
      </div>
      <div className="post__button">
        <button onClick={onSendComment}>SEND</button>
      </div>
    </div>
  );
};

export default Post;
