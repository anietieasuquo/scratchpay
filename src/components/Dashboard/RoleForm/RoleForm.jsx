/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './RoleForm.scss';

import * as ROLE_ACTIONS from '../../../store/actions/roleActions';
import * as util from '../../../util/commons';

import ScratchForm from '../../ScratchForm';
import FormInput from '../../FormInput';
import Modal from '../Modal';

/**
 * Role form component for creating and updating roles.
 * @class
 * @extends Component
 */
class RoleForm extends Component {

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
            const role = this.props.data;

            this.setState({
                ...this.state,
                name: { value: role.name, isValid: true, message: '' },
                permissions: { value: role.permissions, isValid: true, message: '' }
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

        if (!util.isValid(this.state.name.value)) {
            this.setState({
                ...this.state,
                name: {
                    value: this.state.name.value,
                    isValid: false,
                    message: 'Name is required'
                }
            });
            return;
        }

        if (util.isEmpty(this.state.permissions.value)) {
            this.setState({
                ...this.state,
                permissions: {
                    value: this.state.permissions.value,
                    isValid: false,
                    message: 'Select at least one permission'
                }
            });
            return;
        }

        this.props.handleSubmit({
            name: this.state.name.value,
            permissions: this.state.permissions.value
        });
    }

    /**
     * Handles form input change and makes initial input validation.
     * @method
     * @param {Object} event - an object with input event
     */
    handleChange = (event) => {
        var isValid = event.target.name === 'name'
            ? util.isValid(event.target.value) && event.target.value.length >= event.target.min
            : event.target.value.length > 0;

        const permissions = new Set(this.state[event.target.name].value) || new Set();

        if (permissions.has(event.target.value)) {
            permissions.delete(event.target.value);
        } else {
            permissions.add(event.target.value);
        }

        this.setState({
            ...this.state,
            [event.target.name]: {
                value: event.target.type === 'checkbox' ? [...permissions] : event.target.value.toUpperCase(),
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
            <div className="RoleForm">
                <div className="RoleForm__main">
                    <Modal
                        show={this.props.isSuccess}
                        message={this.props.successMessage}
                        title="Success"
                        id={null}
                        onOk={this.props.handleModalOk}
                        showCancel={false}
                    />
                    <ScratchForm handleSubmit={this.handleSubmit}>
                        {this.props.error !== '' ? <div className="error">{this.props.error}</div> : <div />}

                        <FormInput
                            type="text"
                            name="name"
                            placeholder="Name"
                            required={true}
                            onChange={this.handleChange}
                            value={this.state.name.value || ''}
                            message={this.state.name.message}
                            min={3}
                            id="roleName"
                        />
                        <h5>Permissions:</h5>
                        <span className="help-block">{this.state.permissions.message}</span>

                        <div className="RoleForm__main__permissions" id="rolePermissions">
                            {
                                this.props.permissions.map((p, k) => (
                                    <FormInput
                                        type="checkbox"
                                        name="permissions"
                                        placeholder={p}
                                        onChange={this.handleChange}
                                        value={p || ''}
                                        message={this.state.name.message}
                                        checked={!util.isEmpty(this.state.permissions.value) && this.state.permissions.value.includes(p)}
                                        id={p}
                                        key={p}
                                    />
                                ))
                            }
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
    const roles = state.roleReducer.roles;
    let permissions = new Set();

    roles.forEach(r => {
        if (util.isValid(r.permissionString)) {
            r.permissionString.split(",").forEach(p => permissions.add(p));
        }
    });

    return {
        error: state.roleReducer.error,
        roles: state.roleReducer.roles,
        permissions: [...permissions]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getRoles: () => dispatch(ROLE_ACTIONS.getAllRoles())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleForm);
