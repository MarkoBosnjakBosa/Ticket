import { Ticket } from '../interfaces/ticket.interface';
export declare class TicketService {
    private tickets;
    getTickets(): Ticket[];
    bookTicket(ticket: Ticket): Ticket;
    cancelTicket(barcode: string): void;
}
