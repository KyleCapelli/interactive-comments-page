import React, { useState } from "react";
import "./Post.css";

import { Max, Amy, Juli, Ramses } from "../imports";

const Post = ({ currentUser }) => {
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

  const onSendClick = () => {};

  return (
    <div className="post__content-container">
      <div className="post__avatar-image">
        <img src={getImageURL(currentUser.username)} />
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
        <button onclick={onSendClick}>SEND</button>
      </div>
    </div>
  );
};

export default Post;
