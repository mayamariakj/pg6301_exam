const pokeRepo = require('../pokemodRepository.js');

module.exports = app => {
  app.get("/api/pokemons", (req, res) => {
    const allPokemons = pokeRepo.getAllPokemons();
    res.status(200).json(allPokemons);
  })

  app.get('/api/pokemons/:id', (req, res) => {
    const pokemon = pokeRepo.getPokemon(req.params['id']);

    if(!pokemon){
      res.status(404).send();
    }else{
      res.status(200).json(pokemon);
    }
  })

  app.post('/api/pokemons', (req, res) => {
    const dto = req.body;

    const id = pokeRepo.createNewPokemon(dto.desc, dto.title, dto.value);

    res.status(201);
    res.header('location', '/api/recipes/' + id);
    res.send();
  });

  app.put('/api/pokemons/:id',(req, res) => {
    if(req.params.id !== req.body.id){
      res.status(409);
      res.send();
      return;
    }

    const {id, description, title, value} = req.body;

    const updated = pokeRepo.updatePokemon({id, description, title, value});

    if (updated){
      res.status(204);
    }else{
      res.status(404);
    }
    res.send();
  });

  app.delete('/api/pokemons/:id', (req, res) => {
    const deleted = pokeRepo.deletePokemionId(req.params.id);
    if (deleted) {
      res.status(204);
    }else{
      res.status(404);
    }
    res.send();
  });

};