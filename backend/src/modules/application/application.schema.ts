import { z } from 'zod';

// Zod schema for validating the application data
export const applicationSchema = z.object({
  company_name: z.string().min(2, "Company name must be at least 2 characters"),
  job_title: z.string().min(1, "Job title is required"),
  job_type: z.enum(["Internship", "Full-time", "Part-time"]),
  status: z.enum(["Applied", "Interviewing", "Offer", "Rejected"]),
  applied_date: z.string().datetime(), // ISO date string
  notes: z.string().optional()
});

// Makes all fields optional for PATCH request updates
export const updateApplicationSchema = applicationSchema.partial();
