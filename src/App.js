import React from "react";
import data from "./data/data.json";

import { Comment, Post, Replies } from "./components";

import "./App.css";

const App = () => {
  console.log(data);
  return (
    <>
      {data.comments.map((comment) => {
        return (
          <div>
            <Comment
              comment={comment}
              currentUser={data.currentUser.username}
            />
            {comment.replies.length > 0 && (
              <Replies
                replies={comment.replies}
                currentUser={data.currentUser.username}
              />
            )}
          </div>
        );
      })}
      <Post currentUser={data.currentUser} />
    </>
  );
};

export default App;
