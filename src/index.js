import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Rare } from "./components/Rare.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Rare />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
