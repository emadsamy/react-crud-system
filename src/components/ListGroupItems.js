import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const listGroup = (props) => {
  const listStyle = {
    width: "80px",
    display: "inline-block"
  }
  return (
    <div>
      <h3>{props.listGroupTitle}</h3>
      <p>{props.profileDescription}</p>
      <ListGroup>
        <ListGroupItem active tag="a" href="#" action><span style={listStyle}>Name: </span> {props.name}</ListGroupItem>
        <ListGroupItem tag="a" href="#" action><span style={listStyle}>Email: </span> {props.email}</ListGroupItem>
        <ListGroupItem tag="a" href="#" action><span style={listStyle}>Avatar: </span> {props.avatar}</ListGroupItem>
        <ListGroupItem tag="a" href="#" action style={{wordWrap: "break-word"}}><span style={listStyle}>Birthdate: </span> {props.birthdate}</ListGroupItem>
      </ListGroup>
      <p />
    </div>
  );
}

export default listGroup;