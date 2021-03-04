import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";

import Loader from "../../components/loader";
import Message from "../../components/message";
import { register } from "../../actions";

import FormContainer from "../../components/form-container";

function RegisterScreen({ location, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [validationError, setValidationError] = useState(null);

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userInfo);
  const { userInfo, error, loading } = userRegister;

  // redirect user in case he/she is logged in
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
    } else {
      dispatch(register(email, password, username, firstName));
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      {validationError && <Message variant='danger'>{validationError}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              required
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              required
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='firstName'>
            <Form.Label>First name</Form.Label>
            <Form.Control
              type='text'
              required
              placeholder='First name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='password'
              required
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type='password'
              required
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            required Register
          </Button>
        </Form>
      )}

      <Row className='py-3'>
        <Col>
          Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Log in</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
