import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./Components/Redux/store";
import Web from "./Components/Routes/Web";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Web />
        <ToastContainer />
      </Router>
    </Provider>
  );
}

export default App;
