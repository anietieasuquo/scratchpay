/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './CreateRole.scss';

import * as ROLE_ACTIONS from '../../../store/actions/roleActions';

import RoleForm from '../RoleForm';

/**
 * Handles creating new roles.
 * @class
 * @extends Component
 */
class CreateRole extends Component {

    /**
     * Handles form submit.
     * @method
     * @param {Object} data - an object with role data
     */
    handleSubmit = (data) => {
        this.props.createRole({
            name: data.name,
            permissions: data.permissions
        });
    }

    /**
     * Handles final modal ok and cancel.
     * @method
     * @param {integer} id - the role ID
     */
    handleModalClick = (id) => {
        this.props.clearRoleCreate();
        this.props.history.push('/dashboard/roles');
    }

    /**
     * Renders the component.
     * @method
     */
    render() {
        return (
            <div className="CreateRole">
                <div className="row">
                    <div className="col-12">
                        <div className="CreateRole__header-container">
                            <h3>Create Role</h3>
                        </div>
                    </div>
                </div>
                <div className="CreateRole__main col-6 col-lg-4">
                    <RoleForm
                        handleSubmit={this.handleSubmit}
                        handleModalOk={this.handleModalClick}
                        handleModalCancel={this.handleModalClick}
                        isSuccess={this.props.roleCreated}
                        successMessage="Role successfully created"
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        roleCreated: state.roleReducer.roleCreated
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createRole: (payload) => dispatch(ROLE_ACTIONS.createRole(payload)),
        clearRoleCreate: () => dispatch(ROLE_ACTIONS.clearRoleCreate())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRole);
