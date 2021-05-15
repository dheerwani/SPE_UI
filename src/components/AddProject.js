import React, {Component} from "react";
import projectService from "../services/projectService";

class AddProject extends Component{

    constructor(props) {
        super(props);
        this.onChangeProjectId = this.onChangeProjectId.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeTechnology = this.onChangeTechnology.bind(this);
        this.onChangeManager = this.onChangeManager.bind(this);
        this.saveProject = this.saveProject.bind(this);
        this.newProject = this.newProject.bind(this);
        this.state = {
            id: null,
            projectId: "",
            name: "",
            status: "",
            technology: "",
            manager_id: "",
            submitted: false
        };
    }

    onChangeProjectId(e) {
        this.setState({
            projectId: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    onChangeTechnology(e) {
        this.setState({
            technology: e.target.value
        });
    }

    onChangeManager(e) {
        this.setState({
            manager_id: e.target.value
        });
    }

    saveProject() {
        var data = {
            name: this.state.name,
            projectId: this.state.projectId,
            status: this.state.status,
            technology: this.state.technology,
            manager_id: this.state.manager_id
        };

        projectService.add(data)
            .then(response => {
                this.setState({
                    projectId: response.data.projectId,
                    name: response.data.name,
                    status: response.data.status,
                    technology: response.data.technology,
                    manager_id: response.data.manager_id,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newProject() {
        this.setState({
            projectId: "",
            name: "",
            technology: "",
            status: "",
            manager_id: "",
            submitted: false
        });
    }



    render() {
        return(
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newProject}>
                            Add
                        </button>
                    </div>
                ) : (

                    <div>
                        <div className="form-group">
                            <label htmlFor="projectId">Project Id</label>

                            <input
                                type="text"
                                className="form-control"
                                id="projectId"
                                required
                                value={this.state.projectId}
                                onChange={this.onChangeProjectId}

                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="technology">Technology</label>
                            <input
                                type="text"
                                className="form-control"
                                id="technology"
                                required
                                value={this.state.technology}
                                onChange={this.onChangeTechnology}
                                name="technology"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <input
                                type="text"
                                className="form-control"
                                id="status"
                                required
                                value={this.state.status}
                                onChange={this.onChangeStatus}
                                name="status"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="manager_id">Manager ID </label>
                            <input
                                type="text"
                                className="form-control"
                                id="manager_id"
                                required
                                value={this.state.manager_id}
                                onChange={this.onChangeManager}
                                name="manager_id"
                            />
                        </div>

                        <button onClick={this.saveProject} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                    )}
            </div>
        )
    }

}

export  default  AddProject