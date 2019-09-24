import React, { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import axios from "axios";
import AuthContext from "../../context/auth-context";
import "./auth.css";

const AuthPage = () => {
  const emailEl = useRef(null);
  const passwordEl = useRef(null);

  const [isLogin, setLogin] = useState(true);

  const authContext = useContext(AuthContext);

  const submitForm = e => {
    e.preventDefault();
    const email = emailEl.current.value;
    const password = passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const loginQuery = gql`query{
      login(email: "${email}", password: "${password}"){
        userID,
        token,
        tokenExpiration
      }
    }`;

    axios
      .post("https://book-it-react-node.herokuapp.com/graphql", loginQuery)
      .then(result => console.log(result));
  };

  const changeState = e => {
    setLogin(!isLogin);
  };

  return (
    <form className="signInForm" onSubmit={submitForm}>
      <div className="form-control">
        <h1>{isLogin ? "Login" : "Register"}</h1>
        <input ref={emailEl} type="email" id="email" placeholder="Email" />
        <input
          ref={passwordEl}
          type="password"
          id="password"
          placeholder="Password"
        />
        <button className="submit-btn" id="signIn">
          {isLogin ? "Sign In" : "Sign Up"}
        </button>
        <small>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <Link className="register-link" onClick={changeState} to="#">
            {isLogin ? "Register" : "Login"}
          </Link>
        </small>
      </div>
    </form>
  );
};

export default AuthPage;
