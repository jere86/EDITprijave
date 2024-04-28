import React, { useRef, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaBars, FaTimes } from "react-icons/fa";
import { Switch } from "@mui/material";
import { useAppContext } from "../../context/appContext";
import styles from "./Navbar.module.scss";

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const { showAdmin, toggleAdmin } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const showNavbar = () => {
    if (window.innerWidth <= 768) {
      navRef.current?.classList.toggle(`${styles.responsive}`);
    }
  };

  useEffect(() => {
    if (!showAdmin && location.pathname === "/administracija") {
      navigate("/");
    }
  }, [showAdmin, location.pathname, navigate]);

  return (
    <div className={styles.navbar}>
      <button onClick={showNavbar} className={styles.nav_btn}>
        <IconContext.Provider value={{ className: `${styles.bars}` }}>
          <FaBars />
        </IconContext.Provider>
      </button>
      <NavLink to="/" className={styles.logo}>
        <img src="/favicon.ico" alt="Digitalna Dalmacija" />
      </NavLink>
      <div ref={navRef} className={styles.links}>
        <NavLink
          onClick={showNavbar}
          to="/radionice"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          RADIONICE
        </NavLink>
        <NavLink
          onClick={showNavbar}
          to="/predavaci"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          PREDAVAČI
        </NavLink>
        <NavLink
          to="/administracija"
          onClick={showNavbar}
          className={({ isActive }) =>
            isActive ? `${styles.adminOn}` : `${styles.admin}`
          }
          style={{
            pointerEvents: showAdmin ? "auto" : "none",
            opacity: showAdmin ? 1 : 0,
          }}
        >
          ADMINISTRACIJA
        </NavLink>
        <button
          onClick={showNavbar}
          className={`${styles.nav_btn} ${styles.nav_close_btn}`}
        >
          <IconContext.Provider value={{ className: `${styles.times}` }}>
            <FaTimes />
          </IconContext.Provider>
        </button>
      </div>
      <div
        className={
          showAdmin ? `${styles.switch} ${styles.orange}` : styles.switch
        }
      >
        <span>ADMIN</span>
        <Switch
          checked={showAdmin}
          onChange={toggleAdmin}
          inputProps={{ "aria-label": "controlled" }}
          color="warning"
        />
      </div>
    </div>
  );
};

export default Navbar;
