import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { File } from './entities/file.entity';
import { PrismaService } from 'src/database/prisma-service';

@Injectable()
export class FilesService {
  constructor(private readonly prisma: PrismaService) {}

  async saveDate(file: Express.Multer.File, req: Request) {
    const fileUploaded = new File();
    fileUploaded.fileName = file.filename;
    fileUploaded.contentLength = file.size;
    fileUploaded.contentType = file.mimetype;
    fileUploaded.url = `${req.protocol}://${req.get('host')}/upload/file/${
      fileUploaded.fileName
    }`;
    return await this.prisma.file.create({
      data: fileUploaded,
    });
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
