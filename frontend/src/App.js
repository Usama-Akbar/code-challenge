import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Form,
} from "react-router-dom";
import { Home } from "./pages/Home";
import MyForm from "./MyForm";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/MyForm/:id?" element={<MyForm />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
