import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content card">
        <h3>{title}</h3>
        <p style={{ margin: '12px 0 20px 0', color: 'var(--gray-700)' }}>{message}</p>
        <div className="modal-actions">
          <button className="btn btn-danger btn-modal" onClick={onConfirm}>
            Delete
          </button>
          <button className="btn btn-secondary btn-modal" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
