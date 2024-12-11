import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';


// define sql module
@Module({
  imports: [
    ConfigModule.forRoot(),                                                             // Load environment variables
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,                                                  // database host
      port: parseInt(process.env.DATABASE_PORT, 10),                                    // database port
      username: process.env.DATABASE_USERNAME,                                          // mysql username
      password: process.env.DATABASE_PASSWORD,                                          // mysql userpassword
      database: process.env.DATABASE_NAME,                                              // mysql db name
      autoLoadEntities: true,                                                           // auto load entities from module
      synchronize: false,                                                               // no auto-sync schema
    }),
    TasksModule,
  ],
})

export class AppModule {}
