import React from 'react';
import{Link, withRouter } from 'react-router-dom';
import Header from "./Header";

export class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state ={
            userId: '',
            password: '',
            errorMsg: null,
        };
    }

    componentDidMount() {
        console.log(this.props, "Component is ready");
    }

    componentDidUpdate() {
        console.log("Component updated");
    }

    onUserIdChange =(event)=>{
        this.setState({userId: event.target.value});
    };

    onPasswordChange =(event)=> {
        this.setState({password: event.target.value});
    };
    doLogIn = async () => {
        const {userId, password } = this.state;

        const url = '/api/login';

        const payload ={ userId: userId, password: password };

        let response;

        try {
            response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
        } catch (err){
            this.setState({ errorMsg: 'Could not connect to server: ' + err});
            return;
        }

        if ( response.status === 401){
            this.setState({errorMsg: 'Invalid userId/password'}, () => {
                console.log(this.state.errorMsg);
            });
            return;
        }
        if (response.status !== 204){
            this.setState({
                errorMgs:
                'Error when connecting to server: status code ' + response.status,
            });
            return;
        }

        this.setState({errorMsg: null});
        this.props.updateLoggedInUserId(userId);
        this.props.history.push('/');
    };

    render(){

        return (
          <div>
              <div className ='signupArea'>
                <div>
                    <p>Username</p>
                    <input
                    type='text'
                    value={this.state.userId}
                    onChange={this.onUserIdChange}
                    id={'userIdInput'}
                    />
            </div>
                <div>
                    <p>Password:</p>
                    <input
                        type='password'
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                        id='passwordInput'
                    />
                </div>

                {this.state.errorMsg ? this.state.errorMsg : null}

                <div className='loginRegisterArea'>
                    <div className='btn' onClick={this.doLogIn} id='loginBtn'>
                        Log In
                    </div>

                    <div className='btn' onClick={this.props.history.goBack} id='loginBtn'>
                        Back
                    </div>

                    <button className='btn'>
                        <Link to={'/signup'}>Register</Link>
                    </button>
                </div>
            </div>
            </div>
        );
    }
}

export default withRouter(Login);

