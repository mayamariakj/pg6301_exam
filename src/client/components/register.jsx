/*https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/authentication/src/client/signup.jsx
 */


import React from 'react';
import { withRouter, BrowserRouter } from 'react-router-dom';

export class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      password: '',
      confirm: '',
      errorMsg: null,
    };
  }

  onUserIdChange = (event) => {
    this.setState({ userId: event.target.value, errorMsg: null });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value, errorMsg: null });
  };

  onConfirmChange = (event) => {
    this.setState({ confirm: event.target.value, errorMsg: null });
  };

  doRegister = async () => {
    const { userId, password, confirm } = this.state;

    if (confirm !== password) {
      this.setState({ errorMsg: 'Passwords do not match' });
      return;
    }

    const url = '/api/register';

    const payload = { userId: userId, password: password };

    let response;

    try {
      response = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      this.setState({ errorMsg: 'Failed to connect to server: ' + err });
      return;
    }

    if (response.status === 400) {
      this.setState({ errorMsg: 'Invalid userId/password' });
      return;
    }

    if (response.status !== 201) {
      this.setState({
        errorMsg:
          'Error when connecting to server: status code ' + response.status,
      });
      return;
    }

    this.setState({ errorMsg: null });
    this.props.updateLoggedInUserId(userId);
    this.props.history.push('/');
  };

  render() {
    let error = <div />;
    if (this.state.errorMsg) {
      error = (
        <div className='errorMsg'>
          <p>{this.state.errorMsg}</p>
        </div>
      );
    }

    let confirmMsg = 'Ok';
    if (this.state.confirm !== this.state.password) {
      confirmMsg = 'Not matching';
    }

    return (
      <div>
        <div className='registerArea'>
          <div>
            <p>Register a user name:</p>
            <input
              type='text'
              value={this.state.userId}
              onChange={this.onUserIdChange}
              id='userIdInput'
            />
          </div>
          <div>
            <p>Register a Password:</p>
            <input
              type='password'
              value={this.state.password}
              onChange={this.onPasswordChange}
              id='passwordInput'
            />
          </div>
          <div>
            <p>Confirm Password:</p>
            <input
              type='password'
              value={this.state.confirm}
              onChange={this.onConfirmChange}
              id='confirmInput'
            />
            <div>{confirmMsg}</div>
          </div>
          {error}
          <button className='btn' onClick={this.doRegister} id='RegisterBtn'>
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
