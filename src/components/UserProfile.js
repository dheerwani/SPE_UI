import React, { Component } from 'react';
import EmployeeService from '../services/employeeService'
class UserProfile extends Component{

        constructor(props){
            super(props)
            
            this.getUser = this.getUser.bind(this)
            this.onChangeFirstName = this.onChangeFirstName.bind(this)
            this.onChangeLastName = this.onChangeLastName.bind(this)
            this.onChangeSkill = this.onChangeSkill.bind(this)
            this.updateProfile = this.updateProfile.bind(this)
            this.state = {
                empId: "",
                first_name: "",
                last_name: "",
                area_of_expertise: "",
                message: ""
            }
        }

        componentDidMount(){
            console.log('emp id is : ',localStorage.getItem('current_user_id'))
            // get user by id from api
            this.getUser(localStorage.getItem('current_user_id'));
        }
 
        getUser(id){
            EmployeeService.getUser(id)
            .then(response => {
                this.setState({
                    empId: response.data.empId,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    area_of_expertise: response.data.area_of_expertise
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }

        updateProfile(){

           
                var data = {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    area_of_expertise: this.state.area_of_expertise,
                    empId: this.state.empId
                }
                EmployeeService.updateProfile(data)
                    .then(response => {
                        console.log(response.data);
                        this.setState({
                            message: "The project was updated successfully!"
                        });
                        alert('Profile updated!')
                    })
                    .catch(e => {
                        console.log(e);
                    });
            
        }

       
    
        onChangeFirstName(e) {
            const first_name = e.target.value;
            this.setState(function(prevState) {
                return {

                        ...prevState.first_name,
                        first_name: first_name
                    
                };
            });
        }

        onChangeLastName(e) {
            const last_name = e.target.value;
            this.setState(function(prevState) {
                return {

                        ...prevState.last_name,
                        last_name: last_name
                    
                };
            });
        }

        onChangeSkill(e) {
            const area_of_expertise = e.target.value;
            this.setState(function(prevState) {
                return {

                        ...prevState.area_of_expertise,
                        area_of_expertise: area_of_expertise
                    
                };
            });
        }

        render(){
            return(
                <div className="edit-form">
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">User Profile</label>
                        </div>

                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                value={this.state.first_name}
                                onChange={this.onChangeFirstName}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="last_name"
                                value={this.state.last_name}
                                onChange={this.onChangeLastName}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="skills">Area of expertise</label>
                            <input
                                type="text"
                                className="form-control"
                                id="area_of_expertise"
                                value={this.state.area_of_expertise}
                                onChange={this.onChangeSkill}
                            />
                        </div>

                    </form>

                    <button type="submit"
                        className="badge badge-success"
                        onClick={this.updateProfile}>
                        Update Profile
                    </button>
                    <p>{this.state.message}</p>
                </div>
            )
        }

}

export default UserProfile