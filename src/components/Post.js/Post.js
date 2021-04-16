import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

const Post = ({ imageUrl, caption, username }) => {
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
    </div>
  );
};

export default Post;
