import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import { useAuth0 } from "./react-auth0-spa";

import AllEvents from "./views/AllEvents";
import InternetEvents from "./views/InternetEvents";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";

initFontAwesome();

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-3">
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/allEvents" component={AllEvents} />
            <PrivateRoute path="/internetEvents" component={InternetEvents} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
