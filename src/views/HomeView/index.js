import React, { PropTypes } from 'react';
import { connect } from "react-redux";

export default class HomeView extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div> Redux </div>
    );
  }
}
