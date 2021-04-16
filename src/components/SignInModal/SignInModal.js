import React, { useState } from "react";
import "./SignInModal.css";
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

const SignInModal = ({ setOpenSignIn, open, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Material UI Modal
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const handleSignIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        setUser(authUser);
        setEmail("");
        setPassword("");
        setOpenSignIn(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="modal">
      <Modal open={open} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="modal__signin" autoComplete="off">
            <center>
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
                className="app__headerImage"
              />
            </center>
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
              type="submit"
              variant="contained"
              color="primary"
              onClick={(e) => handleSignIn(e)}
            >
              SignIn
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SignInModal;
