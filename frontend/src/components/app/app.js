import React from "react";

import { Container } from "react-bootstrap";

import Header from "../header";
import Footer from "../footer";

import Home from "../../screens/home";

function App() {
  return (
    <>
      <Header />
      <main className='main py-5'>
        <Container>
          <Home />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
