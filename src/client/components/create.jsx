import React from 'react';
import Pokemon from './pokemon';

export class Create extends React.Component {
  constructor(props) {
    super(props);
  }

  onOk = async (title, description, value, pokemonId) => {
    const url = '/api/pokemon';

    const payload = { card, description, value };

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
      return false;
    }

    return response.status === 201;
  };

  render() {
    return (
      <div>
        <h3>Create a New Pokemon</h3>
        <Pokemon
          card={''}
          description={''}
          value={''}
          ok={'Create'}
          okCallback={this.onOk}
        />
      </div>
    );
  }
}
