import React, { Component } from "react";
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import withStyles from "@material-ui/core/styles/withStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from '@material-ui/core/TextField';
import base_url from "../api/bootapi";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        '& > *': { margin: theme.spacing(1), width: '25ch' }
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 30,
        color: "#24134e",
    },
    pos: {
        marginBottom: 12,
    },
}));

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            user_type: "",
            errorMessage: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        localStorage.clear()
        console.log('login component')
        let response = await fetch(`${base_url}` + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                user_type: this.state.user_type
            })
        });
        let status = response.status;

        if (status === 200) {
            let responseJson = await response.json()
            console.log('manager logged in! :', responseJson)
            console.log('user type is : ', responseJson.user_type)

            localStorage.setItem('current_user_id', responseJson.empId)
            localStorage.setItem('current_user_type', responseJson.user_type)
            if (responseJson.user_type === 'admin') {
                this.props.history.push({
                    pathname: '/AdminDashboard',
                });
            }
            else if (responseJson.user_type === 'manager') {
                this.props.history.push({
                    pathname: '/ManagerDashboard',
                });
            }
            else if (responseJson.user_type === 'developer') {
                this.props.history.push({
                    pathname: '/DeveloperDashboard',
                });
            }
        }

        else if (status === 404) {
            this.setState({
                errorMessage: true
            })
        } else {
            this.props.history.push({
                pathname: '/Error404',
                message: 'Backend server is down'
            });
        }
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{ height: "100vh" }} >
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={12} sm={4} >
                        <form onSubmit={this.handleSubmit} >
                            <Card className={classes.root} style={{ backgroundColor: "#f2f3fa", marginTop: "5em", padding:"1em" }}>
                                <CardContent >
                                    <Typography
                                        className={classes.title} variant="h5" component="h2"
                                        style={{
                                            color: "#24134e",
                                            fontWeight: 600
                                        }}
                                        gutterBottom
                                    >
                                        Calvin and Hobbes Co.
                                    </Typography>
                                    <TextField id="standard-basic"
                                        label="Username"
                                        name="username"
                                        type="text"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                        required />
                                    <br /><br />
                                    <TextField id="standard-basic"
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        required />
                                </CardContent>
                                <h3 style={{ display: this.state.errorMessage ? "block" : "none" }}>
                                    Incorrect username or password
                                </h3>
                                <CardActions>
                                    <Button style={{ margin: "0.5em" }} variant="contained" color="primary" type="submit" size="small" disabled={!this.validateForm}>Login</Button>
                                </CardActions>
                            </Card>
                        </form>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(useStyles)(Login)