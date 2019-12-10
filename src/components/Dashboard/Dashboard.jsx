import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Header from './Header';
import PrivateRoute from '../../components/PrivateRoute';

import Users from './Users';
import Roles from './Roles';
import Logout from '../Logout';
import CreateUser from './CreateUser';
import EditUser from './EditUser';
import CreateRole from './CreateRole';
import EditRole from './EditRole';

import './Dashboard.scss';

import * as util from '../../util/commons';
import { getAuthUser } from '../../util/authUtil';

/**
 * Dashboard component.
 * @class
 * @extends Component
 */
class Dashboard extends Component {

    /**
     * Constructor to inject props and initialize state.
     * @constructor
     * @param {Object} props Props
     */
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };
    }

    /**
     * Lifecycle method to get authenticated user and set state when component mounts.
     * @method
     */
    componentDidMount() {
        const user = getAuthUser();

        if (util.isEmpty(user)) {
            this.props.history.push('/logout');
            return;
        }

        this.setState({ user });
    }

    /**
     * Renders the component.
     * @method
     */
    render() {
        return (
            <div className="Dashboard">
                <div className="Dashboard__container container">
                    <BrowserRouter>
                        <Header user={this.state.user} />
                        <div className="Dashboard__main">
                            <div className="Dashboard__main__content">
                                <Switch>
                                    <PrivateRoute path='/dashboard' exact={true} component={Users} />
                                    <PrivateRoute path='/dashboard/users' exact={true} component={Users} />
                                    <PrivateRoute path='/dashboard/users/create' exact={true} component={CreateUser} />
                                    <PrivateRoute path='/dashboard/users/:id/edit' exact={true} component={EditUser} />
                                    <PrivateRoute path='/dashboard/roles' exact={true} component={Roles} />
                                    <PrivateRoute path='/dashboard/roles/create' exact={true} component={CreateRole} />
                                    <PrivateRoute path='/dashboard/roles/:id/edit' exact={true} component={EditRole} />
                                    <PrivateRoute path='/logout' component={Logout} />
                                </Switch>
                            </div>
                        </div>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default Dashboard;
