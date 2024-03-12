import React from "react";
import "./styles.css";

const Modal = ({ title, content, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-content">{content}</div>
      </div>
    </div>
  );
};

export default Modal;
