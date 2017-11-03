import React from 'react';
import LoginModal from './login_modal';

const ModalConductor = props => {
    switch (props.currentModal) {
        case 'SIGN_IN':
            return <LoginModal {...props}/>;
        default:
            return null;
    }
};
  
export default ModalConductor;