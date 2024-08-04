import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./Components/Redux/store";
import Web from "./Components/Routs/Web";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Web />
      </Router>
    </Provider>
  );
}

export default App;
