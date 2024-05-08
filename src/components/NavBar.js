//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Imports from React
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Imports from React bootstrap
import { Navbar, Container, Nav ,Form,} from "react-bootstrap";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Internal imports
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  const handleSignOut= async()=>{
    try{
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    }catch(err){
      console.log(err)
    }
  };

  const loggedInIcons = <>
   {/*Start here link*/}
    <NavLink
    exact
    className={`${styles.NavLink} ${styles.padding}`}
    activeClassName={styles.Active}
    to="/intro"
    >
    START HERE
    </NavLink>
   
    {/*Blog link*/}
    <NavLink
      className={`${styles.NavLink} ${styles.padding}`}
      to="/articles">
      News
    </NavLink>
    {/*Add Article link*/}
    <NavLink
      className={`${styles.NavLink} ${styles.padding}`}
      activeClassName={styles.Active}
      to="/articles/create" >   
      Add Article
    </NavLink>

    <NavLink
      className={`${styles.NavLink} ${styles.padding}`}
      to="/"
      onClick={handleSignOut}
      > Log out
    </NavLink>
    <NavLink
      className={styles.NavLink}
      to={`/profiles/${currentUser?.profile_id}`}
    >
      <Avatar src={currentUser?.profile_image} text= "Profile" height={40}/>
    </NavLink>
  </>;
  const loggedOutIcons = (
    <>
      <NavLink
        className={`${styles.NavLink} ${styles.padding}`}
        activeClassName={styles.Active}
        to="/signin"
      >
        Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={`${styles.NavLink} ${styles.padding}`}
        activeClassName={styles.Active}
      >
        Sign up
      </NavLink>
    </>
  );

  return (
    <Container>
      <div className={styles.LogoAndSearchContainer}>
        <div>
        <img src={logo} alt="logo" height="120" />
        </div>
      
      </div>
      <Navbar expanded={expanded} className={styles.NavBar} expand="md" >
        <Container className={styles.NavContainer}>
          <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          ref={ref}
          onClick={() => setExpanded(!expanded)}/>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={styles.NavbarOutterContainer}>
              <div >
                {currentUser ? loggedInIcons : loggedOutIcons}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>      
    </Container>  
  );
};

export default NavBar;