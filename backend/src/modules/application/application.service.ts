import prisma from '../../config/db';

export const createApplication = async (data: any) => {
  return await prisma.application.create({
    data,
  });
};

export const getApplications = async (status?: string, search?: string) => {
  const whereClause: any = {};

  if (status) {
    whereClause.status = status;
  }

  if (search) {
    whereClause.OR = [
      { company_name: { contains: search, mode: 'insensitive' } },
      { job_title: { contains: search, mode: 'insensitive' } }
    ];
  }

  return await prisma.application.findMany({
    where: whereClause,
    orderBy: { applied_date: 'desc' }
  });
};

export const getApplicationById = async (id: string) => {
  return await prisma.application.findUnique({
    where: { id }
  });
};

export const updateApplication = async (id: string, data: any) => {
  return await prisma.application.update({
    where: { id },
    data
  });
};

export const deleteApplication = async (id: string) => {
  return await prisma.application.delete({
    where: { id }
  });
};
