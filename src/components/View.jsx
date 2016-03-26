import App from "./App";
import Preloader from "../elements/Preloader";
import React from "react";
export default class View extends React.Component {

  render() {
    return (
      <div>
        <Preloader />
        <App />
      </div>
    );
  }
}
