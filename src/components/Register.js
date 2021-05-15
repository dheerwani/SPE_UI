import React, { Component } from "react";
import employeeService from '../services/employeeService'
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            user_type: "",
            id: null,
            error_message: false
        }
        this.addUser = this.addUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this)
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleChangeUsername(e) {
        const username = e.target.value;
        this.setState(function (prevState) {
            return {

                ...prevState.username,
                username: username

            };
        });
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0 && this.state.user_type.length > 0;
    }

    addUser() {
        console.log('username is :', this.state.username)
        var data = {
            username: this.state.username,
            password: this.state.password,
            user_type: this.state.user_type
        }

        employeeService.add(data)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    password: response.data.password,
                    id: response.data.id,
                    submitted: true
                });
                if (response.data.username === null) this.setState({ error_message: true, submitted: false })
                console.log('error message : ', this.state.error_message, response.data);
                alert('User added!')
                this.props.history.push({
                    pathname: '/AdminDashboard',
                });
            })
            .catch(e => {
                console.log(e);
            })
    }




    render() {
        return (
            <div className="submit-form">


                <div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>

                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            required
                            onChange={this.handleChangeUsername}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            className="form-control"
                            id="password"
                            required
                            onChange={this.handleChange}
                            name="password"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="user_type">User Type</label>
                        <input
                            type="text"
                            className="form-control"
                            id="user_type"
                            required
                            onChange={this.handleChange}
                            name="user_type"
                        />
                    </div>



                    <button onClick={this.addUser} className="btn btn-success">
                        Submit
                        </button>

                    <h3 style={{ display: this.state.error_message ? "block" : "none" }}>
                        Username already exists!
                        </h3>

                    <p style={{ display: this.state.submitted ? "block" : "none" }}>User added!</p>
                </div>

            </div>
        )
    }
}

export default Register