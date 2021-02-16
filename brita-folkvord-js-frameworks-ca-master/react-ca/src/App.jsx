import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/home/home";
import Layout from "./components/layout/layout";

function App() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export default App;
