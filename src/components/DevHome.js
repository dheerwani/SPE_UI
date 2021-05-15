import React, { Component } from 'react'
import { Container } from 'reactstrap';
import projectService from "../services/projectService";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Card from "reactstrap/es/Card"
import CardBody from "reactstrap/es/CardBody"

class DevHome extends Component{

    constructor(props) {
        super(props);
        
        this.getActiveProjects = this.getActiveProjects.bind(this);
        this.getCompletedProjects = this.getCompletedProjects.bind(this);

        this.state = {
            active: [],
            complete: [],
            loadActive : false,
            loadComplete: false
        };
    }

    componentDidMount() {
        this.getActiveProjects(localStorage.getItem('current_user_id'))
        this.getCompletedProjects(localStorage.getItem('current_user_id'))
    }

    getActiveProjects(id){
        projectService.getActiveProjects(id)
            .then(response => {
                this.setState({
                    active: response.data,
                    loadActive: true
                });
                console.log('response data',response.data);
                
            })
            .catch(e => {
                console.log(e);
            });

    }

    getCompletedProjects(id){
        projectService.getCompletedProjects(id)
            .then(response => {
                this.setState({
                    complete: response.data,
                    loadComplete: true
                });
                console.log('complete data',response.data);
                
            })
            .catch(e => {
                console.log(e);
            });

    }

    

    render(){

        if(!this.state.loadActive && !this.state.loadComplete){
            return(
                <div>Loading...</div>
            )
        }

        const { active, complete } = this.state

        return(
            <Container>
                <Row>
                    

                    <Col md={6}>
                    <h5>List of active projects</h5>
                    <ul className="list-group">
                        {active && active.map((a, index) => (
                            <Card  outline color="info">
                                <CardBody>
                                    Project ID : {a.projectId} <br/>
                                    Name : {a.name} <br/>
                                    Technology : {a.technology} <br/>
                                    Manager ID : {a.manager_id} <br/> 
                                </CardBody>
                            </Card>
                        ))}
                    </ul>
                    </Col>    

                    <Col md={6}>
                    <h5>List of complete projects</h5>
                    <ul className="list-group">
                    {complete && complete.map((c, index) => (
                            <Card  outline color="info">
                                <CardBody>
                                    Project ID : {c.projectId} <br/>
                                    Name : {c.name} <br/>
                                    Technology : {c.technology} <br/>
                                    Manager ID : {c.manager_id} <br/>
                                </CardBody>
                            </Card>
                        ))}
                    </ul>
                    </Col>

                    
                </Row>
            </Container>
            
        )
        
    }
}

export default DevHome