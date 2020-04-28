const request = require('supertest');
const {app} = require('../../src/server/app.js');

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
//andrea sin
  test("Test fail access data of non-existent user", async () =>{

    const response = await request(app)
      .get('/api/user');

    expect(response.statusCode).toBe(401);
  });

  test("Test create user, but fail get data", async () =>{

    const userId = 'foo_' + (counter++);

    let response = await request(app)
      .post('/api/signup')
      .send({userId, password:"bar"})
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(201);


    //no use of cookies here, so auth fails
    response = await request(app)
      .get('/api/user');

    expect(response.statusCode).toBe(401);
  });


})