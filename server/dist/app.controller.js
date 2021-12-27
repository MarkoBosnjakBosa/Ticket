"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const event_dto_1 = require("./dto/event.dto");
const ticket_dto_1 = require("./dto/ticket.dto");
const uuid_1 = require("uuid");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async getEvents(response) {
        return response.status(common_1.HttpStatus.OK).json(this.appService.getEvents());
    }
    async createEvent(response, EventDTO) {
        this.appService.createEvent(EventDTO);
        return response.status(common_1.HttpStatus.OK).json({
            message: 'Event has been successfully created!',
            event: EventDTO,
        });
    }
    async getTickets(response) {
        return response.status(common_1.HttpStatus.OK).json(this.appService.getTickets());
    }
    async bookTickets(response, TicketDTO) {
        let barcode = (0, uuid_1.v4)();
        let ticket = { barcode: barcode, event: TicketDTO.event, name: TicketDTO.name };
        this.appService.bookTicket(ticket);
        return response.status(common_1.HttpStatus.OK).json({
            message: 'Ticket has been successfully booked!',
            ticket: ticket
        });
    }
    async cancelTicket(response, barcode) {
        this.appService.cancelTicket(barcode);
        return response.status(common_1.HttpStatus.OK).json({
            message: 'Ticket has been successfully canceled!'
        });
    }
};
__decorate([
    (0, common_1.Get)('/events/get'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getEvents", null);
__decorate([
    (0, common_1.Post)('/events/create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, event_dto_1.EventDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Get)('/tickets/get'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getTickets", null);
__decorate([
    (0, common_1.Post)('/tickets/book'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ticket_dto_1.TicketDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "bookTickets", null);
__decorate([
    (0, common_1.Delete)('/tickets/cancel/:barcode'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('barcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "cancelTicket", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map