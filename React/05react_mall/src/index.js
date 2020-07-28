import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store/";
import { Provider } from "react-redux";

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root"),
  );
};
render();
// store.subscribe(render)
