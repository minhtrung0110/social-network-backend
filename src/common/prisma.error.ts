interface PrismaError {
  code: string;
  message: string;
}

export const prismaErrors: Record<string, string> = {
  // Authentication errors
  P1000: 'Invalid database credentials',
  P1001: 'Cannot reach database server',
  P1002: 'Database server connection timed out',
  P1003: 'Database does not exist',
  P1008: 'Operation timed out',
  P1009: 'Database already exists',
  P1010: 'User denied access to database',
  P1011: 'Error opening TLS connection',
  P1012: 'Prisma schema validation error',
  P1013: 'Invalid database string provided',
  // Prisma Client errors
  P2000: 'Value too long for column',
  P2001: 'Record not found',
  P2002: 'Unique constraint failed',
  P2003: 'Foreign key constraint failed',
  P2004: 'Database constraint failed',
  P2005: 'Invalid value stored in database',
  P2006: 'Invalid value provided',
  P2007: 'Data validation error',
  P2008: 'Query parsing error',
  P2009: 'Query validation error',
  P2010: 'Raw query failed',
  P2011: 'Null constraint violation',
  P2012: 'Missing required value',
  P2013: 'Missing required argument',
  P2014: 'Relation constraint violation',
  P2015: 'Related record not found',
  P2016: 'Query interpretation error',
  P2017: 'Relation records not connected',
  P2018: 'Required connected records not found',
  P2019: 'Input error',
  P2020: 'Value out of range',
  P2021: 'Table does not exist',
  P2022: 'Column does not exist',
  P2023: 'Inconsistent column data',
  P2024: 'Connection pool timeout',
  P2025: 'Required records not found',
  P2026: 'Unsupported feature used',
  P2027: 'Multiple errors occurred',
  P2028: 'Transaction API error',
  P2029: 'Query parameter limit exceeded',
  P2030: 'Fulltext index not found',
  P2031: 'MongoDB server needs to be run as a replica set',
  P2033: 'Number exceeds 64-bit integer limit',
  P2034: 'Transaction failed due to conflict',
  P2035: 'Assertion violation',
  P2036: 'Error in external connector',
  P2037: 'Too many database connections opened',
  // Prisma Migrate errors
  P3000: 'Failed to create database',
  P3001: 'Destructive changes possible with data loss',
  P3002: 'Migration rolled back',
  P3003: 'Migration format changed',
  P3004: 'System database alteration disallowed',
  P3005: 'Database schema not empty',
  P3006: 'Migration failed to apply to shadow database',
  P3007: 'Preview features not allowed',
  P3008: 'Migration already applied',
  P3009: 'Failed migrations found',
  P3010: 'Migration name too long',
  P3011: 'Migration cannot be rolled back',
  P3012: 'Migration cannot be rolled back',
  P3013: 'Datasource provider arrays not supported',
  P3014: 'Shadow database creation failed',
  P3015: 'Migration file not found',
  P3016: 'Database reset fallback method failed',
  P3017: 'Migration not found',
  P3018: 'Migration failed to apply',
  P3019: 'Datasource provider mismatch',
  P3020: 'Automatic shadow database creation disabled',
  P3021: 'Foreign keys cannot be created',
  P3022: 'Direct execution of DDL statements disabled',
  // Prisma db pull errors
  P4000: 'Introspection failed to produce schema file',
  P4001: 'Introspected database was empty',
  P4002: 'Inconsistent introspected database schema',
  // Prisma Accelerate errors
  P6000: 'Generic server error',
  P6001: 'Invalid data source URL',
  P6002: 'Invalid API key',
  P6003: 'Plan limit reached',
  P6004: 'Query timeout',
  P6005: 'Invalid parameters',
  P6006: 'Prisma version not supported',
  P6008: 'Engine start error',
  P6009: 'Response size limit exceeded',
  // Prisma Pulse errors
  P6100: 'Unexpected server error',
  P6101: 'Datasource unreachable',
  P6102: 'Invalid API key',
  P6103: 'Project disabled',
  P6104: 'Account hold',
  P6105: 'Prisma version not supported',
};

export function getPrismaError(prismaError: PrismaError): string {
  const errorMessage = prismaErrors[prismaError.code];
  return errorMessage ? errorMessage : 'Unknown Prisma error';
}
