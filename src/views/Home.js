import React, { Fragment } from "react";
import {useAuth0} from "../react-auth0-spa";
import Hero from "../components/Hero";
import HeroAuth from "../components/HeroAuth";

const Home = () => {
    const {isAuthenticated} = useAuth0();
    return (
        <Fragment>
            <h4 className="text-center">Internet Monitor</h4>
            <hr className="myline"/>
            {!isAuthenticated && (
                <Hero/>
            )}
            {isAuthenticated && (
                <HeroAuth/>
            )}
            <hr className="myline"/>
        </Fragment>
    );
}


export default Home;
