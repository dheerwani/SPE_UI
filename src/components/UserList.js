import React, {Component} from "react";
import employeeService from "../services/employeeService";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Card from "reactstrap/es/Card"
import CardBody from "reactstrap/es/CardBody"

class UserList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            currentEmployee: null,
            currentIndex: -1,
            searchTitle: "",
            selected_first_name: "",
            selected_last_name: "",
            selected_empId: ""
        }
        this.retrieveEmployees = this.retrieveEmployees.bind(this);
        this.setActiveEmployee = this.setActiveEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    componentDidMount() {
        console.log('in user list')
        this.retrieveEmployees();
    }

    retrieveEmployees() {
        employeeService.getAll()
            .then(response => {
                this.setState({
                    employees: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    setActiveEmployee(emp, index){
        console.log('console: ',emp)
        employeeService.getUser(emp.empId).then(
            (response) => {
                console.log('response is: ',response.data)
                this.setState({
                    currentEmployee: emp,
                    currentIndex: index,
                    selected_empId: response.data.empId,
                    selected_first_name: response.data.first_name,
                    selected_last_name: response.data.last_name
                });
            }
        ).catch(e => {
            console.log(e)
        })
    }

    deleteEmployee(){
        alert('are you sure you want to delete the employee?')
        employeeService.deleteEmployee(this.state.selected_empId).then(
            // go back to employee list. alert - employee deleted
            (response) => {
                console.log('employee deleted :',this.state.selected_empId)
                console.log('delete response is: ',response)
                this.retrieveEmployees()
                this.setState({
                    currentEmployee: null
                })
            }
            
        ).catch(
            (e) => {
                console.log('error is: ',e)
            }
        )
    }


 
    render() {
        const { employees, currentEmployee, currentIndex } = this.state;
        return(
            <div>
                <Row>
                    <Col md={6}>
                    
                    <ul className="list-group">
                    {employees &&
                        employees.map((emp, index) => (
                            <Card  outline color="info">
                                <CardBody
                                    className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                    onClick={() => this.setActiveEmployee(emp, index)}
                                    key={index}>
                                    {emp.username} 
                                </CardBody>
                            </Card>
                        ))}
                    </ul>
                    </Col>    
               <Col md={6}>
               <div>
               {currentEmployee ?(
                        <div>
                            <h4>Employee Details</h4>
                            <div>
                                <label>
                                    <strong>Username:</strong>
                                </label>{" "}
                                {currentEmployee.username}
                            </div>
                            <div>
                                <label>
                                    <strong>User Type:</strong>
                                </label>{" "}
                                {currentEmployee.user_type}
                            </div>
                            <div>
                                <label>
                                    <strong>Employee ID:</strong>
                                </label>{" "}
                                {this.state.selected_empId}
                            </div>
                            <div>
                                <label>
                                    <strong>First Name:</strong>
                                </label>{" "}
                                {this.state.first_name}
                            </div>
                            <div>
                                <label>
                                    <strong>Last Name:</strong>
                                </label>{" "}
                                {this.state.last_name}
                            </div>
                        
                            <button type="submit"  className="badge badge-warning" onClick={this.deleteEmployee}>
                                Delete employee record
                            </button>
                        </div>
                        
                    ):  (
                        <div>
                            <br />
                            <p>Click on an employee to view details</p>
                        </div>)}


                     </div>
               </Col>
                
                </Row>
                

            </div>
        )
    }
}

export default UserList