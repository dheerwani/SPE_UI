import React, { Component } from "react";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Header from "./Header";
import ListGroup from "reactstrap/es/ListGroup";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Link } from "react-router-dom";
import { Switch } from "react-router";
import Register from "./Register";
import UserList from "./UserList";

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)
        this.state = {
            empId: null,
            user_type: ""
        }
    }
    componentDidMount() {
        console.log('from the admin: ', this.props.empId)
    }

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
                <div style={{ minHeight: "100vh", backgroundColor: "#f2f3fa" }}>
                    <Header />
                    <Row spacing={0} style={{ margin: "0px" }}>
                        <Col md={3} style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                            
                            <ListGroup style={{ backgroundColor: "#24134e", minHeight: "85vh" }}>
                                
                                <ListGroupItem style={{ backgroundColor: "#24134e" }}>
                                    <Link style={{ color: "#f2f3fa" }} to="/Add">Register a new User</Link>
                                </ListGroupItem>
                                <ListGroupItem style={{ backgroundColor: "#24134e" }}>
                                    <Link style={{ color: "#f2f3fa" }} to="/ViewAll">Employee List</Link>
                                </ListGroupItem>

                                <ListGroupItem style={{ backgroundColor: "#24134e" }}>
                                    <Link style={{ color: "#f2f3fa" }} to="/Login" onClick={this.logout} >Logout</Link>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md={9} style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                        <h4>List of employees</h4>
                            <Switch>
                                <Route exact path="/Add" component={Register} />
                                <Route path="/ViewAll" component={UserList} />
                                <Route path="/" component={UserList} />
                            </Switch>
                        </Col>
                    </Row>
                </div>
            </Router>
        )
    }
}

export default AdminDashboard