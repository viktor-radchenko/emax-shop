import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { listProductDetails } from "../../actions";
import Rating from "../../components/rating";
import Message from "../../components/message";
import Loader from "../../components/loader";

function ProductScreen({ match, history }) {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const addToCartHandler = (id) => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match.params.id, dispatch]);

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
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

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Col xs='auto' className='my-1'>
                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    onClick={() => addToCartHandler(product._id)}
                    disabled={product.countInStock === 0 ? true : false}>
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductScreen;
