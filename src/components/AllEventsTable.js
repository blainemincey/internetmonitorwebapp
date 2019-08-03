import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import {Col, Container, Row} from "reactstrap";
import Moment from 'moment';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class AllEventsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            eventData: []
        }

        this.loadEventData = this.loadEventData.bind(this);
        this.mdbStitchGetAllEventsWebhook = process.env.REACT_APP_MONGODB_STITCH_GET_ALL_EVENTS_WEBHOOK;
    }

    async loadEventData() {
        console.log("Load Event Data.");
        let url = this.mdbStitchGetAllEventsWebhook;

        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {'Content-type': 'application/json'}
            });

            if (response.ok) {
                console.log('Get event data response ok!');
                let json = await response.json();
                //console.log(json);
                this.setState({
                    eventData: json
                });

                return true;

            } else {
                console.log("Response Error!");
                console.log("Unable to load");

                return false;
            };
        } catch (e) {
            console.log('Error on get all event data webhook', e);
            return false;
        }
    }

    async componentDidMount() {
        await this.loadEventData();
    }

    render() {
        const {user, eventData} = this.state;

        return (
            <Container>
                <p><b>Viewing events as:</b> {user.email}</p>
                <Row>
                    <Col>
                        <ReactTable
                            data={eventData}
                            noDataText="Retrieving Events..."
                            columns={[
                                {
                                    Header: <b>All Events - Most Recent Day</b>,
                                    columns: [
                                        {
                                            id: "timeSeriesData.timeStamp",
                                            Header: "Date/Time",
                                            accessor: d => {
                                                return Moment(parseInt(d.timeSeriesData.timeStamp.$date.$numberLong))
                                                    .local()
                                                    .format("ddd, MMM-DD-YYYY hh:mm:ss a")
                                            }
                                        },
                                        {
                                            id: "timeSeriesData.networkType",
                                            Header: "Type",
                                            accessor: d => d.timeSeriesData.networkType
                                        },
                                        {
                                            id: "timeSeriesData.status",
                                            Header: "Status",
                                            accessor: d => d.timeSeriesData.status
                                        }
                                    ]
                                }
                            ]}
                            defaultPageSize={10}
                            className="-striped -highlight"
                            sortable={false}
                        >
                        </ReactTable>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(AllEventsTable);