import React from 'react';

import logo from '../../assets/logo.png';

import { Container, Form } from './styles';

import CompareList from '../../components/CompareList';

const Main = () => (
  <Container>
    <img src={logo} alt="GitHub Compare" />
    <Form>
      <input type="text" placeholder="user/repository" />
      <button type="submit">Ok</button>
    </Form>

    <CompareList />
  </Container>
);

export default Main;
