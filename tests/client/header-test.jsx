//https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/client/headerbar-test.jsx
// i have looked at your tests and modified them to my code
const {overrideFetch, asyncCheckCondition} = require("../mytest-utils");

const React = require('react');
const {MemoryRouter} = require('react-router-dom');
const {mount} = require('enzyme');
const {Header} = require( "../../src/client/components/Header");
const {app} = require('../../src/server/app');

const notLoggedInMsg = "Log in to claim";

describe("Test Header Component", () => {
  it('should test Header containing buttons', () => {
    const userId = null;
    const updateLoggedInUser = () => {};

    const driver = mount(
      <MemoryRouter initialEntries={["/home"]}>
        <Header userId={userId} updateLoggedInUser={updateLoggedInUser} />
      </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(notLoggedInMsg)).toEqual(true);
  });

  it('Should test for logged in', () => {
    const userId = "Foo";
    const updateLoggedInUser = () => {};

    const driver = mount(
      <MemoryRouter initialEntries={["/home"]}>
        <Header userId={userId} updateLoggedInUser={updateLoggedInUser} />
      </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(notLoggedInMsg)).toEqual(false);
    expect(html.includes(userId)).toEqual(true);
  });

  it('Should test logout', async () => {
    overrideFetch(app);

    let userId = "Foo";
    const updateLoggedInUser = (id) => {userId = id};
    let page = null;
    const history = {push: (h) => {page=h}};

    const driver = mount(
      <MemoryRouter initialEntries={["/home"]}>
        <Header userId={userId} updateLoggedInUserId={updateLoggedInUser} history={history} />
      </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(userId)).toEqual(true);

    const logoutBtn = driver.find("#logoutBtnId").at(0);
    logoutBtn.simulate('click');

    const changed = await asyncCheckCondition(() => {
      driver.update();
      const displayed = driver.html().includes(userId);
      return !displayed;
    }, 2000, 200);
    expect(changed).toEqual(true);

    expect(userId).toEqual(null);
  })
});
