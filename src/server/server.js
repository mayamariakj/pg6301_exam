const { app } = require('./app');
const repository = require('./pokemodRepository.js');

const port = process.env.PORT || 8080;

app.listen(port, () => {
    repository.initWithSomePokemons();
    console.log('Started server on port ' + port);
});
