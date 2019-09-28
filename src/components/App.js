import '../App.css';
import React, {Component} from 'react';
import MapComponent from "./MapComponent";
import {INFO_PAGE, MAP_PAGE} from "../const/Constants";
import {Route,  BrowserRouter as Router, Switch} from "react-router-dom";
import Info from "./Info";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    {/*<Route exact path={LOGIN_PAGE_URL} component={Login}/>*/}
                    <Route exact path={INFO_PAGE} component={Info}/>
                    <Route path={MAP_PAGE} component={MapComponent}/>
                </Switch>
            </Router>
        );
    }
}

export default App;