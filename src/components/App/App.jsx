import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from '../Login';
import Logout from '../Logout';
import Dashboard from "../Dashboard";
import PrivateRoute from '../PrivateRoute';

import './App.scss';

/**
 * Main App component
 * @exports App
 */
const App = () => (
    <BrowserRouter>
        <div className="App">
            <main className="App__main">
                <Switch>
                    <Route path='/' exact={true} component={Login} />
                    <Route path='/login' component={Login} />
                    <Route path='/logout' component={Logout} />
                    <PrivateRoute path='/dashboard' component={Dashboard} />
                </Switch>
            </main>
        </div>
    </BrowserRouter>
);

export default App;
