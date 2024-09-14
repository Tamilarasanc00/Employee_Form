import React, { useState } from 'react';
import Modal from 'react-modal';

const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Data Stored Successfully!</h2>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default SuccessModal;