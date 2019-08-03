import React from "react";
import {useAuth0} from "../react-auth0-spa";
import AllEventsTable from '../components/AllEventsTable';

const AllEvents = () => {

    const {user} = useAuth0();

    return (
        <div>
            <h4 className="text-center">All Events</h4>
            <hr className="myline"/>
            <AllEventsTable user={user}/>
        </div>
    );
}

export default AllEvents;