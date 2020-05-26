import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Posts.css';
import { Button } from 'reactstrap';
import ModalDelete from './Delete';
import ModalEdit from './Edit';

class Post extends Component {
 render() {
  return (
    <div className="posts">
        <div className="post-box">
          <div className="post-content">
            <div className="post-user">
              {this.props.userID === this.props.authType.id ? 
                  <Link className="text-capitalize" to="/profile">{this.props.user}</Link> : 
                  <Link className="text-capitalize" to={`/view_profile/${this.props.userID}`}>{this.props.user}</Link> }
            </div>
            <div className="post-text">{this.props.postText}</div>
          </div>
          {this.props.userID === this.props.authType.id ?
            <div className="post-tools">
              <ModalEdit buttonLabel="Edit" postID={this.props.postId} data={this.props.postText} />
              <ModalDelete buttonLabel="Delete" postID={this.props.postId}  />
            </div> : ""
          }
        </div>
    </div>
  );
 }
};

const mapStateToProps = state => {
  return {
    authType: state.authType
  };
}

export default connect(mapStateToProps)(Post);