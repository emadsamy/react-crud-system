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
import Posts from '../components/posts/Post';

class Profile extends Component {
    state = {
        userVisitor: [],
        loadingUserData: true,
        userPosts: []
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
            });

        axios.get('https://laravelblog77.herokuapp.com/api/v1/posts_users/' + this.props.match.params.id)
            .then(res => {
                const data = res.data.data;
                this.setState({ userPosts: data });
            })
            .catch(err => {
                console.log(err);
            });
        
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
                        { this.state.userPosts.map((post, index) => {
                        return <Posts 
                                key={index} 
                                user={this.state.userVisitor.name} 
                                postId={post.id}
                                userID={this.state.userVisitor.id}
                                email={this.state.userVisitor.email}
                                postText={post.post_content} />;
                        })}
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