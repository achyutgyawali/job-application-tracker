import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { Application } from '../types';
import { applicationService } from '../services/applicationService';

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  // Deletion modal state
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationService.getAll(statusFilter, search);
      setApplications(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load applications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [search, statusFilter]);

  const confirmDelete = (id: string) => {
    setDeleteTargetId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await applicationService.delete(deleteTargetId);
      toast.success('Application deleted successfully!');
      fetchApplications();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete the application.');
    } finally {
      setIsModalOpen(false);
      setDeleteTargetId(null);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setDeleteTargetId(null);
  };

  return {
    applications,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    isModalOpen,
    confirmDelete,
    handleConfirmDelete,
    handleCancelDelete,
    refetch: fetchApplications,
  };
};
