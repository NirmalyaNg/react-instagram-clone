import React, { useEffect, useState } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../../Firebase/firebase";
import firebase from "firebase";

const Post = ({ imageUrl, caption, username, postId, user }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  // Comments
  useEffect(() => {
    let unsubscribe;
    unsubscribe = db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });

    return () => {
      unsubscribe();
    };
  }, [postId]);

  // Post Comment
  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          alt={username.toUpperCase()}
          src="/static/images/avatar/1.jpg"
          className="post__avatar"
        />
        <h3>{username}</h3>
      </div>

      <img src={imageUrl} alt="" className="post__image" />

      <h4 className="post__text">
        <strong>{username} : </strong>
        {caption}
      </h4>

      <div className="post__comments">
        <h4 className="post__commentsTitle">
          {comments.length ? <span>Comments</span> : <span>No Comments</span>}
        </h4>
        {comments.map((comment, index) => (
          <p key={index} className="post__comment">
            <strong>{comment.username} : </strong>
            <span>{comment.text}</span>
          </p>
        ))}
      </div>
      {user ? (
        <form className="post__commentBox">
          <input
            className="post__commentInput"
            type="text"
            placeholder="Enter Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__commentButton"
            type="submit"
            disabled={!comment}
            onClick={(e) => postComment(e)}
          >
            Post
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default Post;
