import React, { Component } from "react";
import ListGroup from "reactstrap/es/ListGroup";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Header from "./Header";
import { Switch } from "react-router";
import UserProfile from "./UserProfile";
import DevRequests from "./DevRequests"
import AvailableProjects from "./AvailableProjects"
import DevHome from "./DevHome"

class DeveloperDashboard extends Component {

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout() {
        console.log('Dev is logging out. Clearing local storage.')
        localStorage.removeItem('current_user_id')
        localStorage.removeItem('current_user_type')
        this.props.history.push({
            pathname: '/Login',
        });
    }

    render() {
        return (
            <Router>
                <div style={{ minHeight: "100vh", backgroundColor: "#f2f3fa" }}>
                    <Header />
                    <Row spacing={0} style={{ margin: "0px" }}>
                        <Col md={3} style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                            <ListGroup style={{ backgroundColor: "#24134e", minHeight: "85vh" }}>
                                <ListGroupItem style={{ backgroundColor: "#24134e" }}>
                                    <Link style={{ color: "#f2f3fa" }} to="/DevHome">Home</Link>
                                </ListGroupItem>
                                <ListGroupItem style={{ backgroundColor: "#24134e" }}>
                                    <Link style={{ color: "#f2f3fa" }} to="/DevProfile">Profile</Link>
                                </ListGroupItem>
                                <ListGroupItem style={{ backgroundColor: "#24134e" }}>
                                    <Link style={{ color: "#f2f3fa" }} to="/AvailableProjects">Projects available</Link>
                                </ListGroupItem>
                                <ListGroupItem style={{ backgroundColor: "#24134e" }}>
                                    <Link style={{ color: "#f2f3fa" }} to="/DevRequests">Request status</Link>
                                </ListGroupItem>
                                <ListGroupItem style={{ backgroundColor: "#24134e" }}>
                                    <Link style={{ color: "#f2f3fa" }} to="/Login" onClick={this.logout} >Logout</Link>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md={9} style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                            <Switch>
                                <Route exact path="/DevProfile" component={UserProfile} />
                                <Route exact path="/DevRequests" component={DevRequests} />
                                <Route exact path="/AvailableProjects" component={AvailableProjects} />
                                <Route path="/DevHome" component={DevHome} />
                                <Route path="/" component={DevHome} />
                            </Switch>
                        </Col>
                    </Row>
                </div>
            </Router>
        )
    }
}

export default DeveloperDashboard