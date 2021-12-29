import { TicketService } from './ticket.service';
import { TicketDTO } from '../dto/ticket.dto';
export declare class TicketController {
    private readonly ticketService;
    constructor(ticketService: TicketService);
    getTickets(): Promise<import("../interfaces/ticket.interface").Ticket[]>;
    bookTicket(TicketDTO: TicketDTO): Promise<{
        message: string;
        ticket: import("../interfaces/ticket.interface").Ticket;
    }>;
    cancelTicket(barcode: any): Promise<{
        message: string;
    }>;
}
