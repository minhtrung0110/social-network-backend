import { Module } from '@nestjs/common';
import { EventsGateway } from './event.gateway';
import { EventController } from './event.controller';

@Module({
  providers: [EventsGateway],
  controllers: [EventController],
})
export class EventsModule {}
