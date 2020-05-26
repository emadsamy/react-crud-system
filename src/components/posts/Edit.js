import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Spinner } from 'reactstrap';
import axios from 'axios';

const ModalEdit = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [postVal, setPostVal] = useState(props.data);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const toggle = () => setModal(!modal);

  const editToggle = () => {
    setPostVal(props.data);
    setModal(!modal);
  }

  const editPost = () => {
    setLoadingUpdate(true);
    const data = {
        post_content: postVal
    }
    
    axios.put('http://laravelblog77.herokuapp.com/api/v1/posts/' + props.postID, data)
      .then(res => {
        console.log(res);
        setLoadingUpdate(false);
        setModal(!modal);
      })
      .catch(error => {
        setLoadingUpdate(false);
        console.log(error);
      });
  }

  return (
    <React.Fragment>
      <Button color="primary" onClick={editToggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>Edit Post</ModalBody>
        <Form style={{position: "relative"}}>
            {/* {this.state.success ? <Alert color="success">Post Added</Alert> : null}
            {this.state.error ? <Alert color="danger">have an error</Alert> : null} */}
            <FormGroup style={{ padding:" 0 15px"}}>
                <Input 
                    type="textarea" 
                    name="post_content" 
                    id="exampleText" 
                    onChange={(event) => setPostVal(event.target.value)} 
                    value={postVal} />      
            </FormGroup>
        </Form>
        <ModalFooter>
          <Button color="primary" onClick={editPost}>
              {loadingUpdate ? <Spinner size="sm" color="light" /> : ""} Update
          </Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default ModalEdit;