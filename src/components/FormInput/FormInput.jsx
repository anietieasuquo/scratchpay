import React from 'react';
import classNames from 'classnames';
import './FormInput.scss';

/**
 * Form input component.
 * @param {Object} props Props
 */
const FormInput = props => (
    <div className="FormInput">
        <div className={classNames('form-group', { 'has-error': props.message !== '', 'form-check': props.type === 'checkbox' })}>
            <input className={classNames('FormInput__input', { 'form-control': props.type !== 'checkbox', 'form-check-input': props.type === 'checkbox' })} {...props} />
            {props.type === 'checkbox' ? <label className="form-check-label" htmlFor={props.id}>{props.placeholder}</label> : <span className="help-block">{props.message}</span>}
        </div>
    </div>
);

export default FormInput;
