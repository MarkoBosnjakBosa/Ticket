import { Controller, Get, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDTO } from '../dto/event.dto';

@Controller("event")
export class EventController {

    constructor(private readonly eventService: EventService) {}

    @Get("/get")
	@HttpCode(HttpStatus.OK)
	async getEvents() {
		return this.eventService.getEvents();
	}

	@Post("/create")
	@HttpCode(HttpStatus.CREATED)
	async createEvent(@Body() EventDTO: EventDTO) {
		this.eventService.createEvent(EventDTO);
		return {
			message: 'Event has been successfully created!',
			event: EventDTO,
		}
	}

}
