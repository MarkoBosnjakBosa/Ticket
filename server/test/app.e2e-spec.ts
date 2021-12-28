import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController', () => {
	let app: INestApplication;

	beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('should be true', () => {
		expect(true).toBe(true);
	  });

	afterAll(async () => {
		await app.close();
	});
});
