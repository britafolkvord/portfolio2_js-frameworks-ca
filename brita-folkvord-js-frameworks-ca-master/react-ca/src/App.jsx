import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/home/home";
import Layout from "./components/layout/layout";
import Footer from './components/layout/Footer';

import "./App.css";

function App() {
  return (
    <>
    <Layout>
      <Home />
    </Layout>
    <Footer />
    </>
  );
}

export default App;
