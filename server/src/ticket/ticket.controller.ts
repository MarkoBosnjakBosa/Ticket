import { Controller, Get, Post, Delete, Body, HttpStatus, Res, Param } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketDTO } from '../dto/ticket.dto';
import { v4 as uuidv4 } from 'uuid';

@Controller('ticket')
export class TicketController {

    constructor(private readonly ticketService: TicketService) {}

    @Get('/get')
	async getTickets(@Res() response) {
		return response.status(HttpStatus.OK).json(this.ticketService.getTickets());
	}

	@Post('/book')
	async bookTickets(@Res() response, @Body() TicketDTO: TicketDTO) {
		let barcode = uuidv4();
		let ticket = {barcode: barcode, event: TicketDTO.event, name: TicketDTO.name};
		this.ticketService.bookTicket(ticket);
		return response.status(HttpStatus.OK).json({
			message: 'Ticket has been successfully booked!',
			ticket: ticket
		});
	}

	@Delete('/cancel/:barcode')
	async cancelTicket(@Res() response, @Param('barcode') barcode) {
		this.ticketService.cancelTicket(barcode);
		return response.status(HttpStatus.OK).json({
			message: 'Ticket has been successfully canceled!'
		});
	}
}
