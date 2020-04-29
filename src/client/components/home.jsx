import React from 'react';
import {Link, withRouter} from 'react-router-dom';

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: null,
      error: null,
      pokemons: [],
    };
  }

  componentDidMount() {
   this.fetchPokemons();

  }

  fetchPokemons = async () =>{
    const request = await fetch("/api/pokemons",{
      method: "get",
    });
    if (request.status === 200) {
      const response = await request.json();
      this.setState({pokemons: response});
    }
  };

  claimPokemon = async (id, index) => {
    const { pokemons } = this.state;
    const url = `/api/pokemons/${id}/claim`;
    const payload = JSON.stringify({userId: this.props.userId});

    const req = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload,
    });
    console.log(id);
    if (req.status === 201) {
      pokemons.splice(index, 1);
      this.setState({pokemons: pokemons});
    }

  };


  render() {
    const { pokemons } = this.state;
    const { userId } = this.props;

    console.log(userId);

    const displayList = pokemons.length;
    return (
      <div>
        <div className="container">
          <div className="row">
            {
              displayList ? pokemons.map((pokemon, index) => {
                return (
                  <div className="col-sm-4" key={index}>
                    <div className="card" style={{width: "18rem"}}>
                      <img src={pokemon.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h5 className="card-title">{pokemon.title}</h5>
                          <p className="card-text">{pokemon.description}</p>
                          {userId ? <button
                            className="btn"
                            onClick={() => this.claimPokemon(pokemon.id, index)}
                          >Claim</button> : null}
                        </div>
                    </div>
                  </div>
                )
              })
                : <h3>There are no pokemons to claim</h3> }
          </div>
        </div>

      </div>
    )
  }
}

export default withRouter(Home);