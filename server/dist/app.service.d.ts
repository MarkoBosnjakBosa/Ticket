import { Event } from './interfaces/event.interface';
import { Ticket } from './interfaces/ticket.interface';
export declare class AppService {
    private events;
    private tickets;
    getEvents(): Event[];
    createEvent(event: Event): void;
    getTickets(): Ticket[];
    bookTicket(ticket: Ticket): void;
    cancelTicket(barcode: string): void;
}
