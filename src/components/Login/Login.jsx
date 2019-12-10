import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ScratchForm from '../ScratchForm';
import FormInput from '../FormInput';
import * as util from '../../util/commons';

import * as AUTHENTICATION_ACTIONS from '../../store/actions/authenticationActions';
import { login, isLoggedIn } from '../../util/authUtil';

import './Login.scss';

/**
 * Login component to handle user login.
 * @class
 * @extends Component
 */
class Login extends Component {

    /**
     * Constructor to inject props and initialize state.
     * @constructor
     * @param {Object} props Props
     */
    constructor(props) {
        super(props);

        this.state = {
            email: { value: '', isValid: true, message: '' },
            password: { value: '', isValid: true, message: '' },
            isFormValid: false
        };
    }

    /**
     * Lifecycle method to check authentication status and set title when component mounts.
     * @method
     */
    componentDidMount() {
        if (isLoggedIn()) {
            this.props.history.push('/dashboard');
        }

        document.title = 'ScratchPay Sign in';
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
     * Handles form submit and validates form data.
     * @method
     * @param {Object} event - an object with form event
     */
    handleSubmit = (event) => {
        event.preventDefault();

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

        if (!util.isValid(this.state.password.value) || this.state.password.value.length < 6) {
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

        this.props.authenticate({ email: this.state.email.value, password: this.state.password.value });
    };

    /**
     * Renders the component.
     * @method
     */
    render() {
        return (
            <div className="Login">
                <div className="Login__container">
                    <div className="Login__main col-6 col-lg-3 col-sm-4">
                        <ScratchForm handleSubmit={this.handleSubmit}>
                            <div className="Login__logo-container">
                                <img src="https://storage.googleapis.com/scratchpay-com-assets/challenges/paw_symbol.png" alt="Logo" />
                            </div>
                            {isLoggedIn() ? <Redirect to='dashboard' /> : <div />}
                            {!this.props.authentication.isAuthenticated ? <div className="error">{this.props.authentication.message}</div> : <div />}

                            <FormInput
                                type="email"
                                name="email"
                                placeholder="Email"
                                required={true}
                                onChange={this.handleChange}
                                value={this.state.email.value}
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
                                value={this.state.password.value}
                                message={this.state.password.message}
                                min={6}
                                id="password"
                            />

                            <div className="form-group Login__body__btn-container">
                                <button type="submit" className="Form__body__button btn">Login</button>
                            </div>
                        </ScratchForm>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let authentication = state.authenticationReducer.authentication || {};

    if (authentication.isAuthenticated) {
        login(authentication.user);
    }

    return {
        authentication: state.authenticationReducer.authentication
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authenticate: (payload) => dispatch(AUTHENTICATION_ACTIONS.authenticate(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
