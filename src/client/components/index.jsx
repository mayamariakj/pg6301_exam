import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './login.jsx';
import Register from './register.jsx';
import Home from "./home.jsx";
import Header from "./Header.jsx";
import NotFound from "./NotFound.jsx";
import Profile from "./profile.jsx";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
    };
  }
  componentDidMount() {
    this.getUserData();
  }
  getUserData = async () => {

    const response = await fetch("/api/user",{
      method: "get",
      credentials: "include"
    });
    if (response.status === 200) {
      const payload = await response.json();
      this.updateLoggedInUserId(payload.userId);
    }

  };

  updateLoggedInUserId = (userId) => {
    this.setState({ userId: userId });
  };

  render() {

    return (
      <div>
        <Router>
          <Header
            userId={this.state.userId}
            updateLoggedInUserId={this.updateLoggedInUserId} />
          <Switch>
            <Route
              path="/login"
              exact
              render={props =>
                <Login
                  {...props}
                  userId={this.state.userId}
                updateLoggedInUserId={this.updateLoggedInUserId}
                />}
            />
            <Route
              path="/register"
              exact
              render={props =>
                <Register
                  {...props}
                userId={this.state.userId}
                updateLoggedInuserId={this.updateLoggedInUserId}/>}
            />
            <Route
              exact={true}
              path="/"
              render={props =>
                <Home
                  {...props}
                  userId={this.state.userId}
                  updateLoggedInuserId={this.updateLoggedInUserId}/>}
            />
            <Route
              exact={true}
              path="/profile"
              render={props =>
                <Profile
                  {...props}
                  userId={this.state.userId}
                  updateLoggedInuserId={this.updateLoggedInUserId}/>}
            />
            <Route component={NotFound} />

          </Switch>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
