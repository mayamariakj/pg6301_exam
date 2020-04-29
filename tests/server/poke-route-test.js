const request = require('supertest');
const {app} = require('../../src/server/app.js');
const pokeRepo = require('../../src/server/pokemodRepository.js');

beforeAll(() => {pokeRepo.initWithSomePokemons()});

async function logUserIn(){
  return await request(app)
    .post('/api/login')
    .send({userId: "Maya", password: "1234"})
    .set({'Content-Type': 'application/json'});
}


describe("Testing application authentication", () => {
  test("Test get all", async () => {

    const response = await request(app)
      .get('/api/pokemons');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(8);
  });
  test("Test retrieve each single pokemon", async () => {

    const responseAll = await request(app).get('/api/pokemons');
    expect(responseAll.statusCode).toBe(200);

    const pokemons = responseAll.body;
    expect(pokemons.length).toBe(8);

    for(let i=0; i<pokemons.length; i++){

      const res = await request(app).get('/api/pokemons/'+ i);
      const pokemon = res.body;

      expect(pokemon.title).toBe(pokemons[i].title)
    }
  });

  test("Test create pokemon", async () => {

    let responseAll = await request(app).get('/api/pokemons');
    const n = responseAll.body.length;

    const title = "foo";

    const resPost = await request(app)
      .post('/api/pokemons')
      .send({title:title, desc:"desc", value:"value"})
      .set('Content-Type', 'application/json');

    expect(resPost.statusCode).toBe(201);
    const location = resPost.header.location;



    //should had been increased by 1
    responseAll = await request(app).get('/api/pokemons');
    expect(responseAll.body.length).toBe(n + 1);

    const resGet = await request(app).get(location);
    expect(resGet.statusCode).toBe(200);
    expect(resGet.body.title).toBe(title);
  });

  test("Delete all pokemons", async () =>{

    let responseAll = await request(app).get('/api/pokemons');
    expect(responseAll.statusCode).toBe(200);

    const pokemons = responseAll.body;
    //Should be 9 because of previous test
    expect(pokemons.length).toBe(9);

    for(let i=0; i<pokemons.length; i++){

      const res = await request(app).delete('/api/pokemons/'+pokemons[i].id);
      expect(res.statusCode).toBe(204);
    }

    responseAll = await request(app).get('/api/pokemons');
    expect(responseAll.statusCode).toBe(200);
    expect(responseAll.body.length).toBe(0);
  });


});