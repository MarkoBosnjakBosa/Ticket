import { Injectable } from '@nestjs/common';
import { Ticket } from '../interfaces/ticket.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TicketService {

	private tickets: Ticket[] = [];

	getTickets(): Ticket[] {
		return this.tickets;
	}

	bookTicket(ticket: Ticket) {
		ticket.barcode = uuidv4();
		this.tickets.push(ticket);
		return ticket;
	}

	cancelTicket(barcode: string) {
		this.tickets = this.tickets.filter(ticket => ticket.barcode !== barcode);
	}
}