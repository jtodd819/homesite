import React, { Component } from 'react';
import Bar from './Bar';
import Page from './Page';
import UserManagement from './account/UserManagement';
import { Container, Row, Col } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {user: null};
  }

  setUser(user) {
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
           <UserManagement setUser={this.setUser}/>
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
