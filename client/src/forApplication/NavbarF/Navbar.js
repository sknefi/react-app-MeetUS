import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";

import LogoutModal from "../RegistrationAndLogin/LogoutModal";
import DarkModeButton from "../DarkModeButtonF/DarkModeButton";

import profilPhoto from "../images/profilPhoto.png";
import logo from "../images/logo.png";
import { FaUser } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { RiStarSFill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { RxTextAlignJustify } from "react-icons/rx";

import { LoggedUserContext } from "../../Technician/Contexts/LoggedUserContext";
import { ColorPalletContext } from "../../Technician/Contexts/ColorPalletContext";

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const { colorPallet } = useContext(ColorPalletContext);
  const { loggedUser, handlerMapForLogin } = useContext(LoggedUserContext);
  const isUserLoggedIn = Object.keys(loggedUser).length > 0;
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

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
    hideNavbar();
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

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const hideNavbar = () => {
    setIsNavbarOpen(false);
  };

  console.log(loggedUser);
  return (
    <>
      <div className="low-resolution-div">
        <RxTextAlignJustify
          className="navbar-toggle"
          onClick={toggleNavbar}
          style={{
            color: colorPallet.fourthcolor,
            height: "64px",
            cursor: "pointer",
          }}
        />

        {windowWidth <= 1000 && (
          <img
            className="low-resolution-log"
            src={logo}
            alt="Logo"
            onClick={() => {
              redirectToMain();
              hideNavbar();
            }}
          />
        )}
      </div>

      <div
        className={`navbar ${isNavbarOpen ? "open" : ""}`}
        style={{
          borderBottom: `2px solid ${colorPallet.fourthcolor}`,
          backgroundColor: colorPallet.secondarycolor,
        }}
      >
        {windowWidth > 1000 && (
          <img
            className="left-navbar logo"
            src={logo}
            alt="Logo"
            onClick={() => {
              redirectToMain();
              hideNavbar();
            }}
          />
        )}
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
            <p
              className="ohnik-text"
              style={{ color: colorPallet.fourthcolor }}
            >
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
            onClick={() => {
              if (isUserLoggedIn) {
                hideNavbar();
                redirectToUserGroups(loggedUser.id);
              } else {
                hideNavbar();
                redirectToLogin();
              }
            }}
            style={{ color: colorPallet.fourthcolor }}
          />
        </div>

        <DarkModeButton />
        {isUserLoggedIn && (
          <h3
            className="right-navbar logout-text"
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
              onClick={() => {
                hideNavbar();
                redirectToLogin();
              }}
              style={{ color: colorPallet.fourthcolor }}
            >
              Login
            </h3>
            <h3 style={{ color: colorPallet.fourthcolor }}>/</h3>
            <h3
              className="right-navbar registration-btn"
              onClick={() => {
                hideNavbar();
                redirectToRegistration();
              }}
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
    </>
  );
};

export default Navbar;
