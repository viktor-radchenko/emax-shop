import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";

import Loader from "../../components/loader";
import Message from "../../components/message";
import { getUserDetails, updateUserProfile } from "../../actions";

function ProfileScreen({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [validationError, setValidationError] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, error, loading } = userDetails;

  const userLogin = useSelector((state) => state.userInfo);
  const { userInfo } = userLogin;

  // redirect user in case he/she is logged in
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails(`profile`));
      } else {
        setFirstName(user.name);
        setEmail(user.email);
        setUsername(user.username);
      }
    }
  }, [dispatch, history, user, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
    } else {
      // dispatch(getUserDetails("profile"));
      dispatch(
        updateUserProfile({
          id: user._id,
          email: email,
          username: username,
          first_name: firstName,
          password: password,
        })
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
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
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update Profile
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
