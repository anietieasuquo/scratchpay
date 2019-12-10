/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Users.scss';

import * as USER_ACTIONS from '../../../store/actions/userActions';
import * as util from '../../../util/commons';
import { getAuthUser } from '../../../util/authUtil';

import Modal from '../Modal';

/**
 * Component for listing roles.
 * @class
 * @extends Component
 */
class Users extends Component {

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
     * Lifecycle method to fetch users if it doesn't exist when component mounts.
     * @method
     */
    componentDidMount() {
        if (this.props.users.length === 0) {
            this.props.getUsers();
        }
    }

    /**
     * Handles user delete with confirmation.
     * @param {Object} event Click event
     * @param {Integer} id User ID
     * @method
     */
    handleDelete = (event, id) => {
        event.preventDefault();

        this.setState({
            modal: {
                show: true,
                id,
                message: 'Are you sure you want to delete this user?',
                title: 'Delete User'
            }
        });
    };

    /**
     * Handles user delete store update and hides confirmation modal.
     * @param {Integer} id User ID
     * @method
     */
    handleModalOk = (id) => {
        this.props.deleteUser(id);
        this.setState({
            modal: { show: false, id: null, message: '', title: '' }
        });

        const user = getAuthUser();

        if (parseInt(user.id) === parseInt(id)) {
            this.props.history.push('/logout');
        }
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
            <div className="Users">
                <div className="row">
                    <div className="col-9">
                        <div className="Users__header-container">
                            <h3>Users</h3>
                        </div>
                    </div>
                    <div className="col-3 text-right">
                        <Link to="/dashboard/users/create" className="btn btn-primary">Create User</Link>
                    </div>
                </div>
                <div className="Users__main">
                    <Modal {...this.state.modal} onOk={this.handleModalOk} onCancel={this.handleModalCancel} />
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Role</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                util.isValid(this.props.users) && this.props.users.length !== 0
                                    ? this.props.users.map((user, k) => (
                                        <tr key={user.id}>
                                            <td>{k + 1}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.status.toUpperCase()}</td>
                                            <td><Link to={`/dashboard/roles/${user.role.id}/edit`}>{user.role.name}</Link></td>
                                            <td>
                                                <span><Link to={`/dashboard/users/${user.id}/edit`}>Edit</Link></span>
                                                <span><a href="#" onClick={(event) => this.handleDelete(event, user.id)}>Delete</a></span>
                                            </td>
                                        </tr>
                                    )
                                    )
                                    : (<tr><td className="text-center" colSpan="7">No user to display</td></tr>)
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
        users: state.userReducer.users
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUsers: () => dispatch(USER_ACTIONS.getAllUsers()),
        deleteUser: (id) => dispatch(USER_ACTIONS.deleteUser(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
