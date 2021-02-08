import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";

import { fetchProduct } from "../../services";
import Rating from "../../components/rating";

function ProductScreen({ match }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchProduct(match.params.id)
      .then((data) => setProduct(data))
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
    setLoading(false);
  }, [match.params.id]);

  if (loading) {
    return <h1>LOADING...</h1>;
  }

  if (error) {
    return <h1>Oops... Something went wrong. {error}. Please try again.</h1>;
  }

  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>{product.name}</ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#f8e825"} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Col>Price:</Col>
                <Col>
                  <strong>${product.price}</strong>
                </Col>
              </ListGroup.Item>
              <ListGroup.Item>
                <Col>Status:</Col>
                <Col>
                  <strong>{product.countInStock > 0 ? "In Stock" : "Out of stock"}</strong>
                </Col>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className='btn-block' type='button' disabled={product.countInStock === 0 ? true : false}>
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
