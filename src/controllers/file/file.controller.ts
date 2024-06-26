import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { FileService } from 'src/services/file/file.service';

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @Get('/logs/')
    // return all logs
    async getLogs(): Promise<any> {
        return this.fileService.getLogs();
    }
}
