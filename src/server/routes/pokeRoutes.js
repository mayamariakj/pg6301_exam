const {getPokemonsNotClaimedByTheUser} =  require("../pokemodRepository.js");

const pokeRepo = require('../pokemodRepository.js');
const userRepo = require('../userRepository.js');

module.exports = app => {
  app.get("/api/pokemons", (req, res) => {

    const allPokemons = pokeRepo.getAllPokemons();

    if (req.user) {
      const uniq = getPokemonsNotClaimedByTheUser(req.user.id);
      return res.status(200).json(uniq);
    }

    res.status(200).json(allPokemons);
  });

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
    res.header('location', '/api/pokemons/' + id);
    res.send();
  });

  app.post('/api/pokemons/:id/claim',(req, res) =>{
    const dto = req.body;
    const id = req.params['id'];
    const claimed = userRepo.addClaimed(dto.userId, id);

    if(claimed) {
      res.status(201).send()
    }else{
      res.status(400).send()
    }
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

  function ensureAuth(req, res, next) {

    /*console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login'); */
  }

};