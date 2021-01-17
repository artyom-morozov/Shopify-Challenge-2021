import React from "react";
import { render } from "react-dom";
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import HomePage from './HomePage';
import CartPage from './CartPage';
import SellPage from './SellPage';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
function App(props) {
    return  <Grid  container direction="column">
                <Header />
                <Router>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/cart" component={CartPage}/>
                        <Route path="/sell" component={SellPage}/>
                    </Switch>
                </Router>
            </Grid>
        
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);