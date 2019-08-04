import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import {Col, Container, Row} from "reactstrap";

class UserMetaData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            //userMetaData: ''
        }

        //this.loadUserMetaData = this.loadUserMetaData.bind(this);
        //this.auth0API = process.env.REACT_APP_AUTH0_API;
        //this.auth0Bearer = process.env.REACT_APP_AUTH0_BEARER;
    }

    /**
    async loadUserMetaData() {
        console.log("Load User Meta Data.");
        let url = this.auth0API + "%22" + this.state.user.email + "%22&search_engine=v3";

        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                          'Authorization': this.auth0Bearer,
                        }

            });

            if (response.ok) {
                console.log('Get event data response ok!');
                let json = await response.json();
                //console.log(json);
                this.setState({
                    userMetaData: json
                });

                return true;

            } else {
                console.log("Response Error!");
                console.log("Unable to load");

                return false;
            };
        } catch (e) {
            console.log('Error on get user meta data ', e);
            return false;
        }
    }
     */

    async componentDidMount() {
        //await this.loadUserMetaData();
    }

    render() {
        const {user} = this.state;
        const stringtoreplace = "https://blaine-internetmonitor.mongodb.com/";

        let json = JSON.stringify(user);
        let jsonString = json.replace(new RegExp(stringtoreplace, 'gi'), "");

        let myJson = JSON.parse(jsonString);

        return (
            <Container>
                <Row>
                    <Col>
                        <p><b>User Meta Data from Auth0</b></p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Current IP: {myJson.ip}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Total Number Logins: {myJson.loginsCount}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Current City: {myJson.city}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Current Timezone: {myJson.timeZone}</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(UserMetaData);