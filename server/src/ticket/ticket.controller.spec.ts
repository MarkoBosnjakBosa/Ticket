import { Test, TestingModule } from '@nestjs/testing';
import { TicketDTO } from '../dto/ticket.dto';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

describe("TicketController", () => {
	let ticketController: TicketController;
	let spyService: TicketService

	beforeAll(async () => {
		const ApiServiceProvider = {
			provide: TicketService,
			useFactory: () => ({
				bookTicket: jest.fn(() => []),
				getTickets: jest.fn(() => []),
				cancelTicket: jest.fn(() => [])
			})
		}
		const app: TestingModule = await Test.createTestingModule({
			controllers: [TicketController],
			providers: [TicketService, ApiServiceProvider],
		}).compile();

		ticketController = app.get<TicketController>(TicketController);
		spyService = app.get<TicketService>(TicketService);
	});

	it("should be defined", () => {
		expect(ticketController).toBeDefined();
	});

	it("bookTicket", () => {
		const ticket: TicketDTO = {
			barcode: "00000",
			event: "Ticket.io",
			name: "Marko Bosnjak"
		};
		ticketController.bookTicket(ticket);
		expect(ticketController.bookTicket(ticket)).not.toEqual(null);
		expect(spyService.bookTicket).toHaveBeenCalled();
		expect(spyService.bookTicket).toHaveBeenCalledWith(ticket);
	});

	it("getTickets", () => {
		ticketController.getTickets();
		expect(spyService.getTickets).toHaveBeenCalled();
	});

	it("cancelTicket", () => {
		ticketController.cancelTicket("00000");
		expect(spyService.cancelTicket).toHaveBeenCalled();
	});

});
