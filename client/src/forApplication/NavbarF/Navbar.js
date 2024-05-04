import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";

import LogoutModal from "../RegistrationAndLogin/LogoutModal";

import profilPhoto from "../images/profilPhoto.png";
import logo from "../images/logo.png";
import { FaUser } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { RiStarSFill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";

import { LoggedUserContext } from "../../Technician/Contexts/LoggedUserContext";
import { ColorPalletContext } from "../../Technician/Contexts/ColorPalletContext";

const Navbar = () => {
  const { colorPallet } = useContext(ColorPalletContext);

  const { loggedUser, handlerMapForLogin } = useContext(LoggedUserContext);
  const isUserLoggedIn = Object.keys(loggedUser).length > 0;
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  //console.log(loggedUser)
  //console.log(isUserLoggedIn)

  const navigate = useNavigate();

  const redirectToMain = () => {
    navigate("/");
  };

  const redirectToUserGroups = (userId) => {
    navigate(`/user-groups/${userId}`);
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  const redirectToRegistration = () => {
    navigate("/registration");
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    handlerMapForLogin.logout();
    redirectToMain();
  };

  const handleShowLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleClose = () => {
    setShowLogoutModal(false);
  };

  return (
    <div
      className="navbar"
      style={{
        borderBottom: `2px solid ${colorPallet.fourthcolor}`,
        backgroundColor: colorPallet.secondarycolor,
      }}
    >
      <img
        className="left-navbar logo"
        src={logo}
        alt="Logo"
        onClick={redirectToMain}
      />
      <div className="mid-navbar">
        {isUserLoggedIn ? (
          <img
            src={loggedUser.photo}
            alt=""
            className={isUserLoggedIn ? "user-profile-photo" : "profilPhoto"}
            style={{ border: `1px solid ${colorPallet.fourthcolor}` }}
          />
        ) : (
          <IoPersonSharp
            style={{ color: colorPallet.fourthcolor, fontSize: "7vh" }}
          />
        )}

        <div className="icon-and-text">
          <FaFire
            className="ohnik-icon"
            style={{ color: colorPallet.thirdcolor }}
          />
          <p className="ohnik-text" style={{ color: colorPallet.fourthcolor }}>
            {isUserLoggedIn ? loggedUser.streak : "x"}
          </p>
        </div>
        <div className="icon-and-text">
          <RiStarSFill
            className="top-icon"
            style={{ color: colorPallet.fifthcolor }}
          />
          <p className="top-text" style={{ color: colorPallet.fourthcolor }}>
            {isUserLoggedIn ? loggedUser.rating : "x"}
          </p>
        </div>
        <FaUserGroup
          className="group-icon"
          onClick={() =>
            isUserLoggedIn
              ? redirectToUserGroups(loggedUser.id)
              : redirectToLogin()
          }
          style={{ color: colorPallet.fourthcolor }}
        />
      </div>

      {isUserLoggedIn && (
        <h3
          className="right-navbar"
          onClick={handleShowLogoutModal}
          style={{ color: colorPallet.fourthcolor }}
        >
          Logout
        </h3>
      )}

      {!isUserLoggedIn && (
        <div className="login-or-registration">
          <h3
            className="right-navbar login-btn"
            onClick={redirectToLogin}
            style={{ color: colorPallet.fourthcolor }}
          >
            Login
          </h3>
          <h3 style={{ color: colorPallet.fourthcolor }}>/</h3>
          <h3
            className="right-navbar registration-btn"
            onClick={redirectToRegistration}
            style={{ color: colorPallet.fourthcolor }}
          >
            Registration
          </h3>
        </div>
      )}

      <LogoutModal
        show={showLogoutModal}
        handleClose={handleClose}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default Navbar;
