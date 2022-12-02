import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostService } from './posts/post.service';
import { PostModule } from './posts/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, // only in development, remove in production
    }),
    PostModule,
  ],
  controllers: [],
  providers: [PostService],
})
export class AppModule {}
