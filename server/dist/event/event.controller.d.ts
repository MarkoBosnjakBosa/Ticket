import { EventService } from './event.service';
import { EventDTO } from '../dto/event.dto';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    getEvents(): Promise<import("../interfaces/event.interface").Event[]>;
    createEvent(EventDTO: EventDTO): Promise<{
        message: string;
        event: EventDTO;
    }>;
}
