import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './Modal.scss';

/**
 * Modal dialog component.
 * @param {Object} props Props
 */
const ModalDialog = (props) => (
    <div className="ModalDialog">
        <div className="ModalDialog__main">
            <Modal isOpen={props.show}>
                <ModalHeader>{props.title}</ModalHeader>
                <ModalBody>
                    {props.message}
                </ModalBody>
                <ModalFooter>
                    {props.showCancel ? <Button color="secondary" onClick={props.onCancel}>Cancel</Button> : <div />}
                    <Button color="primary" onClick={() => props.onOk(props.id)}>Ok</Button>
                </ModalFooter>
            </Modal>
        </div>
    </div>
);

export default ModalDialog;
