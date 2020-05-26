import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/index';
import './UserAccount.css';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import Loader from '../../components/loader/Loader';

class Register extends Component {

    state = {
        name: "",
        email: "",
        password: "",
        c_password: "",
        avatar: "",
        birthdate: ""
    }

    componentDidMount() {
        document.title = "Create New Account";
    }

    onRegisterUser = (e) => {
        e.preventDefault();
        this.props.onRegister(this.state.name, this.state.email, this.state.password, this.state.c_password, this.state.avatar, this.state.birthdate);
    }

    render() {
        let loading = "";
        if (this.props.loading) {
            loading = <div className="loader-overlay"><Loader /></div>;
        }

        let error = "";
        if (this.props.error) {
            error = <Alert color="danger">Sorry please, try again..</Alert>;
        }

        let success = "";
        if (this.props.registerSuccess) {
            success = <Alert color="success">Success to created new account!</Alert>;
        }

        const token = localStorage.getItem('token');
        let redirect = "";
        if (token) {
            redirect = <Redirect to="/" />
        }

        return (
            <div className="UserAccountContainer">
                {redirect}
                <div className="modal-container">
                    <div className="modal-container-content">
                        {loading}
                        {success}
                        {error}
                        <h2 className="mb-4">Create Account Now</h2>
                        <Form onSubmit={this.onRegisterUser}>
                            {<FormGroup>
                                <Label for="exampleFullname">Full Name</Label>
                                <Input 
                                    type="text" 
                                    name="fullname" 
                                    id="exampleFullname" 
                                    placeholder="Full Name" 
                                    value={this.state.name}
                                    onChange={(event) => this.setState({name: event.target.value})} />
                            </FormGroup> }
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input 
                                    type="email" 
                                    name="email" 
                                    id="exampleEmail" 
                                    placeholder="Email" 
                                    value={this.state.email} 
                                    onChange={(event) => this.setState({email: event.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input 
                                    type="password" 
                                    name="password" 
                                    id="examplePassword" 
                                    placeholder="Password" 
                                    value={this.state.password}
                                    onChange={(event) => this.setState({password: event.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword2">Confirmation Password</Label>
                                <Input 
                                    type="password" 
                                    name="c_password" 
                                    id="examplePassword2" 
                                    placeholder="Password" 
                                    value={this.state.c_password}
                                    onChange={(event) => this.setState({c_password: event.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleAvatar">Avatar</Label>
                                <Input 
                                    type="file" 
                                    name="avatar" 
                                    id="exampleAvatar" 
                                    value={this.state.avatar}
                                    onChange={(event) => this.setState({avatar: event.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleBirthdate">Birthdate</Label>
                                <Input 
                                    type="date" 
                                    name="birthdate" 
                                    id="exampleBirthdate" 
                                    value={this.state.birthdate}
                                    onChange={(event) => this.setState({birthdate: event.target.value})} />
                            </FormGroup>
                            <Button color="primary" className="mb-3">Register</Button>
                            <br />
                            <div className="dont-have-account">Already have an account? <NavLink to="/login">Login Now</NavLink></div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error != null,
        registerSuccess: state.registerSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (name, email, password, c_password, avatar, birthdate) => dispatch(actions.registerAuth(name, email, password, c_password, avatar, birthdate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);