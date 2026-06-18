import { PrismaClient } from '@prisma/client';

// Create a single instance of PrismaClient to be shared across the entire application.
// This prevents connection exhaustion during hot-reloads or when multiple modules access the DB.
const prisma = new PrismaClient();

export default prisma;
