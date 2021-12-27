import { Body, Controller, Get, Post, Delete, HttpStatus, Res, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { EventDTO } from './dto/event.dto';
import { TicketDTO } from './dto/ticket.dto';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class AppController {
  	constructor(private readonly appService: AppService) {}

	@Get('/events/get')
	async getEvents(@Res() response) {
		return response.status(HttpStatus.OK).json(this.appService.getEvents());
	}

	@Post('/events/create')
	async createEvent(@Res() response, @Body() EventDTO: EventDTO) {
		this.appService.createEvent(EventDTO);
		return response.status(HttpStatus.OK).json({
			message: 'Event has been successfully created!',
			event: EventDTO,
		});
	}

	@Get('/tickets/get')
	async getTickets(@Res() response) {
		return response.status(HttpStatus.OK).json(this.appService.getTickets());
	}

	@Post('/tickets/book')
	async bookTickets(@Res() response, @Body() TicketDTO: TicketDTO) {
		let barcode = uuidv4();
		let ticket = {barcode: barcode, event: TicketDTO.event, name: TicketDTO.name};
		this.appService.bookTicket(ticket);
		return response.status(HttpStatus.OK).json({
			message: 'Ticket has been successfully booked!',
			ticket: ticket
		});
	}

	@Delete('/tickets/cancel/:barcode')
	async cancelTicket(@Res() response, @Param('barcode') barcode) {
		this.appService.cancelTicket(barcode);
		return response.status(HttpStatus.OK).json({
			message: 'Ticket has been successfully canceled!'
		});
	}
}
