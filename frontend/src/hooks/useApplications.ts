import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { Application } from '../types';
import { applicationService } from '../services/applicationService';

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Deletion modal state
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await applicationService.getAll(statusFilter, search, page, 10);
      setApplications(res.data);
      setTotalPages(res.totalPages || 1);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load applications.');
    } finally {
      setLoading(false);
    }
  };

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  // Fetch applications when page, search, or status filter changes
  useEffect(() => {
    fetchApplications();
  }, [page, search, statusFilter]);

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

  const nextPage = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  return {
    applications,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    page,
    totalPages,
    nextPage,
    prevPage,
    isModalOpen,
    confirmDelete,
    handleConfirmDelete,
    handleCancelDelete,
    refetch: fetchApplications,
  };
};
