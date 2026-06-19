import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { Application } from '../types/application';
import { applicationService } from '../services/applicationService';
import {
  validateCompanyName,
  validateJobTitle,
  validateJobType,
  validateStatus,
  validateAppliedDate,
} from '../utils/validation';

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

  // Validation errors state
  const [errors, setErrors] = useState<{
    companyName?: string;
    jobTitle?: string;
    jobType?: string;
    status?: string;
    appliedDate?: string;
  }>({});

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
          toast.error('Application not found.');
          navigate('/');
        })
        .finally(() => setFetching(false));
    }
  }, [id, navigate]);

  // Spontaneous Event Handlers
  const handleCompanyNameChange = (val: string) => {
    setCompanyName(val);
    const err = validateCompanyName(val);
    setErrors(prev => ({ ...prev, companyName: err }));
  };

  const handleJobTitleChange = (val: string) => {
    setJobTitle(val);
    const err = validateJobTitle(val);
    setErrors(prev => ({ ...prev, jobTitle: err }));
  };

  const handleJobTypeChange = (val: string) => {
    setJobType(val);
    const err = validateJobType(val);
    setErrors(prev => ({ ...prev, jobType: err }));
  };

  const handleStatusChange = (val: string) => {
    setStatus(val);
    const err = validateStatus(val);
    setErrors(prev => ({ ...prev, status: err }));
  };

  const handleAppliedDateChange = (val: string) => {
    setAppliedDate(val);
    const err = validateAppliedDate(val);
    setErrors(prev => ({ ...prev, appliedDate: err }));
  };

  // Bulk validate on form submit
  const validateForm = (): boolean => {
    const companyNameErr = validateCompanyName(companyName);
    const jobTitleErr = validateJobTitle(jobTitle);
    const jobTypeErr = validateJobType(jobType);
    const statusErr = validateStatus(status);
    const appliedDateErr = validateAppliedDate(appliedDate);

    const newErrors = {
      companyName: companyNameErr,
      jobTitle: jobTitleErr,
      jobType: jobTypeErr,
      status: statusErr,
      appliedDate: appliedDateErr,
    };

    setErrors(newErrors);

    return !companyNameErr && !jobTitleErr && !jobTypeErr && !statusErr && !appliedDateErr;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    setLoading(true);

    const payload = {
      company_name: companyName.trim(),
      job_title: jobTitle.trim(),
      job_type: jobType,
      status,
      applied_date: new Date(appliedDate).toISOString(),
      notes: notes.trim() || null,
    };

    try {
      if (isEditMode && id) {
        await applicationService.update(id, payload);
        toast.success('Application updated successfully!');
      } else {
        await applicationService.create(payload as Omit<Application, 'id'>);
        toast.success('Application added successfully!');
      }
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save the application.');
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

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="companyName">Company Name *</label>
            <input 
              id="companyName"
              className={errors.companyName ? 'input-error' : ''} 
              value={companyName} 
              onChange={e => handleCompanyNameChange(e.target.value)} 
              placeholder="e.g. Google"
            />
            {errors.companyName && <span className="error-message">{errors.companyName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="jobTitle">Job Title *</label>
            <input 
              id="jobTitle"
              className={errors.jobTitle ? 'input-error' : ''} 
              value={jobTitle} 
              onChange={e => handleJobTitleChange(e.target.value)} 
              placeholder="e.g. Frontend Engineer"
            />
            {errors.jobTitle && <span className="error-message">{errors.jobTitle}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="jobType">Job Type *</label>
            <select 
              id="jobType"
              className={errors.jobType ? 'input-error' : ''} 
              value={jobType} 
              onChange={e => handleJobTypeChange(e.target.value)}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
            </select>
            {errors.jobType && <span className="error-message">{errors.jobType}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select 
              id="status"
              className={errors.status ? 'input-error' : ''} 
              value={status} 
              onChange={e => handleStatusChange(e.target.value)}
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
            {errors.status && <span className="error-message">{errors.status}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="appliedDate">Applied Date *</label>
            <input 
              id="appliedDate"
              type="date" 
              className={errors.appliedDate ? 'input-error' : ''} 
              value={appliedDate} 
              onChange={e => handleAppliedDateChange(e.target.value)} 
            />
            {errors.appliedDate && <span className="error-message">{errors.appliedDate}</span>}
          </div>

          <div className="form-group full-width">
            <label htmlFor="notes">Notes</label>
            <textarea 
              id="notes"
              value={notes} 
              onChange={e => setNotes(e.target.value)} 
              placeholder="Optional notes about the application..." 
            />
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
