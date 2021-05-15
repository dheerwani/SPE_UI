import React, { Component } from "react";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Header from "./Header";
import ListGroup from "reactstrap/es/ListGroup";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Link } from "react-router-dom";
import ProjectList from "./ProjectList";
import Project from "./Project";
import { Switch } from "react-router";
import AddProject from "./AddProject";
import ManagerChart from "./ManagerChart";
import UserProfile from "./UserProfile";
import Requests from "./Requests"
import DevList from "./DevList"


class ManagerDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {}

    logout() {
        console.log('clearing local storage')
        localStorage.removeItem('current_user_type')
        localStorage.removeItem('current_user_id')
        this.props.history.push({
            pathname: '/Login',
        });
    }

    render() {

        return (
            <Router>
                <div style={{ minHeight: "100vh", backgroundColor: "#f2f3fa"}}>
                    <Header />
                    <Row spacing={0} style={{ margin: "0px" }}>
                        <Col md={3} style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                            <ListGroup style={{ backgroundColor: "#24134e", minHeight: "85vh" }}>
                                <ListGroupItem style={{ backgroundColor: "#24134e" }}><Link style={{ color: "#f2f3fa" }} to="/ManagerHome">Home</Link></ListGroupItem>
                                <ListGroupItem style={{ backgroundColor: "#24134e" }}><Link style={{ color: "#f2f3fa" }} to="/ProjectList">Projects</Link></ListGroupItem>
                                <ListGroupItem style={{ backgroundColor: "#24134e" }}><Link style={{ color: "#f2f3fa" }} to="/Requests">Project requests</Link></ListGroupItem>
                                <ListGroupItem style={{ backgroundColor: "#24134e" }}><Link style={{ color: "#f2f3fa" }} to="/ManagerUserProfile">Profile</Link></ListGroupItem>
                                <ListGroupItem style={{ backgroundColor: "#24134e" }}><Link style={{ color: "#f2f3fa" }} to="/DevList">Developer details</Link></ListGroupItem>
                                <ListGroupItem style={{ backgroundColor: "#24134e" }}><Link style={{ color: "#f2f3fa" }} to="/Login" onClick={this.logout} >Logout</Link></ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md={9} style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                            <Switch>
                            <Route exact path="/ProjectList" component={ProjectList} />
                                <Route path="/view/:id" component={Project} />
                                <Route path="/addProject" component={AddProject} />
                                <Route path="/ManagerHome" component={ManagerChart} />
                                <Route path="/ManagerUserProfile" component={UserProfile} />
                                <Route path="/Requests" component={Requests} />
                                <Route path="/DevList" component={DevList} />
                                <Route path="/" component={ManagerChart} />
                            </Switch>
                        </Col>
                    </Row>
                </div>
            </Router>
        )


    }
}

export default ManagerDashboard