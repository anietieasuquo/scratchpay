/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './UserForm.scss';

import * as ROLE_ACTIONS from '../../../store/actions/roleActions';
import * as util from '../../../util/commons';

import ScratchForm from '../../ScratchForm';
import FormInput from '../../FormInput';
import Modal from '../Modal';

/**
 * User form component for creating and updating users.
 * @class
 * @extends Component
 */
class UserForm extends Component {

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
     * Lifecycle method to fetch roles if it doesn't exist when component mounts.
     * @method
     */
    componentDidMount() {
        if (this.props.roles.length === 0) {
            this.props.getRoles();
        }

        this.setState({ ...this.state, ...this.props.data });
    }

    /**
     * Lifecycle method to update state when component is updated
     * @param {Object} prevProps Previous props
     * @method
     */
    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            const user = this.props.data;

            this.setState({
                ...this.state,
                firstName: { value: user.firstName, isValid: true, message: '' },
                lastName: { value: user.lastName, isValid: true, message: '' },
                email: { value: user.email, isValid: true, message: '' },
                password: { value: '', isValid: true, message: '' },
                confirmPassword: { value: '', isValid: true, message: '' },
                status: { value: user.status, isValid: true, message: '' },
                role: { value: !util.isEmpty(user.role) ? user.role.name : user.role, isValid: true, message: '' }
            });
        }
    }

    /**
     * Handles form submit and validates form data.
     * @method
     * @param {Object} event - an object with form event
     */
    handleSubmit = (event) => {
        event.preventDefault();

        if (!util.isValid(this.state.firstName.value)) {
            this.setState({
                ...this.state,
                firstName: {
                    value: this.state.firstName.value,
                    isValid: false,
                    message: 'First name is required'
                }
            });
            return;
        }

        if (!util.isValid(this.state.lastName.value)) {
            this.setState({
                ...this.state,
                lastName: {
                    value: this.state.lastName.value,
                    isValid: false,
                    message: 'Last name is required'
                }
            });
            return;
        }

        if (!util.isValidEmail(this.state.email.value)) {
            this.setState({
                ...this.state,
                email: {
                    value: this.state.email.value,
                    isValid: false,
                    message: 'Valid email is required: ex@abc.xyz'
                }
            });
            return;
        }

        if (!util.isValid(this.state.password.value) || this.state.password.value.length < 3) {
            this.setState({
                ...this.state,
                password: {
                    value: this.state.password.value,
                    isValid: false,
                    message: 'Valid password is required: 6 chars & above'
                }
            });

            return;
        }

        if (!util.isValid(this.state.confirmPassword.value) || this.state.confirmPassword.value.length < 3) {
            this.setState({
                ...this.state,
                confirmPassword: {
                    value: this.state.confirmPassword.value,
                    isValid: false,
                    message: 'Valid password is required: 6 chars & above'
                }
            });

            return;
        }

        if (this.state.confirmPassword.value !== this.state.password.value) {
            this.setState({
                ...this.state,
                confirmPassword: {
                    value: this.state.confirmPassword.value,
                    isValid: false,
                    message: 'Confirm password must be same as password'
                }
            });

            return;
        }

        this.props.handleSubmit({
            firstName: this.state.firstName.value,
            lastName: this.state.lastName.value,
            email: this.state.email.value,
            password: this.state.password.value,
            status: this.state.status.value,
            role: this.state.role.value
        });
    }

    /**
     * Handles form input change and makes initial input validation.
     * @method
     * @param {Object} event - an object with input event
     */
    handleChange = (event) => {
        var isValid = event.target.name === 'email'
            ? util.isValidEmail(event.target.value)
            : util.isValid(event.target.value) && event.target.value.length >= event.target.min;

        this.setState({
            ...this.state,
            [event.target.name]: {
                value: event.target.value,
                isValid: isValid,
                message: !isValid ? 'Invalid' : ''
            }
        });
    }

    /**
     * Renders the component.
     * @method
     */
    render() {
        return (
            <div className="UserForm">
                <div className="UserForm__main">
                    <Modal
                        show={this.props.isSuccess}
                        message={this.props.successMessage}
                        title="Success"
                        id={null}
                        onOk={this.props.handleModalOk}
                        onCancel={this.props.handleModalCancel}
                    />
                    <ScratchForm handleSubmit={this.handleSubmit}>
                        {this.props.error !== '' ? <div className="error">{this.props.error}</div> : <div />}

                        <FormInput
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            required={true}
                            onChange={this.handleChange}
                            value={this.state.firstName.value || ''}
                            message={this.state.firstName.message}
                            min={2}
                            id="firstName"
                        />

                        <FormInput
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            required={true}
                            onChange={this.handleChange}
                            value={this.state.lastName.value || ''}
                            message={this.state.lastName.message}
                            min={2}
                            id="lastName"
                        />

                        <FormInput
                            type="email"
                            name="email"
                            placeholder="Email"
                            required={true}
                            onChange={this.handleChange}
                            value={this.state.email.value || ''}
                            message={this.state.email.message}
                            min={6}
                            id="email"
                        />

                        <FormInput
                            type="password"
                            name="password"
                            placeholder="Password"
                            required={true}
                            onChange={this.handleChange}
                            value={this.state.password.value || ''}
                            message={this.state.password.message}
                            min={6}
                            id="password"
                        />

                        <FormInput
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            required={true}
                            onChange={this.handleChange}
                            value={this.state.confirmPassword.value || ''}
                            message={this.state.confirmPassword.message}
                            min={5}
                            id="confirmPassword"
                        />

                        <div className="form-group">
                            <label htmlFor="userStatus">Status</label>
                            <select value={this.state.status.value} className="form-control" id="userStatus" name="status" onChange={this.handleChange}>
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="userRole">Role</label>
                            <select value={this.state.role.value} className="form-control" id="userRole" name="role" onChange={this.handleChange}>
                                {
                                    this.props.roles.map((role, k) => (
                                        <option value={role.name} key={role.name}>{role.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="Form__body__button btn">Submit</button>
                        </div>
                    </ScratchForm>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        error: state.userReducer.error,
        roles: state.roleReducer.roles || []
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getRoles: () => dispatch(ROLE_ACTIONS.getAllRoles())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
