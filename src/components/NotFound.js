import React from 'react';
import ErrorPage from '../assets/404-page.png';
import { Container } from 'react-bootstrap';
import Asset from '../components/Assets.js';
import appStyles from "../App.module.css"
const NotFound = () => {
  return (
    <Container className={appStyles.AssetContainer}>
        <Asset src={ErrorPage} message={"Oops, looks like the page you were looking for doesn't exist!"}/>
    </Container>
  )
}

export default NotFound