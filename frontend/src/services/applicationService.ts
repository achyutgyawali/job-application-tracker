import type { Application } from '../types/application';

const API_URL = 'http://localhost:5000/applications';

export const applicationService = {
  // Fetch all applications, optionally filtered by status and search term
  getAll: async (status?: string, search?: string): Promise<Application[]> => {
    let url = API_URL;
    const params = new URLSearchParams();
    
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    
    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch applications");
    return response.json();
  },

  // Delete an application by ID
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error("Failed to delete application");
  }

  // create and update methods will be added when we build the forms!
};
