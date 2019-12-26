import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from '../Login';
import Logout from '../Logout';
import Error403 from '../Error403';
import Dashboard from "../Dashboard";
import PrivateRoute from '../PrivateRoute';
import Loader from '../Loader';

import './App.scss';

/**
 * App Class
 * @class
 * @extends Component
 */
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <main className="App__main">
                        <Loader loading={this.props.loading} />
                        <Switch>
                            <Route path='/' exact={true} component={Login} />
                            <Route path='/login' component={Login} />
                            <Route path='/logout' component={Logout} />
                            <Route path='/403' component={Error403} />
                            <PrivateRoute path='/dashboard' component={Dashboard} />
                        </Switch>
                    </main>
                </div>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.appReducer.loading
    };
}

export default connect(mapStateToProps)(App);
