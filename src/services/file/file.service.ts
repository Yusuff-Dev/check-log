import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

interface FileInfo {
    name: string;
    path: string;
    size: number;
    lastModified: Date;
    isFolder: boolean;
    children?: FileInfo[];
}

@Injectable()
export class FileService {
    private readonly basePath = path.join(__dirname, '../../../logs');

    async getLogs(): Promise<FileInfo[]> {
        return this.getDirectoryContents(this.basePath);
    }

    private async getDirectoryContents(dirPath: string): Promise<FileInfo[]> {
        return new Promise((resolve, reject) => {
            fs.readdir(dirPath, async (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    const fileDetails: FileInfo[] = [];
                    for (const file of files) {
                        const filePath = path.join(dirPath, file);
                        const stats = fs.statSync(filePath);
                        const fileInfo: FileInfo = {
                            name: file,
                            path: filePath,
                            size: stats.size/1024,
                            lastModified: stats.mtime,
                            isFolder: stats.isDirectory(),
                        };
                        if (fileInfo.isFolder) {
                            fileInfo.children = await this.getDirectoryContents(filePath);
                        }
                        fileDetails.push(fileInfo);
                    }
                    resolve(fileDetails);
                }
            });
        });
    }
}