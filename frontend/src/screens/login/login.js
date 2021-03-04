import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";

import Loader from "../../components/loader";
import Message from "../../components/message";
import { login } from "../../actions";

import FormContainer from "../../components/form-container";

function LoginScreen({ location, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userInfo);
  const { userInfo, error, loading } = userLogin;

  // redirect user in case he/she is logged in
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Sign In
          </Button>
        </Form>
      )}

      <Row className='py-3'>
        <Col>
          New customer? <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register an account</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
