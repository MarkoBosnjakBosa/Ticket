import { Injectable } from '@nestjs/common';
import { Event } from './interfaces/event.interface';
import { Ticket } from './interfaces/ticket.interface';

@Injectable()
export class AppService {

	private events: Event[] = [];
	private tickets: Ticket[] = [];

	getEvents(): Event[] {
		return this.events;
	} 

	createEvent(event: Event) {
		this.events.push(event);
	}

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
