import React from "react";
import styles from "./Header.less";
import Burger from "../Burger/Burger";
import { Link } from "react-router-dom";


const Header = ({navOpen, toggleSideNav})=>{
  return (
    <header className={styles.header}>
      <Burger
        navOpen={navOpen}
        className={styles.burger}
        toggle={toggleSideNav}
      />
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <img src="/images/logo.svg" />
        </Link>
        <h1>Norðurálsmót 2022</h1>
      </div>
    </header>
  );
}

export default Header;