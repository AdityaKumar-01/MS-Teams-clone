import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";

setInterval(function() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}`);
}, 300000); // every 5 minutes (300000)

ReactDOM.render(<App />, document.getElementById("root"));
