import React from 'react';
import {withRouter} from 'react-router-dom';

export class Profile extends React.Component {

  state = {
    claimedPokemons: [],
  };

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async (profileId) => {
  const res = await fetch('/api/user/claimed');
  console.log(res);
  if(res.status === 200) {
    const json = await res.json();
    this.setState({claimedPokemons: json});
  }

};

  render(){

    const {userId} = this.props;
    const {claimedPokemons} = this.state;

    const displayList = userId && claimedPokemons.length;
    return (
      <div>
        <div className="container">
          <div className="row">
            { displayList ?
              claimedPokemons.map((pokemon, index) => {
                return (
                  <div className="col-sm-4" key={index}>
                    <div className="card" style={{width: "18rem"}}>
                      <img src={pokemon.image} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{pokemon.title}</h5>
                        <p className="card-text">{pokemon.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })
              : <h3>You don't have pokemons yet.</h3> }
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);