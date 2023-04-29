import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/users/entity/user.entity';
import { UsersModule } from './modules/users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { Article } from './modules/article/entity/article.entity';
import { ArticleModule } from './modules/article/article.module';
import { RootModule } from './root/root.module';

@Module({
  imports: [
    ArticleModule,
    AuthModule,
    UsersModule,
    RootModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rootpwd',
      database: 'api',
      entities: [User, Article],
      synchronize: true,
      retryDelay: 5000,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
