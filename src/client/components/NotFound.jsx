import React from 'react';
import {withRouter} from "react-router-dom";

export class NotFound extends React.Component {
  render() {
    return (
      <div>
        <p>This page does not exist</p>
      </div>
    );
  }
}

export default NotFound;