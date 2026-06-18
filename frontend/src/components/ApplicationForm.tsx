import { useState, useEffect } from 'react';
import type { Application } from '../types/application';
import { applicationService } from '../services/applicationService';

interface ApplicationFormProps {
  editData?: Application | null;
  onSave: () => void;
  onCancel: () => void;
}

export const ApplicationForm = ({ editData, onSave, onCancel }: ApplicationFormProps) => {
  const isEditMode = !!editData;

  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [status, setStatus] = useState('Applied');
  const [appliedDate, setAppliedDate] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  // Pre-fill the form when editing
  useEffect(() => {
    if (editData) {
      setCompanyName(editData.company_name);
      setJobTitle(editData.job_title);
      setJobType(editData.job_type);
      setStatus(editData.status);
      setAppliedDate(new Date(editData.applied_date).toISOString().split('T')[0]);
      setNotes(editData.notes || '');
    }
  }, [editData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      company_name: companyName,
      job_title: jobTitle,
      job_type: jobType,
      status,
      applied_date: new Date(appliedDate).toISOString(),
      notes: notes || null,
    };

    try {
      if (isEditMode && editData) {
        await applicationService.update(editData.id, payload);
      } else {
        await applicationService.create(payload as Omit<Application, 'id'>);
      }
      onSave();
    } catch (error) {
      console.error(error);
      alert('Failed to save the application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px' }}>
      <h2>{isEditMode ? 'Edit Application' : 'Add New Application'}</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label>Company Name *</label>
          <input required style={{ width: '100%', padding: '6px', marginTop: '4px' }}
            value={companyName} onChange={e => setCompanyName(e.target.value)} />
        </div>

        <div>
          <label>Job Title *</label>
          <input required style={{ width: '100%', padding: '6px', marginTop: '4px' }}
            value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
        </div>

        <div>
          <label>Job Type</label>
          <select style={{ width: '100%', padding: '6px', marginTop: '4px' }}
            value={jobType} onChange={e => setJobType(e.target.value)}>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        <div>
          <label>Status</label>
          <select style={{ width: '100%', padding: '6px', marginTop: '4px' }}
            value={status} onChange={e => setStatus(e.target.value)}>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label>Applied Date *</label>
          <input type="date" required style={{ width: '100%', padding: '6px', marginTop: '4px' }}
            value={appliedDate} onChange={e => setAppliedDate(e.target.value)} />
        </div>

        <div>
          <label>Notes</label>
          <textarea style={{ width: '100%', padding: '6px', marginTop: '4px', minHeight: '60px' }}
            value={notes} onChange={e => setNotes(e.target.value)} />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : isEditMode ? 'Update' : 'Save'}
          </button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};
