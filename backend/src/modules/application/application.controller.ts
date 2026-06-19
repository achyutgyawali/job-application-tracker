import { Request, Response } from 'express';
import { applicationSchema, updateApplicationSchema } from './application.schema';
import { asyncHandler } from '../../utils/asyncHandler';
import * as applicationService from './application.service';

// create a new application

export const createApplication = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = applicationSchema.parse(req.body);
  const newApplication = await applicationService.createApplication(validatedData);
  res.status(201).json(newApplication);
});

// geet all applications (with filters)

export const getApplications = asyncHandler(async (req: Request, res: Response) => {
  const { status, search, page, limit } = req.query;
  
  const pageNum = parseInt(page as string) || 1;
  const limitNum = parseInt(limit as string) || 10;

  const { data, total } = await applicationService.getApplications(
    status as string,
    search as string,
    pageNum,
    limitNum
  );

  res.json({
    data,
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum)
  });
});

// get an application by id

export const getApplicationById = asyncHandler(async (req: Request, res: Response) => {
  const application = await applicationService.getApplicationById(req.params.id);
  
  if (!application) {
    return res.status(404).json({ error: "Application not found" });
  }
  
  res.json(application);
});

//  update an application

export const updateApplication = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = updateApplicationSchema.parse(req.body);
  const updatedApplication = await applicationService.updateApplication(req.params.id, validatedData);
  res.json(updatedApplication);
});

// Remove an application
export const deleteApplication = asyncHandler(async (req: Request, res: Response) => {
  await applicationService.deleteApplication(req.params.id);
  res.status(204).send();
});
