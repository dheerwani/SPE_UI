import React, { Component } from 'react';
import employeeService from "../services/employeeService";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Container from "reactstrap/es/Container";

class DevList extends Component{

    constructor(props) {
        super(props);
        this.getAllDev= this.getAllDev.bind(this);
        this.state = {
            result: [],
            searchTitle: ""
        };

    }

    componentDidMount() {
        this.getAllDev();
    }

    getAllDev(){
        employeeService.getAllDev()
            .then(response => {
                this.setState({
                    result: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    render(){

        const result = this.state.result

        return(
            <Container>
                <Row>
                    <Col md={6}>
                    <ul className="list-group">
                        {result &&
                        result.map((p, index) => (
                            <li className={"list-group-item"}>

                                Developer ID : {p.empId}<br/>
                                Name : {p.first_name}  {p.last_name}<br/>
                                Area of expertise : {p.area_of_expertise}<br/>
                                
                            </li>
                        ))}
                    </ul>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default DevList