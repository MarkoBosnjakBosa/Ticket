import { EventService } from './event.service';
import { EventDTO } from '../dto/event.dto';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    getEvents(response: any): Promise<any>;
    createEvent(response: any, EventDTO: EventDTO): Promise<any>;
}
