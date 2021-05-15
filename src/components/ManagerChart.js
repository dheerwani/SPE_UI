import React, {Component} from "react";
import projectService from "../services/projectService";
import {Chart} from "react-chartjs-2";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";

class DemoChart extends Component{

    constructor(props) {
        super(props);
        this.generateChart = this.generateChart.bind(this);
        this.retrieveProjects = this.retrieveProjects.bind(this);

        this.state = {
            projects: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: "",
            status : [],
            tech: []
        };
    }

     componentDidMount() {
         this.retrieveProjects()

    }

    retrieveProjects() {
        projectService.getAll()
            .then(response => {
                this.setState({
                    projects: response.data
                });
                console.log('response data',response.data);
                this.generateChart()
            })
            .catch(e => {
                console.log(e);
            });

    }

    generateChart(){
        console.log('from the state',this.state.projects)
        this.setState({
            status: this.state.projects.map(project => ({status : project.status})),
            tech: this.state.projects.map(project => ({technology : project.technology}))
        })
        console.log('this is the result',this.state.result)

        let active = 0;
        let complete = 0;
        let frontend = 0;
        let backend = 0;
        let devops = 0;
        let count = [];
        for (let i = 0; i < this.state.status.length; i++) {
            count[i] = this.state.status[i].status
            if(this.state.status[i].status === 'active') active++;
            else if(this.state.status[i].status === 'complete') complete++;

            if(this.state.tech[i].technology === 'frontend') frontend++;
            else if(this.state.tech[i].technology === 'backend') backend++;
            else if(this.state.tech[i].technology === 'devops') devops++;
        }
        console.log('count array : ',count)
        console.log('active : ',active,'  complete: ',complete)

        let myChart = document.getElementById('myChart').getContext('2d')
        let chart = new Chart(myChart,
            {
                type: "pie",
                data:{
                    labels: ['active','complete'],
                    datasets: [{
                        label: 'count',
                        data: [active,complete],
                        backgroundColor:['rgba(120, 202, 211)','rgba(179, 255, 204)'],
                        hoverBorderWidth: 2,
                        hoverBorderColor: 'black'
                    }]
                },
                options:{
                    title:{
                        display: true,
                        text: 'Status of projects',
                        fontSize: 25
                    },
                    legend:{
                        display: true,
                        position: 'right',
                        labels:{
                            fontColor: 'black'
                        }
                    },
                    layout:{
                        padding:{
                            left:50,
                            right:0,
                            top:0,
                            bottom:0
                        }
                    },
                    tooltips:{
                        enabled: false
                    }
                }
            })

            // ---------------------

            let techChart = document.getElementById('techChart').getContext('2d')
            let tech_chart = new Chart(techChart,
            {
                type: "pie",
                data:{
                    labels: ['frontend','backend','devops'],
                    datasets: [{
                        label: 'count',
                        data: [frontend,backend,devops],
                        backgroundColor:['rgba(120, 202, 211)','rgba(179, 255, 204)','rgb(37, 108, 116)'],
                        hoverBorderWidth: 2,
                        hoverBorderColor: 'black'
                    }]
                },
                options:{
                    title:{
                        display: true,
                        text: 'Status of projects',
                        fontSize: 25
                    },
                    legend:{
                        display: true,
                        position: 'right',
                        labels:{
                            fontColor: 'black'
                        }
                    },
                    layout:{
                        padding:{
                            left:50,
                            right:0,
                            top:0,
                            bottom:0
                        }
                    },
                    tooltips:{
                        enabled: false
                    }
                }
            })

    }

    render() {
        return(
            <div>
                <div className="container">
                    
                    <Row>
                        <br></br><br></br><br></br>
                    </Row>
                    <Row >
                        <Col md={5} >
                        <canvas id="myChart"></canvas>        
                        </Col>
                        {/* <Col md={2}></Col> */}
                        <Col md={5}>
                        <canvas id="techChart"></canvas>   
                        </Col>    
                    </Row> 
                    
                    
                </div>
            </div>
        )
    }

}

export default DemoChart