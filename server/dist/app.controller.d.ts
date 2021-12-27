import { AppService } from './app.service';
import { EventDTO } from './dto/event.dto';
import { TicketDTO } from './dto/ticket.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getEvents(response: any): Promise<any>;
    createEvent(response: any, EventDTO: EventDTO): Promise<any>;
    getTickets(response: any): Promise<any>;
    bookTickets(response: any, TicketDTO: TicketDTO): Promise<any>;
    cancelTicket(response: any, barcode: any): Promise<any>;
}
