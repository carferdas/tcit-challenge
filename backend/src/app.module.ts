import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
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
    PostsModule,
  ],
  controllers: [],
  providers: [PostsService],
})
export class AppModule {}
