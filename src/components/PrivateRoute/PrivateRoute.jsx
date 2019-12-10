import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoggedIn } from '../../util/authUtil';

/**
 * Renders private/protected route for authenticated users. 
 * @param {Object} param Object params including component, cookie name
 */
const PrivateRoute = ({ component: Component, cookieName, ...rest }) => (
    <Route {...rest} render={props => (
        isLoggedIn() !== null ? (
            <Component {...props} />
        ) : (
                <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }}
                />
            )
    )} />
);

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(PrivateRoute);
