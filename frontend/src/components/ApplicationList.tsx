import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Application } from '../types/application';
import { applicationService } from '../services/applicationService';

const statusBadgeClass: Record<string, string> = {
  Applied: 'badge badge-applied',
  Interviewing: 'badge badge-interviewing',
  Offer: 'badge badge-offer',
  Rejected: 'badge badge-rejected',
};

export const ApplicationList = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationService.getAll(statusFilter, search);
      setApplications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [search, statusFilter]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    try {
      await applicationService.delete(id);
      fetchApplications();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card">
      <div className="toolbar">
        <h2>Applications</h2>
        <button className="btn btn-primary" onClick={() => navigate('/add')}>
          + Add New
        </button>
      </div>

      <div className="filters" style={{ marginBottom: '16px' }}>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="text"
          placeholder="Search by company or title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ minWidth: '240px' }}
        />
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : applications.length === 0 ? (
        <div className="empty-state">
          <p>No applications found. Click "+ Add New" to get started!</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Job Title</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id}>
                  <td style={{ fontWeight: 500 }}>{app.company_name}</td>
                  <td>{app.job_title}</td>
                  <td>{app.job_type}</td>
                  <td>
                    <span className={statusBadgeClass[app.status] || 'badge'}>
                      {app.status}
                    </span>
                  </td>
                  <td>{new Date(app.applied_date).toLocaleDateString()}</td>
                  <td>{app.notes || '—'}</td>
                  <td>
                    <div className="actions-cell">
                      <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/edit/${app.id}`)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(app.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
