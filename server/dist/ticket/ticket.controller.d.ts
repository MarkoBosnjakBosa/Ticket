import { TicketService } from './ticket.service';
import { TicketDTO } from '../dto/ticket.dto';
export declare class TicketController {
    private readonly ticketService;
    constructor(ticketService: TicketService);
    getTickets(response: any): Promise<any>;
    bookTickets(response: any, TicketDTO: TicketDTO): Promise<any>;
    cancelTicket(response: any, barcode: any): Promise<any>;
}
