import React, { Component } from 'react';
import Bar from './Bar';
import Page from './Page';
import UserManagement from './account/UserManagement';
import { Container, Row, Col } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    const initialUser = localStorage.getItem('user');
    this.state = {user: initialUser ? JSON.parse(initialUser) : null};
    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    if (user) {
      delete user.password;
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    this.setState({user: user});
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Bar />
          </Col>
          <Col>
           <UserManagement user={this.state.user} setUser={this.setUser}/>
          </Col>
        </Row>
        <Row>
          <Page user={this.state.user}/>
        </Row>
      </Container>
    );
  }
}

export default App;
