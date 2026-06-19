import { useApplicationForm } from '../../../hooks/useApplicationForm';

export const ApplicationForm = () => {
  const {
    companyName,
    jobTitle,
    jobType,
    status,
    appliedDate,
    notes,
    setNotes,
    loading,
    fetching,
    errors,
    isEditMode,
    handleCompanyNameChange,
    handleJobTitleChange,
    handleJobTypeChange,
    handleStatusChange,
    handleAppliedDateChange,
    handleSubmit,
    navigate,
  } = useApplicationForm();

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
