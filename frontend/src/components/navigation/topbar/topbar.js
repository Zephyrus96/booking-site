import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/auth-context";
import { ModalContext } from "../../../context/modal-context";
import SearchBox from "../../searchbox/searchbox";
import LoadingIcon from "../../resources/loading";
import Backdrop from "../../backdrop/backdrop";
import SignUpModal from "../../../components/modal/signup-modal";
import SignInModal from "../../../components/modal/signin-modal";
import { withRouter } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./topbar.css";

const Topbar = props => {
  const authContext = useContext(AuthContext);
  const modalContext = useContext(ModalContext);

  const [cookies, setCookie, removeCookie] = useCookies(["jwtCookie"]);

  const [loading, setLoading] = useState(false);

  const menuClicked = () => {
    modalContext.setMenuOpened(true);
  };

  const signInClicked = () => {
    modalContext.setAuthClicked(true);
    modalContext.setSignUp(false);
  };

  const signUpClicked = () => {
    modalContext.setAuthClicked(true);
    modalContext.setSignUp(true);
  };

  const removeModel = () => {
    modalContext.setAuthClicked(false);
    modalContext.setSignUp(false);
  };

  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      removeCookie("jwtCookie", { path: "/" });
      authContext.setToken(null);
      setLoading(false);
      props.history.push("/");
    }, 1000);
  };

  const modal = modalContext.signUp ? (
    <SignUpModal show={signInClicked} modalClosed={removeModel} />
  ) : (
    <SignInModal show={signUpClicked} modalClosed={removeModel} />
  );

  return (
    <div className="landing__topbar">
      {loading && <LoadingIcon />}
      {loading && <Backdrop show={true} />}
      <div className="site__logo">
        <img
          className="site__image"
          src={require("../../../images/3a882bd9-f5f4-4761-a100-5c873608216b_200x200.png")}
          alt="logo"
        />
        <div className="menu-button" onClick={menuClicked}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <SearchBox />
      {!authContext.token && (
        <div className="landing__auth">
          <button onClick={signInClicked}>
            <h3>Sign In</h3>
          </button>
          &nbsp;|&nbsp;
          <button onClick={signUpClicked}>
            <h3>Sign Up</h3>
          </button>
        </div>
      )}
      {authContext.token && (
        <div className="landing__auth">
          <button onClick={logout}>
            <h3>Log out</h3>
          </button>
        </div>
      )}
      {modalContext.authClicked && modal}
    </div>
  );
};

export default withRouter(Topbar);
