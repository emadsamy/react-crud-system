import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import * as actions from '../../store/index';
import './UserAccount.css';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import Loader from '../../components/loader/Loader';

class Login extends Component {

    state = {
        email: "",
        password: ""
    }

    componentDidMount() {
        document.title = "Login";
    }

    onLoginUser = (e) => {
        e.preventDefault();
        this.props.onLogin(this.state.email, this.state.password);
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
                        {error}
                        <h2 className="mb-4">Login Now</h2>
                        <Form onSubmit={this.onLoginUser}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input 
                                    type="email" 
                                    name="email" 
                                    id="exampleEmail" 
                                    placeholder="Email"
                                    onChange={(event) => this.setState({email: event.target.value})} 
                                     />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input 
                                    type="password" 
                                    name="password" 
                                    id="examplePassword" 
                                    placeholder="Password"
                                    onChange={(event) => this.setState({password: event.target.value})} />
                            </FormGroup>
                            <Button color="primary" className="mb-3">Login</Button>
                            <br />
                            <div className="dont-have-account">Don't have an account? <NavLink to="/register">Register now</NavLink></div>
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
        loginSuccess: state.loginSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.loginAuth(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);