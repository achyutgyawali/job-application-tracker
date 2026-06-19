import { api } from './api';
import type { Application } from '../types';

export const applicationService = {
  // Fetch all applications, optionally filtered by status and search term
  getAll: async (status?: string, search?: string): Promise<Application[]> => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (search) params.append('search', search);

    return api.get<Application[]>('/applications', params);
  },

  // Delete an application by ID
  delete: async (id: string): Promise<void> => {
    return api.delete<void>(`/applications/${id}`);
  },

  // Fetch a single application by ID
  getById: async (id: string): Promise<Application> => {
    return api.get<Application>(`/applications/${id}`);
  },

  // Create a new application
  create: async (data: Omit<Application, 'id'>): Promise<Application> => {
    return api.post<Application>('/applications', data);
  },

  // Update an existing application
  update: async (id: string, data: Partial<Application>): Promise<Application> => {
    return api.patch<Application>(`/applications/${id}`, data);
  },
};
