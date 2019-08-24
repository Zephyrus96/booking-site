import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Backdrop from "../backdrop/backdrop";
import axios from "axios";
import validator from "validator";
import { useInput } from "../../hooks/input-hook";
import "./modal.css";
import { ErrorAlert } from "../alerts/alerts";

const SignUpModal = props => {
  const {
    value: firstName,
    bind: bindFirstName,
    reset: resetFirstName
  } = useInput("");
  const {
    value: lastName,
    bind: bindLastName,
    reset: resetLastName
  } = useInput("");
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword
  } = useInput("");
  const {
    value: confirmPassword,
    bind: bindConfirmPassword,
    reset: resetConfirmPassword
  } = useInput("");

  const [errors, setErrors] = useState([]);
  const [userCreated, setUserCreated] = useState(false);

  const validateForm = () => {
    let errorArray = [];
    setErrors([]);
    setUserCreated(false);

    //Check if any field is empty and don't continue validation.
    if (
      validator.isEmpty(firstName) ||
      validator.isEmpty(lastName) ||
      validator.isEmpty(email) ||
      validator.isEmpty(password) ||
      validator.isEmpty(confirmPassword)
    ) {
      errorArray = [...errorArray, "Please fill the empty fields."];
      setErrors(errorArray);
      return 0;
    }

    //Fields aren't empty but might contain other errors.
    if (!validator.isAlpha(firstName) || !validator.isAlpha(lastName)) {
      errorArray = [
        ...errorArray,
        "Your name can't have numbers or special characters."
      ];
    }
    if (!validator.isEmail(email)) {
      errorArray = [...errorArray, "Please enter a valid email."];
    }
    if (password.length < 6 || password.length > 20) {
      errorArray = [
        ...errorArray,
        "Your password should be between 6 and 20 characters."
      ];
    }
    if (!validator.equals(password, confirmPassword)) {
      errorArray = [...errorArray, "Your passwords don't match."];
    }

    //populate the state with the error array
    setErrors(errorArray);

    if (!errorArray.length) {
      return 1;
    }
    return 0;
  };

  const submitForm = e => {
    e.preventDefault();
    const valid = validateForm();
    if (valid) {
      axios
        .post("http://localhost:5000/graphql", {
          query: `mutation{
          createUser(userInput: {firstName: "${firstName}", lastName: "${lastName}", email: "${email}", password: "${password}"}){
            _id
          }
        }`
        })
        .then(res => {
          console.log(res.data);
          let backendErrors = [];
          if (res.data.errors) {
            res.data.errors.map(
              err => (backendErrors = [...backendErrors, err.message])
            );
            setErrors(backendErrors);
          } else {
            setUserCreated(true);
            resetFirstName();
            resetLastName();
            resetEmail();
            resetPassword();
            resetConfirmPassword();
          }
        });
    }
  };

  return (
    <React.Fragment>
      <div className="modal">
        {errors.length > 0 && <ErrorAlert errors={errors} />}
        {userCreated && (
          <div className="modal__success">
            <h4>User created successfully!</h4>
          </div>
        )}
        <header className="modal__header">
          <h1>Sign Up. Get Access.</h1>
          <small>
            Discover millions of live events, and book events when you sign up
            to BookIt.
          </small>
          <span className="cancel__modal" onClick={props.modalClosed}>
            x
          </span>
        </header>
        <form className="modal__form" onSubmit={submitForm}>
          <section className="modal__content">
            <div className="modal__inputs">
              <label htmlFor="firstName">First Name </label>
              <input type="text" id="firstName" {...bindFirstName} />
            </div>
            <div className="modal__inputs">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" {...bindLastName} />
            </div>
            <div className="modal__inputs">
              <label htmlFor="email">Email Address</label>
              <input type="text" id="email" {...bindEmail} />
            </div>

            <div className="modal__inputs">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" {...bindPassword} />
            </div>
            <div className="modal__inputs">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                {...bindConfirmPassword}
              />
            </div>
          </section>
          <section className="modal__actions">
            <div className="auth__action">
              <input type="submit" value="Sign Up" />
            </div>
            <div className="link__action">
              <p>
                Already have an account?&nbsp;
                <NavLink to="#" onClick={props.show}>
                  Sign In
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

export default SignUpModal;
