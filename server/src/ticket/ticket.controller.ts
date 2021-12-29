import { Controller, Get, Post, Delete, Body, HttpStatus, Param, HttpCode } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketDTO } from '../dto/ticket.dto';

@Controller("ticket")
export class TicketController {

    constructor(private readonly ticketService: TicketService) {}

    @Get("/get")
	@HttpCode(HttpStatus.OK)
	async getTickets() {
		return this.ticketService.getTickets();
	}

	@Post("/book")
	@HttpCode(HttpStatus.CREATED)
	async bookTicket(@Body() TicketDTO: TicketDTO) {
		let ticket = this.ticketService.bookTicket(TicketDTO);
		return {
			message: "Ticket has been successfully booked!",
			ticket: ticket
		}
	}

	@Delete("/cancel/:barcode")
	@HttpCode(HttpStatus.OK)
	async cancelTicket(@Param("barcode") barcode) {
		this.ticketService.cancelTicket(barcode);
		return {
			message: "Ticket has been successfully canceled!"
		}
	}
}
