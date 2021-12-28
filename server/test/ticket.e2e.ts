import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from "../src/app.module";
import { HttpStatus, INestApplication } from '@nestjs/common';
import { TicketDTO } from 'src/dto/ticket.dto';

describe("e2e tests for ticket endpoints", () => {
	let app: INestApplication;

	beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
		await app.close();
	});

    it("bookTicket", () => {
        const ticket: TicketDTO = {
            barcode: "00000",
            event: "Ticket.io",
            name: "Marko Bosnjak"
        };
        return request(app.getHttpServer())
            .post("/ticket/book")
            .set("Accept", "application/json")
            .send(ticket)
            .expect(HttpStatus.OK);
    });

	it("getTickets", () => {
		return request(app.getHttpServer())
			.get("/ticket/get")
            .set("Accept", "application/json")
			.expect(HttpStatus.OK);
	});

    it("cancelTicket", () => {
		return request(app.getHttpServer())
			.delete("/ticket/cancel/00000")
            .set("Accept", "application/json")
			.expect(HttpStatus.OK);
	});

});
