import React, {Component} from "react";
import projectService from "../services/projectService";
import {Link} from "react-router-dom";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Card from "reactstrap/es/Card"
import CardBody from "reactstrap/es/CardBody"


class ProjectList extends Component{

    constructor(props) {
        super(props);
        this.retrieveProjects = this.retrieveProjects.bind(this);
        this.state = {
            projects: [],
            currentProject: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        console.log("Inside Component did mount");
        this.retrieveProjects();
    }

    retrieveProjects() {
        projectService.getAll()
            .then(response => {
                this.setState({
                    projects: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveProjects();
        this.setState({
            currentProject: null,
            currentIndex: -1
        });
    }

    setActiveProject(tutorial, index) {
        this.setState({
            currentProject: tutorial,
            currentIndex: index
        });
    }

 
    render() {
        const { projects, currentProject, currentIndex } = this.state;
        return(
            <div>

                <Row>
                    <Col md={6}>
                    <ul className="list-group">
                        {projects &&
                        projects.map((p, index) => (
                            <Card  outline color="info">
                                <CardBody
                                    className={"list-group-item " +(index === currentIndex ? "active" : "")}
                                    onClick={() => this.setActiveProject(p, index)}
                                    key={index}>
                                    Project ID : {p.projectId} 
                                </CardBody>
                            </Card>
                        ))}
                    </ul>
                    </Col>    
               <Col md={6}>
               <div>
                    {currentProject ?(
                        <div>
                            
                            
                            
                            <div>
                                <h3>Project ID : {currentProject.projectId} </h3>
                            </div>

                            <div>
                            <h4>Title : {currentProject.name} </h4>

                            </div>
 
                            <div>
                                <h4>Technology: {currentProject.technology}</h4>
                            </div>

                            

                            <Link
                                to={"/view/" + currentProject.id}
                                className="badge badge-warning">
                                Edit
                            </Link>
                        </div>
                    ):  (
                        
                            <div>
                            <br />
                            <p>Click on a project to view details</p>
                        </div>
                     
                        )}


                     </div>
               </Col>
                
                </Row>
                <br/><br/>
                <Row>
                    <Col md={5}></Col>
                    <Col md={6}>
                    <Link
                    to={"/addProject"}
                    className="badge badge-info info">
                    Add Project
                </Link>
                    </Col>
                
                </Row>
                

 
            </div>
        )
    }
}

export default ProjectList