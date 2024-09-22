import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./Components/Redux/store";
import Web from "./Components/Routes/Web";
import useInterceptor from "./Components/Redux/interceptor";

function App() {
    useInterceptor(store);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Web />
                    <ToastContainer />
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
