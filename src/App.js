import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import Requests from "./components/Requests";
import DeveloperDashboard from "./components/DeveloperDashboard"


class App extends Component{

    render(){
        return(
            <Router>
                <Switch>
                <Route exact path='/' component={Login}/>
                <Route exact path="/Login" component={Login}/>
                <Route exact path="/ManagerDashboard" component={ManagerDashboard}/>
                <Route exact path="/AdminDashboard" component={AdminDashboard}/>
                <Route exact path="/Requests" component={Requests}/>
                <Route exact path="/DeveloperDashboard" component={DeveloperDashboard}/>
                <Route exact path="/ProjectList" component={ManagerDashboard} />
                <Route path="/addProject" component={ManagerDashboard} />
                <Route path="/ManagerHome" component={ManagerDashboard} />
                <Route path="/ManagerUserProfile" component={ManagerDashboard} />
                <Route path="/Requests" component={ManagerDashboard} />
                <Route path="/DevList" component={ManagerDashboard} />
                <Route path="/view/:id" component={ManagerDashboard} />
                <Route exact path="/DevProfile" component={DeveloperDashboard} />
                <Route exact path="/DevRequests" component={DeveloperDashboard} />
                <Route exact path="/AvailableProjects" component={DeveloperDashboard} />
                <Route path="/DevHome" component={DeveloperDashboard} />
                <Route exact path="/Add" component={AdminDashboard} />
                <Route path="/ViewAll" component={AdminDashboard} />
                </Switch>
            </Router>
        )
    }
}

export default App;