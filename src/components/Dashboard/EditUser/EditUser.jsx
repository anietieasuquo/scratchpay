/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './EditUser.scss';

import * as USER_ACTIONS from '../../../store/actions/userActions';
import * as util from '../../../util/commons';
import UserForm from '../UserForm';

/**
 * Handles editing user.
 * @class
 * @extends Component
 */
class EditUser extends Component {

    /**
     * Constructor to inject props and initialize state.
     * @constructor
     * @param {Object} props Props
     */
    constructor(props) {
        super(props);

        this.state = {
            firstName: { value: '', isValid: true, message: '' },
            lastName: { value: '', isValid: true, message: '' },
            email: { value: '', isValid: true, message: '' },
            password: { value: '', isValid: true, message: '' },
            confirmPassword: { value: '', isValid: true, message: '' },
            status: { value: 'ACTIVE', isValid: true, message: '' },
            role: { value: 'ADMIN', isValid: true, message: '' }
        };
    }

    /**
     * Lifecycle method to fetch user when component mounts.
     * @method
     */
    componentDidMount() {
        const id = this.props.match.params.id;

        if (!util.isValid(id)) {
            this.props.history.push('/dashboard/users');
            return;
        }

        this.props.getUser(id);
    }

    /**
     * Handles form submit.
     * @method
     * @param {Object} data - an object with user data
     */
    handleSubmit = (data) => {
        const id = this.props.match.params.id;
        this.props.updateUser({
            id: id,
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
            <div className="EditUser">
                <div className="row">
                    <div className="col-12">
                        <div className="EditUser__header-container">
                            <h3>Edit User</h3>
                        </div>
                    </div>
                </div>
                <div className="EditUser__main col-6 col-lg-4">
                    <UserForm
                        data={this.props.user}
                        handleSubmit={this.handleSubmit}
                        handleModalOk={this.handleModalClick}
                        handleModalCancel={this.handleModalClick}
                        isSuccess={this.props.userUpdated}
                        successMessage="User successfully updated"
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userUpdated: state.userReducer.userUpdated,
        user: state.userReducer.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateUser: (payload) => dispatch(USER_ACTIONS.updateUser(payload)),
        getUser: (id) => dispatch(USER_ACTIONS.getUserById(id)),
        clearUserCreate: () => dispatch(USER_ACTIONS.clearUserCreate())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
