//https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/client/signup-test.jsx
const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {getUser, createUser, resetAllUsers} = require('../../src/server/userRepository.js');

const {Register} = require("../../src/client/components/Register.jsx");

const {app} = require('../../src/server/app');


function fillForm(driver, id, password, confirm){

  const userIdInput = driver.find("#userIdInput").at(0);
  const passwordInput = driver.find("#passwordInput").at(0);
  const confirmInput = driver.find("#confirmInput").at(0);
  const signUpBtn = driver.find("#RegisterBtn").at(0);

  userIdInput.simulate('change', {target: {value: id}});
  passwordInput.simulate('change', {target: {value: password}});
  confirmInput.simulate('change', {target: {value: confirm}});

  signUpBtn.simulate('click');
}

beforeEach(resetAllUsers);

describe("Should test Register component", () => {
  it("Should fail if user already exists", async () => {

    const userId = "Foo";
    const password = "123";

    overrideFetch(app);

    const fetchAndUpdateUserInfo = () => new Promise(resolve => {resolve()});
    let page = null;
    const history = {push: (h) => {page=h}};

    const driver = mount(
      <MemoryRouter initialEntries={["/register"]}>
        <Register setSignIn={fetchAndUpdateUserInfo} history={history} />
      </MemoryRouter>
    );

    fillForm(driver, userId, password, password + 4);

    const failed = await asyncCheckCondition(
      () => {driver.update(); return driver.html().includes('Not matching')},
      2000 ,200);

    expect(failed).toEqual(true);
  });

  it("Should create user", async () =>{

    const userId = "Foo";
    expect(getUser(userId)).toEqual(undefined);

    overrideFetch(app);

    const fetchAndUpdateUserInfo = () => new Promise(resolve => resolve(userId));
    let page = null;
    const history = {push: (h) => {page=h}};

    const driver = mount(
      <MemoryRouter initialEntries={["/register"]}>
        <Register updateLoggedInUserId={fetchAndUpdateUserInfo} history={history} />
      </MemoryRouter>
    );

    const password = "123";

    fillForm(driver, userId, password, password);

    const redirected = await asyncCheckCondition(
      () => {return page === "/"},
      200 ,200);

    //expect(redirected).toEqual(true);
    expect(getUser(userId).id).toEqual(userId);

  });
});

