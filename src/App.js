import React, { useEffect, useState } from "react";
import data from "./data/data.json";

import { Comment, Post, Replies } from "./components";

import "./App.css";

const App = () => {
  const [storage, setStorage] = useState("");
  const [updateCommentStorage, setUpdateCommentStorage] = useState("");
  const [updateReplyStorage, setUpdateReplyStorage] = useState("");
  const [deleteCommentId, setDeleteCommentId] = useState("");
  const [deleteReplyId, setDeleteReplyId] = useState("");
  const [repliesReplyStorage, setRepliesReplyStorage] = useState("");
  const [repliesUpdateCommentStorage, setRepliesUpdateCommentStorage] =
    useState("");

  useEffect(() => {
    if (storage) {
      data.comments.push(storage);
    }
    setStorage("");
  }, [storage]);

  // Delete Comment
  useEffect(() => {
    if (deleteCommentId) {
      data.comments = data.comments.filter((item) => {
        return item.id !== deleteCommentId;
      });
    }
    setDeleteCommentId("");
  }, [deleteCommentId]);

  useEffect(() => {
    if (deleteReplyId) {
      for (let comment of data.comments) {
        comment.replies = comment.replies.filter((reply) => {
          return reply.id !== deleteReplyId;
        });
      }
    }
    setDeleteReplyId("");
  }, [deleteReplyId]);

  useEffect(() => {
    if (updateCommentStorage) {
      for (let comment of data.comments) {
        if (comment.id === updateCommentStorage.id) {
          comment.content = updateCommentStorage.content;
        }
      }
    }
    setUpdateCommentStorage("");
  }, [updateCommentStorage]);

  useEffect(() => {
    if (updateReplyStorage) {
      for (let comment of data.comments) {
        if (comment.id === updateReplyStorage.postId) {
          comment.replies.push(updateReplyStorage);
        }
      }
    }
    setUpdateReplyStorage("");
  }, [updateReplyStorage]);

  useEffect(() => {
    if (repliesReplyStorage) {
      for (let comment of data.comments) {
        comment.replies.forEach((reply) => {
          if (reply.id === repliesReplyStorage.postId) {
            comment.replies.push(repliesReplyStorage);
          }
        });
      }
    }
    setRepliesReplyStorage("");
  }, [repliesReplyStorage]);

  useEffect(() => {
    if (repliesUpdateCommentStorage) {
      for (let comment of data.comments) {
        comment.replies.forEach((reply) => {
          if (reply.id === repliesUpdateCommentStorage.id) {
            reply.content = repliesUpdateCommentStorage.content;
          }
        });
      }
    }
    setRepliesUpdateCommentStorage("");
  }, [repliesUpdateCommentStorage]);

  return (
    <>
      {data.comments.map((comment) => {
        return (
          <div key={comment.id}>
            <Comment
              comment={comment}
              currentUser={data.currentUser}
              setDeleteCommentId={setDeleteCommentId}
              setUpdateCommentStorage={setUpdateCommentStorage}
              setUpdateReplyStorage={setUpdateReplyStorage}
            />
            {comment.replies.map((reply, index) => {
              return (
                <Replies
                  key={reply.id}
                  reply={reply}
                  totalReplies={comment.replies.length}
                  index={index}
                  currentUser={data.currentUser}
                  setDeleteReplyId={setDeleteReplyId}
                  setRepliesReplyStorage={setRepliesReplyStorage}
                  setRepliesUpdateCommentStorage={
                    setRepliesUpdateCommentStorage
                  }
                />
              );
            })}
          </div>
        );
      })}
      <Post currentUser={data.currentUser} setStorage={setStorage} />
    </>
  );
};

export default App;
