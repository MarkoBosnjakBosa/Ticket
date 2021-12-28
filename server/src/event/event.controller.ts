import { Controller, Get, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDTO } from '../dto/event.dto';

@Controller('event')
export class EventController {

    constructor(private readonly eventService: EventService) {}

    @Get('/get')
	async getEvents(@Res() response) {
		return response.status(HttpStatus.OK).json(this.eventService.getEvents());
	}

	@Post('/create')
	async createEvent(@Res() response, @Body() EventDTO: EventDTO) {
		this.eventService.createEvent(EventDTO);
		return response.status(HttpStatus.OK).json({
			message: 'Event has been successfully created!',
			event: EventDTO,
		});
	}

}
