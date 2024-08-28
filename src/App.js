import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { store } from "./Components/Redux/store";
import Web from "./Components/Routes/Web";
import useInterceptor from "./Components/Redux/interceptor";

function App() {
  useInterceptor(store);

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
