import { $Enums, User } from '@prisma/client';

export class CreateUserDto implements User {
    id: string;
    email: string;
    password: string;
    name: string;
    address: string;
    role: $Enums.Role;
    createdAt: Date;
    updatedAt: Date;
}
