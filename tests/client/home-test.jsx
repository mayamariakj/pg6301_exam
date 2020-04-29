/*
  https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/client/home-test.jsx
  i have looked at your tests and modified them to my code
*/

import {overrideFetch, asyncCheckCondition} from "../mytest-utils";
import {MemoryRouter} from "react-router-dom";

const React = require('react');
const {mount} = require('enzyme');
const {Home} = require('../../src/client/components/home.jsx');
const {app} = require('../../src/server/app.js');

const claimText = "Claim";

describe('Should be testing the Home Component', () => {
  it("Should not include claim button text", async () => {

    overrideFetch(app);

    const html = mount(<Home />).html();

    expect(!html.includes(claimText)).toEqual(true);
  });
});