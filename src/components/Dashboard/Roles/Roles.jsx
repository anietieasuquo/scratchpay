/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Roles.scss';

import * as ROLE_ACTIONS from '../../../store/actions/roleActions';
import * as util from '../../../util/commons';

import Modal from '../Modal';

/**
 * Component for listing roles.
 * @class
 * @extends Component
 */
class Roles extends Component {

    /**
     * Constructor to inject props and initialize state.
     * @constructor
     * @param {Object} props Props
     */
    constructor(props) {
        super(props);

        this.state = {
            modal: {
                show: false,
                id: null,
                message: '',
                title: ''
            }
        };
    }

    /**
     * Lifecycle method to fetch roles if it doesn't exist when component mounts.
     * @method
     */
    componentDidMount() {
        if (this.props.roles.length === 0) {
            this.props.getRoles();
        }
    }

    /**
     * Handles role delete with confirmation.
     * @param {Object} event Click event
     * @param {Integer} id Role ID
     * @method
     */
    handleDelete = (event, id) => {
        event.preventDefault();

        this.setState({
            modal: {
                show: true,
                id,
                message: 'Are you sure you want to delete this role?',
                title: 'Delete Role'
            }
        });
    };

    /**
     * Handles role delete store update and hides confirmation modal.
     * @param {Integer} id Role ID
     * @method
     */
    handleModalOk = (id) => {
        this.props.deleteRole(id);
        this.setState({
            modal: { show: false, id: null, message: '', title: '' }
        });
    };

    /**
     * Handles confirmation modal cancel button.
     * @method
     */
    handleModalCancel = () => {
        this.setState({
            modal: { show: false, id: null, message: '', title: '' }
        });
    };

    /**
     * Renders the component.
     * @method
     */
    render() {
        return (
            <div className="Roles">
                <div className="row">
                    <div className="col-9">
                        <div className="Roles__header-container">
                            <h3>Roles</h3>
                        </div>
                    </div>
                    <div className="col-3 text-right">
                        <Link to="/dashboard/roles/create" className="btn btn-primary">Create Role</Link>
                    </div>
                </div>
                <div className="Roles__main">
                    <Modal {...this.state.modal} onOk={this.handleModalOk} onCancel={this.handleModalCancel} />
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Permissions</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                util.isValid(this.props.roles) && this.props.roles.length !== 0
                                    ? this.props.roles.map((role, k) => (
                                        <tr key={role.id}>
                                            <td>{k + 1}</td>
                                            <td>{role.name}</td>
                                            <td>{role.permissionString}</td>
                                            <td>
                                                <span><Link to={`/dashboard/roles/${role.id}/edit`}>Edit</Link></span>
                                                <span><a href="#" onClick={(event) => this.handleDelete(event, role.id)}>Delete</a></span>
                                            </td>
                                        </tr>
                                    )
                                    )
                                    : (<tr><td className="text-center" colSpan="4">No role to display</td></tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        roles: state.roleReducer.roles
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getRoles: () => dispatch(ROLE_ACTIONS.getAllRoles()),
        deleteRole: (id) => dispatch(ROLE_ACTIONS.deleteRole(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
