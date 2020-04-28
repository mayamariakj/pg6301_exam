import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './login.jsx';
import Register from './register.jsx';
import Create from './create';
import Edit from './create'
import Home from "./home.jsx";
import Header from "./Header.jsx";
import NotFound from "./NotFound.jsx";

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


        <p>{!this.state.userId ? "Sjokoladekake" : this.state.userId}</p>

        <Router>
          <Header
            userId={this.props.userId}
            updateLoggedInUser={this.props.updateLoggedInuserId} />
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
            <Route component={NotFound} />

            <Route exact path='/create' component={Create}/>
            <Route exact path='/edit' component={Edit}/>
          </Switch>
        </Router>
      </div>
      /*
      <Router>
        <div>
          <Switch>
            <Route
              exact
              path='/login'
              render={(props) => (
                <Login
                  {...props}
                  userId={this.state.userId}
                  updateLoggedInUserId={this.updateLoggedInUserId}
                />
              )}
            />
            <Route
              exact
              path='/signup'
              render={(props) => (
                <SignUp
                  {...props}
                  userId={this.state.userId}
                  updateLoggedInUserId={this.updateLoggedInUserId}
                />
              )}
            />
            <Route exact path='/create' component={Create} />
            <Route exact path='/edit' component={Edit} />
            <Route
              exact
              path='/'
              render={(props) => (
                <Home
                  {...props}
                  userId={this.state.userId}
                  updateLoggedInUserId={this.updateLoggedInUserId}
                />
              )}
            />
            <Route
              exact
              path='/chat'
              render={(props) => (
                <Chat
                  {...props}
                  userId={this.state.userId}
                  updateLoggedInUserId={this.updateLoggedInUserId}
                />
              )}
            />

            <Route component={NotFound} />
          </Switch>
        </div>
      </Router> */
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
