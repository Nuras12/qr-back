import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QrModule } from './qr/qr.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './qr/entities/qr.entity';

@Module({
  imports: [
    QrModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          entities: [Ticket],
          synchronize: true,
          autoLoadEntities: true,
          // logging: true,
        };
      },
      inject: [ConfigService],
    }),
    // TypeOrmModule.forFeature([Ticket]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        console.log(`${configService.get('JWT_EXPIRE_TIME')}`);

        return {
          global: true,
          secret: configService.get('JWT_SECRET'),
          verifyOptions: { ignoreExpiration: false },
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRE_TIME'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
