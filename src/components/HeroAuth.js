import React from "react";
import {useAuth0} from "../react-auth0-spa";
import UserMetaData from "./UserMetaData";

const HeroAuth = () => {
    const {user} = useAuth0();

    return (
        <div className="text-center hero my-5">
            <p>
                Thank you for logging in, <b>{user.name}</b>!
            </p>
            <UserMetaData user={user}/>
        </div>
    )

};

export default HeroAuth;
