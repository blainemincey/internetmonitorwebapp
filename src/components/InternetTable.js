import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import {Col, Container, Row, ButtonGroup, Button} from "reactstrap";
import ReactTable from 'react-table';
import "react-table/react-table.css";

class InternetTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            internetData: [],
            yearSelected: ''
        }

        this.loadInternetData = this.loadInternetData.bind(this);
        this.mdbStitchGetInternetWebhook = process.env.REACT_APP_MONGODB_STITCH_GET_INTERNET_EVENTS_WEBHOOK;
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    async onRadioBtnClick(yearSelected) {
        this.setState({yearSelected:yearSelected, internetData:[]});
        await this.loadInternetData(yearSelected);
    }

    async loadInternetData(yearSelected) {
        console.log("Load Internet Data.");
        this.setState({yearSelected:yearSelected, internetData:[]});
        let url = this.mdbStitchGetInternetWebhook + yearSelected;

        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {'Content-type': 'application/json'}
            });

            if (response.ok) {
                console.log('Get internet data response ok!');

                let json = await response.json();
                //console.log(json);
                this.setState({
                    internetData: json
                });

                return true;

            } else {
                console.log("Response Error!");
                console.log("Unable to load");

                return false;
            };
        } catch (e) {
            console.log('Error on get internet data webhook', e);
            return false;
        }
    }

    async componentDidMount() {
        await this.loadInternetData(2019);
    }

    convertToString(value) {
        var arrayVal = Object.entries(value).map(item => item[1]);
        return arrayVal;
    }

    render() {
        const {user, internetData, yearSelected} = this.state;

        let tableData = [];
        if(internetData.length > 0) {
            tableData = internetData.slice();
        }

        return (
            <Container>
                <Row>
                    <Col>
                        <p><b>Year Selected:</b> {yearSelected}</p>
                    </Col>
                    <Col>
                        <p className="float-right"><b>Viewing events as:</b> {user.email}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ButtonGroup>
                            <Button color="primary" onClick={() => this.onRadioBtnClick(2019)}>2019</Button>
                            &nbsp;
                            <Button color="primary" onClick={() => this.onRadioBtnClick(2018)}>2018</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ReactTable
                            data={tableData}
                            noDataText="Retrieving Internet Events..."
                            columns={[
                                {
                                    Header: <b>Internet Down Events Per Hour - {yearSelected}</b>,
                                    columns: [
                                        {
                                            id: "_id.year",
                                            Header: "Year",
                                            accessor: "_id.year",
                                            Cell: row => <div style={{textAlign: "center"}}>{this.convertToString(row.value)}</div>
                                        },
                                        {
                                            id: "_id.month",
                                            Header: "Month",
                                            accessor: "_id.month",
                                            Cell: row => <div style={{textAlign: "center"}}>{this.convertToString(row.value)}</div>
                                        },
                                        {
                                            id: "_id.day",
                                            Header: "Day",
                                            accessor: "_id.day",
                                            Cell: row => <div style={{textAlign: "center"}}>{this.convertToString(row.value)}</div>
                                        },
                                        {
                                            id: "_id.hour",
                                            Header: "Hour",
                                            accessor: "_id.hour",
                                            Cell: row => <div style={{textAlign: "center"}}>{this.convertToString(row.value)}</div>
                                        },
                                        {
                                            id: "totalDown",
                                            Header: "Total Down",
                                            accessor: "totalDown",
                                            Cell: row => <div style={{textAlign: "center"}}>{this.convertToString(row.value)}</div>
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

export default withRouter(InternetTable);