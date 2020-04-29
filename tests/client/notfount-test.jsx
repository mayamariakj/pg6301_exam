/*
  https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/client/home-test.jsx
  i have looked at your tests and modified them to my code
*/

import {overrideFetch} from "../mytest-utils";
import NotFound from "../../src/client/components/NotFound";

const React = require('react');
const {mount} = require('enzyme');
const {app} = require('../../src/server/app.js');

const notFoundText = "This page does not exist";

describe('Should be testing the Not Found Component', () => {
  it("Should include not exist text", async () => {

    overrideFetch(app);

    const html = mount(<NotFound />).html();

    expect(html.includes(notFoundText)).toEqual(true);
  });
});