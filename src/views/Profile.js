import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavigationBar from '../components/Navbar';
import ListGroup from '../components/ListGroupItems';
import './views.css';
import Posts from '../components/posts/Post';
import axios from 'axios';

class Profile extends Component {
    state = {
        testProfile: "",
        userPosts: []
    }
    componentDidMount() {
        document.title = `Welcome ${this.props.authType.email}`;
        axios.get('https://laravelblog77.herokuapp.com/api/v1/posts_users/' + this.props.authType.id)
            .then((res) => {
                const data = res.data.data;
                console.log(data);
                console.log(res);
                console.log(this.props.authType.id);
                this.setState({ userPosts: data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const token = localStorage.getItem('token');
        let redirect = "";
        if (!token) {
            redirect = <Redirect to="/login" />
        }

        let posts = "";
        posts = this.state.userPosts.map((post, index) => {
            return <Posts
                    key={index} 
                    user={this.props.authType.name} 
                    postId={post.id}
                    userID={this.props.authType.id}
                    email={this.props.authType.email}
                    postText={post.post_content} />
        });

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
                    {posts}
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