import { useEffect, useState } from 'react';
import type { Application } from '../types/application';
import { applicationService } from '../services/applicationService';

export const ApplicationList = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationService.getAll(statusFilter, search);
      setApplications(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  // Run on mount and whenever search term or status changes
  useEffect(() => {
    fetchApplications();
  }, [search, statusFilter]);

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    try {
      await applicationService.delete(id);
      // Refresh the list after successful deletion
      fetchApplications();
    } catch (error) {
      console.error(error);
      alert("Failed to delete the application");
    }
  };

  // Handle Edit (Placeholder for now)
  const handleEdit = (app: Application) => {
    // We will hook this up to the routing/form later!
    alert(`Edit clicked for ${app.company_name}`);
  };

  return (
    <div>
      <h2>Your Applications</h2>

      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{ padding: '5px' }}
        >
          <option value="">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by company or title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '5px', width: '300px' }}
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        /* Applications Table */
        <table border={1} cellPadding={8} style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th>Company</th>
              <th>Job Title</th>
              <th>Type</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.company_name}</td>
                <td>{app.job_title}</td>
                <td>{app.job_type}</td>
                <td>{app.status}</td>
                <td>{new Date(app.applied_date).toLocaleDateString()}</td>
                <td>{app.notes || '-'}</td>
                <td>
                  <button onClick={() => handleEdit(app)} style={{ marginRight: '8px' }}>Edit</button>
                  <button onClick={() => handleDelete(app.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
