import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as AUTHENTICATION_ACTIONS from '../../store/actions/authenticationActions';
import {isLoggedIn} from '../../util/authUtil';

/**
 * Logout component to handle user logout.
 * @class
 * @extends Component
 */
class Logout extends Component {

    /**
     * Lifecycle method to check authentication status and perform logout when component mounts.
     * @method
     */
    componentDidMount() {
        if (isLoggedIn()) {
            this.props.logout();
        }

        window.location = "/";
    }

    /**
     * Renders the component.
     * @method
     */
    render() {
        return (
            <div></div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(AUTHENTICATION_ACTIONS.logout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
