"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
let TicketService = class TicketService {
    constructor() {
        this.tickets = [];
    }
    getTickets() {
        return this.tickets;
    }
    bookTicket(ticket) {
        this.tickets.push(ticket);
    }
    cancelTicket(barcode) {
        this.tickets = this.tickets.filter(ticket => ticket.barcode !== barcode);
    }
};
TicketService = __decorate([
    (0, common_1.Injectable)()
], TicketService);
exports.TicketService = TicketService;
//# sourceMappingURL=ticket.service.js.map