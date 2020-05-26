import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import axios from 'axios';

const ModalDelete = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggle = () => setModal(!modal);

  const deletePost = () => {
    setLoading(true);
    axios.delete('http://laravelblog77.herokuapp.com/api/v1/posts/' + props.postID)
      .then(res => {
        console.log(res);
        setModal(!modal);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <React.Fragment>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>Are Youe Sure To Delete This Post ?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deletePost}>{loading ? <Spinner size="sm" color="light" /> : ""} Delete</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default ModalDelete;