import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    async create(data: CreateUserDto) {
        return await this.prisma.user.create({ data });
    }

    async findAll() {
        return await this.prisma.user.findMany();
    }

    async findOne(id: string) {
        return await this.prisma.user.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: UpdateUserDto) {
        return await this.prisma.user.update({
            data,
            where: { id },
        });
    }

    async remove(id: string) {
        return await this.prisma.user.delete({
            where: { id },
        });
    }
}
