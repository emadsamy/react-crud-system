import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import NavigationBar from '../components/Navbar';
import Posts from '../components/posts/Post';
import { Form, FormGroup, Label, Input, Button, Alert, Spinner } from 'reactstrap';
import axios from 'axios';
import Loader from '../components/loader/Loader';
import * as actions from '../store/index';

class Home extends Component {
    constructor(props) {
        super(props);
        this.props.getPosts();
    }
    state = {
        post_content: "",
        post_image: "image.png",
        loading: false,
        success: false,
        error: false,
        addPostDisabled: true,
        posts: []
    }

    componentDidMount() {
        document.title = "Home";
        // this.props.getPosts();
        console.log(this.props.posts);
    }

    onPostHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const data = {
            post_content: this.state.post_content,
            post_image: this.state.post_image,
            post_user: this.props.authType.id
        };
        axios.post("http://laravelblog77.herokuapp.com/api/v1/posts", data)
            .then(res => {
                this.setState({loading: false, success: true, error: false, post_content: "", addPostDisabled: true});
                this.props.getPosts();
            })
            .catch(err => {
                this.setState({loading: false, success: false, error: true});
            });
    }

    onChangePostHandler = (event) => {
        if (event.target.value.length > 0) { this.setState({addPostDisabled: false}); }
        if (event.target.value.length === 0) { this.setState({addPostDisabled: true}); }
        this.setState({post_content: event.target.value});
    }

    render() {
        const token = localStorage.getItem('token');
        let redirect = "";
        if (!token) {
            redirect = <Redirect to="/login" />
        }

        let posts = "";
        posts = this.props.posts.map((post, index) => {
            return <Posts 
                        key={index} 
                        user={post.post_by_user.name} 
                        postId={post.id}
                        userID={post.post_by_user.id}
                        email={post.post_by_user.email}
                        postText={post.post_content} />;
        });

        // console.log(this.props.getPosts());
        return (
            <div className="home">
                <NavigationBar color="dark" dark />
                <div className="center-home">
                    {redirect}
                    <div className="create-post mb-4">
                        <Form onSubmit={this.onPostHandler} style={{position: "relative"}}>
                            {this.state.success ? <Alert color="success">Post Added</Alert> : null}
                            {this.state.error ? <Alert color="danger">have an error</Alert> : null}
                            <FormGroup>
                                <Label for="exampleText">Add New Post</Label>
                                <Input 
                                    type="textarea" 
                                    name="post_content" 
                                    id="exampleText" 
                                    onChange={(event) => this.onChangePostHandler(event)} 
                                    value={this.state.post_content} />      
                            </FormGroup>
                            <Button 
                                disabled={this.state.addPostDisabled} 
                                color="primary">{this.state.loading ? <Spinner size="sm" color="light" /> : ""} Add Post
                            </Button>
                        </Form>
                    </div>

                    <div className="post-view">
                        {this.props.postsLoading ? <div className="posts-loading"><Loader /></div> : null}
                        {
                            this.props.posts.map((post, index) => {
                                return <Posts 
                                            key={index} 
                                            user={post.post_by_user.name} 
                                            postId={post.id}
                                            userID={post.post_by_user.id}
                                            email={post.post_by_user.email}
                                            postText={post.post_content} />;
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authType: state.authType,
        posts: state.posts,
        postsLoading: state.postsLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPosts: () => dispatch(actions.postsGet())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
