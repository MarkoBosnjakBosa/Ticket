import { Ticket } from '../interfaces/ticket.interface';
export declare class TicketService {
    private tickets;
    getTickets(): Ticket[];
    bookTicket(ticket: Ticket): void;
    cancelTicket(barcode: string): void;
}
