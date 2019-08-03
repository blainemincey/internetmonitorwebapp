import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import {Col, Container, Row} from "reactstrap";

class UserMetaData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            userMetaData: ''
        }

        this.loadUserMetaData = this.loadUserMetaData.bind(this);
        this.auth0API = process.env.REACT_APP_AUTH0_API;
        this.auth0Bearer = process.env.REACT_APP_AUTH0_BEARER;
    }

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

    async componentDidMount() {
        await this.loadUserMetaData();
    }

    render() {
        const {userMetaData} = this.state;

        let myUserMetaData = '';
        if(userMetaData.length > 0) {
            myUserMetaData = userMetaData[0];
        }

        return (
            <Container>
                <Row>
                    <Col>
                        <p><b>User Meta Data from Auth0</b></p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Last IP: {myUserMetaData.last_ip}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Total Number Logins: {myUserMetaData.logins_count}</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(UserMetaData);