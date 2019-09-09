import React, { useState, useContext } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Backdrop from "../backdrop/backdrop";
import validator from "validator";
import { ErrorAlert, SuccessAlert } from "../alerts/alerts";
import { AuthContext } from "../../context/auth-context";
import { ModalContext } from "../../context/modal-context";
import { useInput } from "../../hooks/input-hook";
import { withRouter } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./modal.css";

const SignInModal = props => {
  const authContext = useContext(AuthContext);
  const modalContext = useContext(ModalContext);

  const [cookies, setCookie] = useCookies(["jwtCookie"]);

  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword
  } = useInput("");

  const [errors, setErrors] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const validateForm = () => {
    let errorsArray = [];
    setErrors([]);
    setLoggedIn(false);

    if (validator.isEmpty(email) || validator.isEmpty(password)) {
      errorsArray = [...errorsArray, "Please fill the empty fields."];
      setErrors(errorsArray);
      return 0;
    } else {
      if (!validator.isEmail(email)) {
        errorsArray = [...errorsArray, "Please enter a valid email."];
      }

      if (password.length < 6 || password.length > 20) {
        errorsArray = [
          ...errorsArray,
          "Password should be between 6 and 20 characters."
        ];
      }

      if (errorsArray.length) {
        setErrors(errorsArray);
        return 0;
      }
      return 1;
    }
  };

  const submitForm = e => {
    e.preventDefault();
    const valid = validateForm();
    if (valid) {
      axios
        .post("http://localhost:5000/graphql", {
          query: `mutation{
        login(email: "${email}", password: "${password}"){
          userID
          token
          tokenExpiration
          error
        }
      }`,
          withCredentials: true
        })
        .then(res => {
          const data = res.data.data;
          if (data.login.error) {
            setErrors([data.login.error]);
          } else {
            setLoggedIn(true);
            setCookie("jwtCookie", data.login.token, {
              path: "/",
              maxAge: 60 * 60 * 24 * 7 //7 days
            });
            authContext.setToken(cookies);
            resetEmail();
            resetPassword();
            setTimeout(() => {
              modalContext.setAuthClicked(false);
              modalContext.setSignUp(false);
            }, 1500);
            props.history.push("/");
          }
        });
    }
  };

  return (
    <React.Fragment>
      <div className="modal">
        {errors.length > 0 && <ErrorAlert errors={errors} />}
        {loggedIn && <SuccessAlert message={"Log in successful!"} />}
        <header className="modal__header">
          <h1>Sign In. Get Going.</h1>
          <small>
            Discover millions of live events, and login in order to book tickets
            for your favorite shows.
          </small>
          <span className="cancel__modal" onClick={props.modalClosed}>
            x
          </span>
        </header>

        <form className="modal__form" onSubmit={submitForm}>
          <section className="modal__content">
            <div className="modal__inputs">
              <label htmlFor="email">Email Address</label>
              <input type="text" id="email" {...bindEmail} />
            </div>
            <div className="modal__inputs">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" {...bindPassword} />
            </div>
          </section>
          <section className="modal__actions">
            <div className="auth__action">
              <input type="submit" value="Sign In" />
            </div>
            <div className="link__action">
              <p>
                New to BookIt?&nbsp;
                <NavLink to="#" onClick={props.show}>
                  Sign Up
                </NavLink>
              </p>
            </div>
          </section>
        </form>
      </div>
      <div>
        <Backdrop show={props.show} clicked={props.modalClosed} />
      </div>
    </React.Fragment>
  );
};

export default withRouter(SignInModal);
