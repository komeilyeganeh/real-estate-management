import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../../../generated/prisma/enums';

export const Roles = (...roles: UserRole[]) => {
  return SetMetadata('Roles', roles);
};
