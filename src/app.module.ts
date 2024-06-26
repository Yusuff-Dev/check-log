import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileService } from './services/file/file.service';
import { FileController } from './controllers/file/file.controller';



@Module({
  imports: [],
  controllers: [AppController, FileController],
  providers: [AppService, FileService],
})
export class AppModule { }
