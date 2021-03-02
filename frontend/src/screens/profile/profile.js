import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";

import Loader from "../../components/loader";
import Message from "../../components/message";
import { getUserDetails } from "../../actions";

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
      if (!user || user.name) {
        dispatch(getUserDetails(`profile`));
      } else {
        setFirstName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
    } else {
      // dispatch(getUserDetails("profile"));
      console.log("Updating profile");
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
