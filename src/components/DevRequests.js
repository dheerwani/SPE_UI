import React, { Component } from 'react';
import projectService from "../services/projectService";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Card from "reactstrap/es/Card"
import CardBody from "reactstrap/es/CardBody"

class DevRequests extends Component{

    constructor(props) {
        super(props);
        this.retrieveRequests = this.retrieveRequests.bind(this);
        this.state = {
            requests: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: "",
            loaded: false
        };
    }

    componentDidMount() {
        this.retrieveRequests(localStorage.getItem('current_user_id'));
    }

    retrieveRequests(id) {
        projectService.getEmpRequest(id)
            .then(response => {
                this.setState({
                    requests: response.data,
                    loaded: true
                });
                console.log(response.data);
                console.log('requests : ',this.state.requests)
                
            })
            .catch(e => {
                console.log(e);
            });
        
    }

    render(){

        if(!this.state.loaded) {
            return (
                <div><h1>Loading Data</h1></div>
            )
        }

        const request = this.state.requests
        
        return (
           
                <div >
                    <Row>
                        <Col md={12}>
                            <ul className="list-group">
                            {request && request.map((req) => (
                                
                                <Card  outline color="info">
                                <CardBody
                                    className={"list-group-item "}>
                                    Project ID : {req.projectId} <br/>
                                    Status : {req.status} 
                                </CardBody>
                            </Card>
                        ))}
                            </ul>
                        </Col>
                    </Row>
                
                <ul className="list-group">
                        {request &&
                        request.map((req) => (
                       
                            <li className={"list-group-item "}>
                                Project ID : {req.projectId} <br/>
                                Status : {req.status} 
                            </li>
                        ))}

                    </ul>
            </div>
        )
    }
}

export default DevRequests