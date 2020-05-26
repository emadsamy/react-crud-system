import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './UserAccount.css';

class Logout extends Component {
    componentDidMount() {
        localStorage.clear();
        this.props.history.push('/login');
    }

    render() {
        const token = localStorage.getItem('token');
        let redirect = "";
        if (token) {
            localStorage.clear();
            redirect = <Redirect to="/login" />;
        }
        return redirect;
    }
}

export default Logout;