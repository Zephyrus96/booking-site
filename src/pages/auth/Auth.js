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

    //Send request to the backend api.

    // fetch("http://localhost:5000/graphql", {
    //   method: "POST",
    //   body: JSON.stringify(requestBody),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(res => {
    //     if (res.status !== 200 && res.status !== 201) {
    //       throw new Error("Failed!");
    //     }
    //     return res.json();
    //   })
    //   .then(resData => {
    //     if (resData.data.login.token) {
    //       authContext.login(
    //         resData.data.login.token,
    //         resData.data.login.userID,
    //         resData.data.login.tokenExpiration
    //       );
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    axios
      .post("http://localhost:5000/graphql", loginQuery)
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
