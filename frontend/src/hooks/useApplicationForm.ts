import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { Application } from '../types';
import { applicationService } from '../services/applicationService';
import {
  validateCompanyName,
  validateJobTitle,
  validateJobType,
  validateStatus,
  validateAppliedDate,
} from '../utils/validation';

export const useApplicationForm = () => {
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

  return {
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
  };
};
