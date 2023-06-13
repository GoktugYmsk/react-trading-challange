import React from 'react';

import Header from './components/header';
import SideBar from './components/sideBar';
import Content from './components/content';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <div className="App">
      <Row>
        <Col sm={12} md={12} lg={12} >
          <Header />
        </Col>
      </Row>
      <Row>
        <Col sm={4} md={4} lg={4} >
          <SideBar />
        </Col>
        <Col sm={8} md={8} lg={8} >
          <Content />
        </Col>
      </Row>
    </div>
  );
}

export default App;
