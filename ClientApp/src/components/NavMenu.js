import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar  className="nav navbar-expand" dark>
          <Container>           
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="navele" to="/">about</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="navele" to="/github">github</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="navele" to="/reddit">reddit</NavLink>
                </NavItem>

              </ul>
          </Container>
        </Navbar>
      </header>
    );
  }
}
