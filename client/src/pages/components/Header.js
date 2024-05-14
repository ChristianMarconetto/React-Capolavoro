import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      maxWidth: "800px",
      padding: "20px",
      borderBottom: "1px solid #333",
      marginBottom: "40px",
    },
    navLink: {
      textDecoration: "none",
      color: "#fff",
      marginRight: "20px",
      fontSize: "1.2rem",
      transition: "color 0.3s ease",
    },
    activeLink: {
      color: "#ff7b00",
    },
  };

  return (
    <div style={styles.header}>
      <NavLink to="/sat" style={styles.navLink} activeStyle={styles.activeLink}>
        Satelliti
      </NavLink>
      <NavLink
        to="/blogs"
        style={styles.navLink}
        activeStyle={styles.activeLink}
      >
        Blogs
      </NavLink>
      <NavLink
        to="/register"
        style={styles.navLink}
        activeStyle={styles.activeLink}
      >
        Registrati
      </NavLink>
      <NavLink
        to="/login"
        style={styles.navLink}
        activeStyle={styles.activeLink}
      >
        Accedi
      </NavLink>
      <NavLink
        to="/contact"
        style={styles.navLink}
        activeStyle={styles.activeLink}
      >
        Contattaci
      </NavLink>
    </div>
  );
};

export default Header;
