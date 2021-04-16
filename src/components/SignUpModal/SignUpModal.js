import React, { useEffect, useState } from "react";
import "./SignUpModal.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import { auth } from "../../Firebase/firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const SignUpModal = ({ setOpen, open, setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Material UI Modal
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  // HandleSignup
  const handleSignup = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user
          .updateProfile({
            displayName: username,
          })
          .then(() => {
            setUsername("");
            setEmail("");
            setPassword("");
            setOpen(false);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // UseEffect
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // If there is a user then set the user
        setUser(authUser);
      } else {
        // If there is no user then set the user as null
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="modal">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="modal__signup" autoComplete="off">
            <center>
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
                className="app__headerImage"
              />
            </center>

            <Input
              className="modal__input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              className="modal__input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className="modal__input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={(e) => handleSignup(e)}
            >
              SignUp
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SignUpModal;
