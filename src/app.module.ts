import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { RidesModule } from './rides/rides.module';
import { MessagesModule } from './messages/messages.module';
import { HousingModule } from './housing/housing.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, EventsModule, RidesModule, MessagesModule, HousingModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
