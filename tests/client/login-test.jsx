/*https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/client/login-test.jsx */
const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {app} = require('../../src/server/app');

const {Login} = require('../../src/client/components/login.jsx');

function fillForm(driver, id, password){

  const userIdInput = driver.find("#userIdInput").at(0);
  const passwordInput = driver.find("#passwordInput").at(0);
  const loginBtn = driver.find("#loginBtn").at(0);

  userIdInput.simulate('change', {target: {value: id}});
  passwordInput.simulate('change', {target: {value: password}});

  loginBtn.simulate('click');
}


describe("Should test Login Component", () => {

it("Should test fail login", async () => {

  overrideFetch(app);

  const history = {goBack: () => {}};

  const driver = mount(
    <MemoryRouter initialEntries={["/login"]}>
      <Login history={history}/>
    </MemoryRouter>
  );

  fillForm(driver, "foo", "123");


  const error = await asyncCheckCondition(
    () => {driver.update(); return driver.html().includes("Invalid userId/password")},
    2000 ,200);

  expect(error).toEqual(true);
});
});
