import prisma from '../../config/db';

export const createApplication = async (data: any) => {
  return await prisma.application.create({
    data,
  });
};

export const getApplications = async (status?: string, search?: string, page?: number, limit?: number) => {
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

  const total = await prisma.application.count({
    where: whereClause
  });

  const queryOptions: any = {
    where: whereClause,
    orderBy: { applied_date: 'desc' }
  };

  if (page && limit) {
    queryOptions.skip = (page - 1) * limit;
    queryOptions.take = limit;
  }

  const data = await prisma.application.findMany(queryOptions);

  return { data, total };
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
