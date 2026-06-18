import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Application } from '../types/application';
import { applicationService } from '../services/applicationService';

export const ApplicationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [status, setStatus] = useState('Applied');
  const [appliedDate, setAppliedDate] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Fetch existing data when editing
  useEffect(() => {
    if (id) {
      setFetching(true);
      applicationService.getById(id)
        .then((data: Application) => {
          setCompanyName(data.company_name);
          setJobTitle(data.job_title);
          setJobType(data.job_type);
          setStatus(data.status);
          setAppliedDate(new Date(data.applied_date).toISOString().split('T')[0]);
          setNotes(data.notes || '');
        })
        .catch(() => {
          alert('Application not found.');
          navigate('/');
        })
        .finally(() => setFetching(false));
    }
  }, [id]);

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
      if (isEditMode && id) {
        await applicationService.update(id, payload);
      } else {
        await applicationService.create(payload as Omit<Application, 'id'>);
      }
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Failed to save the application.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="card loading">Loading application data...</div>;
  }

  return (
    <div className="card">
      <h2 style={{ marginBottom: '20px' }}>
        {isEditMode ? 'Edit Application' : 'Add New Application'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Company Name *</label>
            <input required value={companyName} onChange={e => setCompanyName(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Job Title *</label>
            <input required value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Job Type</label>
            <select value={jobType} onChange={e => setJobType(e.target.value)}>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="form-group">
            <label>Applied Date *</label>
            <input type="date" required value={appliedDate} onChange={e => setAppliedDate(e.target.value)} />
          </div>

          <div className="form-group full-width">
            <label>Notes</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Optional notes..." />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : isEditMode ? 'Update Application' : 'Save Application'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
