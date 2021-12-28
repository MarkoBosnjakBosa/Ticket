import { Injectable } from '@nestjs/common';
import { Ticket } from '../interfaces/ticket.interface';

@Injectable()
export class TicketService {

	private tickets: Ticket[] = [];

	getTickets(): Ticket[] {
		return this.tickets;
	}

	bookTicket(ticket: Ticket) {
		this.tickets.push(ticket);
	}

	cancelTicket(barcode: string) {
		this.tickets = this.tickets.filter(ticket => ticket.barcode !== barcode);
	}
}