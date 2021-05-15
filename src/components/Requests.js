import React, {Component} from "react";
import projectService from "../services/projectService";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Card from "reactstrap/es/Card"
import CardBody from "reactstrap/es/CardBody"

class Requests extends Component{

    constructor(props) {
        super(props);
        this.retrieveRequests = this.retrieveRequests.bind(this)
        this.updateRequest = this.updateRequest.bind(this)
        this.approveRequest = this.approveRequest.bind(this)
        this.rejectRequest = this.rejectRequest.bind(this)
        this.state = {
            requests: [],
            currentRequest: null
        }
    }

    componentDidMount() {
        this.retrieveRequests();
    }

    retrieveRequests(){
        projectService.getRequests()
        .then(response => {
            this.setState({
                requests: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }

    setActiveRequest(request, index) {
        this.setState({
            currentRequest: request,
            currentIndex: index
        });
    }

    updateRequest(){
        projectService.updateRequest(
            this.state.currentRequest
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The request was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    approveRequest(){
        var data = {
            empId: this.state.currentRequest.empId,
            projectId: this.state.currentRequest.projectId,
            status: "approved",
            id: this.state.currentRequest.id
        }
        projectService.updateRequest(data)
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The project was updated successfully!"
                });
                alert('Request approved!')
                this.props.history.push('/Requests')
            })
            .catch(e => {
                console.log(e);
            });
    }

    rejectRequest(){
        var data = {
            empId: this.state.currentRequest.empId,
            projectId: this.state.currentRequest.projectId,
            status: "rejected",
            id: this.state.currentRequest.id
        }
        projectService.updateRequest(data)
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The project was updated successfully!"
                });
                alert('Request rejected!')
                this.props.history.push('/Requests')
            })
            .catch(e => {
                console.log(e);
            });
    }



    render() {
        const { requests, currentRequest, currentIndex } = this.state;
        return(
            <div>

<br/>
                    <Row>
                    
                        <Col md={6}>
                        <ul className="list-group">
                        {requests &&
                        requests.map((request, index) => ( 
                            <Card  outline color="info">
                                <CardBody
                                    className={"list-group-item " +(index === currentIndex ? "active" : "")}
                                    onClick={() => this.setActiveRequest(request, index)}
                                    key={index}>
                                    Project ID : {request.projectId} <br/>
                                </CardBody>
                            </Card>

                            
                        ))}
                    </ul>
                        </Col>

                        <Col md={6}>
                            <div>
                            {currentRequest ?(
                        <div>
                            
                            <div>
                                <h4>Project ID: {currentRequest.projectId} </h4>
                            </div>
                            <div>
                                <h4>Employee ID: {currentRequest.empId}</h4>
                                
                            </div>
                            
                       
                            <br/><br/>
                        <button type="submit" className="badge badge-success" onClick={this.approveRequest}>
                            Approve
                        </button>
                        <br/><br/>
                        <button type="submit" className="badge badge-success" onClick={this.rejectRequest}>
                            Reject
                        </button>
                        
                    </div>):(
                        <div>
                        <br />
                        <p>Click on a request to view details</p>
                        </div>)}
                            </div>        
                        </Col>
                    </Row>
             


            </div>
        )
    }

}

export default Requests