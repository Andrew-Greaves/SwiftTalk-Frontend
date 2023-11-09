/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types';

function ContactDetailsModal({ contact,isVisible, onClose }) {
    return (
        <div className={`modal fade ${isVisible ? 'show' : ''}`} 
            style={{display: isVisible ? 'block' : 'none'}}
            tabIndex="-1" 
            aria-labelledby="contactDetailsModalLabel" 
            aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="contactDetailsModalLabel">Contact Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p><strong>Name:</strong> {contact.firstName} {contact.lastName}</p>
                        <p><strong>Username:</strong> {contact.userName}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

ContactDetailsModal.propTypes = {
    contact: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired
    }).isRequired,
    isVisible: PropTypes.bool.isRequired, 
    onClose: PropTypes.func.isRequired 
    
};

export default ContactDetailsModal