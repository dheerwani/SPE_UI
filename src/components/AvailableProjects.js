import React, { Component } from 'react';
import projectService from "../services/projectService";
import Card from "reactstrap/es/Card"
import CardBody from "reactstrap/es/CardBody"
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";

class AvailableProjects extends Component{

    constructor(props){
        super(props)
        this.state = {
            loaded : false,
            projects: [],
            currentProject : null,
            currentIndex: -1
        }
        this.loadProjects = this.loadProjects.bind(this)
        this.sendRequest = this.sendRequest.bind(this)
        this.refreshList = this.refreshList.bind(this)
     }

     componentDidMount(){
         this.loadProjects(localStorage.getItem('current_user_id'))
     }

     loadProjects(id){
        projectService.getAvailableProjects(id)
            .then(response => {
                this.setState({
                    projects: response.data,
                    loaded: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    sendRequest(project,index){
        var data = {
            empId: localStorage.getItem('current_user_id'),
            projectId: project.projectId,
            status: 'pending'
        }

        console.log(data)
        projectService.makeRequest(data)
            .then(response => {
                console.log(response.data);
                this.refreshList()
                this.setState({
                    loaded:false,
                    message: "The request was updated successfully!"
                });
                alert('Request sent!')
            })
            .catch(e => {
                console.log(e);
            });

        console.log(this.state.currentProject)
    }

    refreshList(){
        console.log('refresh list')
        this.loadProjects(localStorage.getItem('current_user_id'))
    }

    render(){

        if(!this.state.loaded){
            return(
                <div>
                    <h3>Loading...</h3>
                </div>
            )
        }

        const { projects, currentIndex} = this.state
        return(
            <div >

                <Row>
                    
                    <Col md={12}>
                        <ul className="list-group">
                        {projects &&
                        projects.map((project, index) => (
                                <Card  outline color="info">
                                    <CardBody
                                        className={ "list-group-item " + (index === currentIndex ? "active" : "")}
                                        onClick={() => this.sendRequest(project, index)}
                                        key={index}>
                                        Project ID : {project.projectId} <br/>
                                Name : {project.name} <br/>
                                Technology : {project.technology} <br/> 
                                    </CardBody>
                                </Card>
                            ))}
                        </ul>
                        </Col>    
                        
                    
                </Row>
                <Row>
                <Col md={4}></Col>
                            <Col md={6}>
                            <p>Click on a project to send a request</p>
                            </Col>
                        
                        <Col md={3}></Col>
                </Row>

                </div>
        )
    }

}

export default AvailableProjects