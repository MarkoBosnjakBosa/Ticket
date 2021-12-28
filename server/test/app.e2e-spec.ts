import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';
import { INestApplication } from '@nestjs/common';

describe('Testing e2e', () => {
	let app: INestApplication;
	let appService = { getEvents: () => ['Ticket', '28.12.2021', 'Cologne'] };

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		})
		.overrideProvider(AppService)
		.useValue(AppService)
		.compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});

	it('getEvents', () => {
		return request(app.getHttpServer())
			.get('/events/get')
			.expect(200)
			.expect({
				data: appService.getEvents(),
			});
	});

	afterAll(async () => {
		await app.close();
	});
});
