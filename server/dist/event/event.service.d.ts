import { Event } from '../interfaces/event.interface';
export declare class EventService {
    private events;
    getEvents(): Event[];
    createEvent(event: Event): void;
}
