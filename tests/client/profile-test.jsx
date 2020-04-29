/*
https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/client/home-test.jsx
 */

import {overrideFetch} from "../mytest-utils";

const React = require('react');
const {mount} = require('enzyme');
const {Profile} = require('../../src/client/components/profile.jsx');
const {app} = require('../../src/server/app.js');

const noPokemonText = "You don't have pokemons yet.";

describe('Should be testing the Profile Component', () => {
  it("Should include noPokemonText", async () => {

    overrideFetch(app);

    const html = mount(<Profile />).html();

    expect(html.includes(noPokemonText)).toEqual(true);
  });
});