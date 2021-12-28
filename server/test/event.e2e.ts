import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from "../src/app.module";
import { HttpStatus, INestApplication } from '@nestjs/common';
import { EventDTO } from 'src/dto/event.dto';

describe("e2e tests for event endpoints", () => {
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

	it("createEvent", () => {
        const event: EventDTO = {
            name: "Ticket.io",
            date: "21.12.2021",
            address: "Cologne"
        };
        return request(app.getHttpServer())
            .post("/event/create")
            .set("Accept", "application/json")
            .send(event)
            .expect(HttpStatus.OK);
    });

	it("getEvents", () => {
		return request(app.getHttpServer())
			.get("/event/get")
            .set("Accept", "application/json")
			.expect(HttpStatus.OK);
	});

});
