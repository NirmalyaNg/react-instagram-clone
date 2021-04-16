import { useEffect, useState } from "react";
import "./App.css";
import Post from "./components/Post.js/Post";
import { auth, db } from "./Firebase/firebase";
import React from "react";
import { Button } from "@material-ui/core";
import SignUpModal from "./components/SignUpModal/SignUpModal";
import SignInModal from "./components/SignInModal/SignInModal";
import ImageUpload from "./components/ImageUpload/ImageUpload";

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignin, setOpenSignin] = useState(false);
  const [user, setUser] = useState(null);

  // fetch the posts from the firebase firestore
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="app">
      {/* Header  */}
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
          className="app__headerImage"
        />
        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignin(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>

      {/* Image Upload */}
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <center>
          <h3>Sorry you need to login to upload !!</h3>
        </center>
      )}

      {/* Sign Up Modal Component */}
      <SignUpModal open={open} setOpen={setOpen} setUser={setUser} />

      {/* Sign In Modal Component */}
      <SignInModal
        open={openSignin}
        setOpenSignIn={setOpenSignin}
        setUser={setUser}
      />

      {/* Display Posts */}
      <div className="app__posts">
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
