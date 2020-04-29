import React from 'react';
import { NavLink, Link, } from 'react-router-dom';

export class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  doLogout = async () => {
    const url = '/api/logout';

    let response;

    try {
      response = await fetch(url, { method: 'post' });
    } catch (err) {
      console.log('Failed to connect to server: ' + err);
      return;
    }

    if (response.status !== 204) {
      console.log(
        'Error when connecting to server: status code ' + response.status
      );
      return;
    }

    this.props.updateLoggedInUserId(null);
    window.location.assign('/');
  };

  renderLoggedIn(userId) {
    return (
      <div className='header'>
        <h3 className='notLoggedInMsg'>Welcome User {userId}</h3>

        <div className='btnPart'>
        <div className='logout btn' onClick={this.doLogout} id='logoutBtnId'>
          Logout
        </div>
        <NavLink className='btn' to='/profile'>
          Profile
        </NavLink>
        </div>
      </div>
    );
  }

  renderNotLoggedIn() {
    return (
      <div className='header'>
        <div className='notLoggedInMsg'>Log in to claim</div>
        <div className='btnPart'>
          <NavLink className='btn' to='/login'>
            LogIn
          </NavLink>
          <NavLink className='btn' to='/register'>
            register
          </NavLink>
        </div>
      </div>
    );
  }

  render() {

    const {userId} = this.props;

    let content;
    if (!userId) {
      content = this.renderNotLoggedIn();
    } else {
      content = this.renderLoggedIn(userId);
    }

    return (
      <div className={'header'}>
        <Link className='home btn' to={'/'} id='homeLink'>
          <i className='fas fa-home'> </i>
        </Link>

        {content}
      </div>
    );
  }
}

export default Header;
