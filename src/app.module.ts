import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { RidesModule } from './rides/rides.module';
import { MessagesModule } from './messages/messages.module';
import { HousingModule } from './housing/housing.module';
import { AuthModule } from './auth/auth.module';
import { Event } from './events/entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'pulse',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    EventsModule,
    RidesModule,
    MessagesModule,
    HousingModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}