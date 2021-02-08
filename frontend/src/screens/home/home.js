import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import Product from "../../components/product";
import { fetchProducts } from "../../services";

function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
    setLoading(false);
  }, []);

  if (loading) {
    return <h1>LOADING...</h1>;
  }

  if (error) {
    return <h1>Oops... Something went wrong. {error}. Please try again.</h1>;
  }

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomeScreen;
