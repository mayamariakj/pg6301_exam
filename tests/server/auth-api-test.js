const request = require('supertest');
const {app} = require('../../src/server/app.js');

let counter = 0;

async function logUserIn(){
  return await request(app)
    .post('/api/login')
    .send({userId: "Ben", password: 1234})
    .set({'Content-Type': 'application/json'});
}

describe("Testing application authentication", () => {
  it("Should test user failed login", async () => {
    const response = await logUserIn();

    expect(response.statusCode).toBe(401)
  });
//andrea sine -----------------------------------------------------
  test("Test fail access data of non-existent user", async () =>{

    const response = await request(app)
      .get('/api/user')

    expect(response.statusCode).toBe(401);
  });

  test("Test create user, but fail get data", async () =>{

    const userId = 'foo_' + (counter++);

    let response = await request(app)
      .post('/api/register')
      .send({userId, password:"bar"})
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(201);


    //no use of cookies here, so auth fails
    response = await request(app)
      .get('/api/user');

    expect(response.statusCode).toBe(401);
  });

  //andrea---------------------
  test("Test fail login", async () =>{

    const response = await request(app)
      .post('/api/login')
      .send({userId:'foo_' + (counter++), password:"bar"})
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(401);
  });

  test("Test fail access data of non-existent user", async () =>{

    const response = await request(app)
      .get('/api/user');

    expect(response.statusCode).toBe(401);
  });
  test("Test create user and get data", async () => {

    const userId = 'foo_' + (counter++);

    //use same cookie jar for the HTTP requests
    const agent = request.agent(app);

    let response = await agent
      .post('/api/register')
      .send({userId, password:"bar"})
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(201);


    //using same cookie got from previous HTTP call
    response = await agent.get('/api/user');

    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe(userId);
    //don't really want to return the password...
    expect(response.body.password).toBeUndefined();
  });




})