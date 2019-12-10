import React from 'react';

import './ScratchForm.scss';

/**
 * Renders form.
 * @param {Object} props Props
 */
const ScratchForm = props => (
  <div className="Form">
    <form className="Form__body" onSubmit={props.handleSubmit}>
      {props.children}
    </form>
  </div>
);

export default ScratchForm;
