import React from "react";
import "./Modal.css";

const Modal = ({ children, onClose }) => {
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClose();
        }
    };

    return (
        <>
            <div className="modal-overlay" onClick={handleOverlayClick}>
                <div className="modal">
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Modal;
