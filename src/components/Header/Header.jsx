import React, { useRef, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import { Container, Row } from "reactstrap";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import useGetData from "../../custom-hooks/useGetData";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [t, i18n] = useTranslation("global");
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const profileActionRef = useRef(null);

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [favs, setFavs] = useState([]);
  const { data: users } = useGetData("users");

  const handleLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    if (currentUser) {
      for (let index = 0; index < users.length; index++) {
        if (users[index].uid === currentUser.uid) {
          setFavs(users[index].favorites);
        }
      }
    }
  }, [users]);

  const stickyHeaderFunction = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success(t("header.loggedout"));
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    stickyHeaderFunction();
    return () => window.removeEventListener("scroll", stickyHeaderFunction);
  });

  const menuToggle = () => {
    menuRef.current.classList.toggle("active__menu");
  };

  const navigateToCart = () => {
    navigate("/cart");
  };

  const navigateToFavs = () => {
    navigate("/favorites");
  };

  const toggleProfileActions = () => {
    profileActionRef.current.classList.toggle("show__profileActions");
  };
  const totalFavs = currentUser ? favs.length : 0;

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img
                onClick={() => {
                  window.scroll(0, 0);
                  navigate("/home");
                }}
                src={logo}
                alt="logo"
              />
              <div>
                <h1
                  onClick={() => {
                    window.scroll(0, 0);
                    navigate("/home");
                  }}
                >
                  DerenMarkt
                </h1>
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                <li className="nav__item">
                  <NavLink
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                    to="/home"
                    className="nav__active"
                  >
                    {t("header.home")}
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                    to="/shop"
                    className="nav__active"
                  >
                    {t("header.shop")}
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                    to="/cart"
                    className="nav__active"
                  >
                    {t("header.cart")}
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="nav__icons">
              <div className="profile">
                <button className="lang" onClick={() => handleLanguage("tr")}>
                  TR
                </button>
                <button className="lang" onClick={() => handleLanguage("en")}>
                  EN
                </button>
              </div>
              <span className="fav__icon" onClick={navigateToFavs}>
                <i className="ri-heart-line"></i>
                <span className="badge">{totalFavs}</span>
              </span>
              <span className="cart__icon" onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt="profile"
                  onClick={toggleProfileActions}
                />
                <div
                  className="profile__actions"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <span onClick={logout}>{t("header.logout")}</span>
                      <Link to="/myorders">{t("header.myorders")}</Link>
                      <Link to="/dashboard">{t("header.dashboard")}</Link>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to="/signup">{t("header.signup")}</Link>
                      <Link to="/login">{t("header.login")}</Link>
                      <Link to="/dashboard">{t("header.dashboard")}</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
