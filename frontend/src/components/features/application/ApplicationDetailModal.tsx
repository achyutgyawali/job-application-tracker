import React from 'react';
import type { Application } from '../../../types';

interface ApplicationDetailModalProps {
  isOpen: boolean;
  application: Application | null;
  onClose: () => void;
}

const statusBadgeClass: Record<string, string> = {
  Applied: 'badge badge-applied',
  Interviewing: 'badge badge-interviewing',
  Offer: 'badge badge-offer',
  Rejected: 'badge badge-rejected',
};

export const ApplicationDetailModal: React.FC<ApplicationDetailModalProps> = ({
  isOpen,
  application,
  onClose,
}) => {
  if (!isOpen || !application) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content card" style={{ maxWidth: '500px' }}>
        <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '16px' }}>
          Application Details
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gray-500)', fontWeight: 600 }}>
              Company Name
            </span>
            <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--gray-900)' }}>
              {application.company_name}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gray-500)', fontWeight: 600 }}>
              Job Title
            </span>
            <div style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--gray-800)' }}>
              {application.job_title}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gray-500)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Job Type
              </span>
              <span className="badge" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--gray-800)' }}>
                {application.job_type}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gray-500)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Status
              </span>
              <span className={statusBadgeClass[application.status] || 'badge'}>
                {application.status}
              </span>
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gray-500)', fontWeight: 600 }}>
              Applied Date
            </span>
            <div style={{ color: 'var(--gray-800)' }}>
              {new Date(application.applied_date).toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gray-500)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Notes
            </span>
            <div 
              style={{ 
                padding: '12px', 
                backgroundColor: 'var(--gray-50)', 
                borderRadius: '6px', 
                border: '1px solid var(--border)',
                color: 'var(--gray-700)',
                fontSize: '0.9rem',
                minHeight: '60px',
                whiteSpace: 'pre-wrap',
                maxHeight: '150px',
                overflowY: 'auto',
              }}
            >
              {application.notes || 'No notes provided.'}
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary btn-modal" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
