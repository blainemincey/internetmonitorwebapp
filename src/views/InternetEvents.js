import React from "react";
import {useAuth0} from "../react-auth0-spa";
import InternetTable from "../components/InternetTable";

const InternetEvents = () => {

    const {user} = useAuth0();

    return (
        <div>
            <h4 className="text-center">Internet Events</h4>
            <hr className="myline"/>
            <InternetTable user={user}/>
        </div>
    );
}

export default InternetEvents;