import { Injectable } from '@nestjs/common';
import { Event } from '../interfaces/event.interface';

@Injectable()
export class EventService {

    private events: Event[] = [];

	getEvents(): Event[] {
		return this.events;
	} 

	createEvent(event: Event) {
		this.events.push(event);
	}

}
