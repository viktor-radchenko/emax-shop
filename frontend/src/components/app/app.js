import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "../header";
import Footer from "../footer";

import HomeScreen from "../../screens/home";
import ProductScreen from "../../screens/product";

function App() {
  return (
    <Router>
      <Header />
      <main className='main py-5'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
