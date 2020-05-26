import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// import * as actions from '../../store/index';
// import Loader from '../../components/loader/Loader';
import NavigationBar from '../components/Navbar';
import ListGroup from '../components/ListGroupItems';
import './views.css';
import Loader from '../components/loader/Loader';

class Profile extends Component {
    state = {
        userVisitor: [],
        loadingUserData: true
    }
    componentDidMount() {
        document.title = `Welcome ${this.props.authType.email}`;
        axios.get('http://laravelblog77.herokuapp.com/api/v1/users/' + this.props.match.params.id)
            .then(res => {
                console.log(res.data.data);
                const data = res.data.data;
                this.setState({ userVisitor: data, loadingUserData: false });
            })
            .catch(err => {
                console.log(err);
                this.setState({ loadingUserData: false });
            })
        console.log(this.props.match.params.id);
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
                <div className="list-group-container">
                    {this.state.loadingUserData ? <div className="loading-overlay"><Loader /></div> : ""}
                    <ListGroup
                        listGroupTitle="Profile Information"
                        profileDescription="profile information data..."
                        name={this.state.userVisitor.name}
                        email={this.state.userVisitor.email}
                        avatar={this.state.userVisitor.avatar}
                        birthdate={this.state.userVisitor.birthdate} />
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