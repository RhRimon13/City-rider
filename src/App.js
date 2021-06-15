import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Destination from "./Component/Destination/Destination";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import Blog from "./Component/Blog/Blog";
import Contact from "./Component/Contact/Contact"
import Header from "./Component/Header/Header";
import PrivateRoute from "./Component/Transport/PrivateRoute/PrivateRoute";
import 'bootstrap/dist/css/bootstrap.min.css';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/destination/:transportId">
            <Destination />
          </PrivateRoute>
          <PrivateRoute path="/blog">
            <Blog />
          </PrivateRoute>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
