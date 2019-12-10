/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './CreateUser.scss';

import * as USER_ACTIONS from '../../../store/actions/userActions';

import UserForm from '../UserForm';

/**
 * Handles creating new users.
 * @class
 * @extends Component
 */
class CreateUser extends Component {

    /**
     * Handles form submit.
     * @method
     * @param {Object} data - an object with user data
     */
    handleSubmit = (data) => {
        this.props.createUser({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            status: data.status,
            role: data.role
        });
    }

    /**
     * Handles final modal ok and cancel.
     * @method
     * @param {integer} id - the user ID
     */
    handleModalClick = (id) => {
        this.props.clearUserCreate();
        this.props.history.push('/dashboard/users');
    }

    /**
     * Renders the component.
     * @method
     */
    render() {
        return (
            <div className="CreateUser">
                <div className="row">
                    <div className="col-12">
                        <div className="CreateUser__header-container">
                            <h3>Create User</h3>
                        </div>
                    </div>
                </div>
                <div className="CreateUser__main col-6 col-lg-4">
                    <UserForm
                        handleSubmit={this.handleSubmit}
                        handleModalOk={this.handleModalClick}
                        handleModalCancel={this.handleModalClick}
                        isSuccess={this.props.userCreated}
                        successMessage="User successfully created"
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userCreated: state.userReducer.userCreated
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createUser: (payload) => dispatch(USER_ACTIONS.createUser(payload)),
        clearUserCreate: () => dispatch(USER_ACTIONS.clearUserCreate())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
