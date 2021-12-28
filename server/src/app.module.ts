import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket/ticket.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [TicketModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
