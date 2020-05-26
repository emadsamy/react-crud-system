import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { Link } from 'react-router-dom';

const NavigationBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link to="/">Home</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              
            </NavItem>
          </Nav>
          <NavbarText style={{padding: "0"}}>
            <ul>
            <UncontrolledDropdown nav inNavbar className="float-right">
              <DropdownToggle nav caret className="text-capitalize">
              {props.authType.name}
              </DropdownToggle>
              <DropdownMenu style={{right: "0", left: "auto"}}>
                <DropdownItem>
                  <Link to="/profile">Profile</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/logout">Logout</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            </ul>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    authType: state.authType
  }
}

export default connect(mapStateToProps)(NavigationBar);