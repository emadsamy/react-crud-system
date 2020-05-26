import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import * as actions from '../../store/index';
// import Loader from '../../components/loader/Loader';
import NavigationBar from '../components/Navbar';
import ListGroup from '../components/ListGroupItems';
import './views.css';

class Profile extends Component {
    state = {
        testProfile: ""
    }
    componentDidMount() {
        document.title = `Welcome ${this.props.authType.email}`;
    }

    render() {
        const token = localStorage.getItem('token');
        let redirect = "";
        if (!token) {
            redirect = <Redirect to="/login" />
        }

        return (
            <div className="profile-container">
                {redirect}
                <NavigationBar />
                {this.state.testProfile}
                <div className="list-group-container">
                    <ListGroup
                        listGroupTitle="Profile Information"
                        profileDescription="profile information data..."
                        name={this.props.authType.name}
                        email={this.props.authType.email}
                        avatar={this.props.authType.avatar}
                        birthdate={this.props.authType.birthdate} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authType: state.authType
    }
}

export default connect(mapStateToProps)(Profile);