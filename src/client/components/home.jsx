import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Login} from "./login";
import pokemon from "./pokemon";

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

  render() {
    const { pokemons } = this.state;
    const { userId } = this.props;

    return (
      <div>
        <p>Jeg er forsiden</p>
        <div className="container">
          <div className="row">
            {
              pokemons.map((pokemon, index) => {
                return (
                  <div className="col-sm-4" key={index} onClick={() => console.log(pokemon)}>
                    <div className="card" style={{width: "18rem"}}>
                      <img src={pokemon.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h5 className="card-title">{pokemon.title}</h5>
                          <p className="card-text">{pokemon.description}</p>
                          {userId ? <a href="#" className="btn btn-primary">Go somewhere</a> : null}
                        </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

      </div>
    )
  }
}

export default withRouter(Home);