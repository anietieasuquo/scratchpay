/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './EditRole.scss';

import * as ROLE_ACTIONS from '../../../store/actions/roleActions';
import * as util from '../../../util/commons';
import RoleForm from '../RoleForm';

/**
 * Handles editing role.
 * @class
 * @extends Component
 */
class EditRole extends Component {
    
    /**
     * Constructor to inject props and initialize state.
     * @constructor
     * @param {Object} props Props
     */
    constructor(props) {
        super(props);

        this.state = {
            name: { value: '', isValid: true, message: '' },
            permissions: { value: [], isValid: true, message: '' }
        };
    }

    /**
     * Lifecycle method to fetch role when component mounts.
     * @method
     */
    componentDidMount() {
        const id = this.props.match.params.id;

        if (!util.isValid(id)) {
            this.props.history.push('/dashboard/roles');
            return;
        }

        this.props.getRole(id);
    }

    /**
     * Handles form submit.
     * @method
     * @param {Object} data - an object with role data
     */
    handleSubmit = (data) => {
        const id = this.props.match.params.id;
        this.props.updateRole({
            id: id,
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
            <div className="EditRole">
                <div className="row">
                    <div className="col-12">
                        <div className="EditRole__header-container">
                            <h3>Edit Role</h3>
                        </div>
                    </div>
                </div>
                <div className="EditRole__main col-6 col-lg-4">
                    <RoleForm
                        data={this.props.role}
                        handleSubmit={this.handleSubmit}
                        handleModalOk={this.handleModalClick}
                        handleModalCancel={this.handleModalClick}
                        isSuccess={this.props.roleUpdated}
                        successMessage="Role successfully updated"
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        roleUpdated: state.roleReducer.roleUpdated,
        role: state.roleReducer.role
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateRole: (payload) => dispatch(ROLE_ACTIONS.updateRole(payload)),
        getRole: (id) => dispatch(ROLE_ACTIONS.getRoleByID(id)),
        clearRoleCreate: () => dispatch(ROLE_ACTIONS.clearRoleCreate())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRole);
