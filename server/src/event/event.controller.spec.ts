import { Test, TestingModule } from '@nestjs/testing';
import { EventDTO } from '../dto/event.dto';
import { EventController } from './event.controller';
import { EventService } from './event.service';

describe("EventController", () => {
	let eventController: EventController;
	let spyService: EventService

	beforeAll(async () => {
		const ApiServiceProvider = {
			provide: EventService,
			useFactory: () => ({
				createEvent: jest.fn(() => []),
				getEvents: jest.fn(() => [])
			})
		}
		const app: TestingModule = await Test.createTestingModule({
			controllers: [EventController],
			providers: [EventService, ApiServiceProvider],
		}).compile();

		eventController = app.get<EventController>(EventController);
		spyService = app.get<EventService>(EventService);
	});

	it("should be defined", () => {
		expect(eventController).toBeDefined();
	});

	it("bookTicket", () => {
		const event: EventDTO = {
			name: "Ticket.io",
            date: "21.12.2021",
            address: "Cologne"
		};
		eventController.createEvent(event);
		expect(eventController.createEvent(event)).not.toEqual(null);
		expect(spyService.createEvent).toHaveBeenCalled();
		expect(spyService.createEvent).toHaveBeenCalledWith(event);
	});

	it("getEvents", () => {
		eventController.getEvents();
		expect(spyService.getEvents).toHaveBeenCalled();
	});

});
