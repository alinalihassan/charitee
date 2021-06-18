"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationController = void 0;
const organizationService_1 = require("../services/organizationService");
const tsoa_1 = require("tsoa");
let OrganizationController = class OrganizationController extends tsoa_1.Controller {
    async getOrganizationById(organizationId) {
        return new organizationService_1.OrganizationService().getById(organizationId);
    }
    async getOrganizations(page, theme, country) {
        return new organizationService_1.OrganizationService().get(page ? page : 0, theme, country);
    }
};
__decorate([
    tsoa_1.Get("{organizationId}"),
    __param(0, tsoa_1.Path())
], OrganizationController.prototype, "getOrganizationById", null);
__decorate([
    tsoa_1.Get(),
    __param(0, tsoa_1.Query()),
    __param(1, tsoa_1.Query()),
    __param(2, tsoa_1.Query())
], OrganizationController.prototype, "getOrganizations", null);
OrganizationController = __decorate([
    tsoa_1.Route("organizations")
], OrganizationController);
exports.OrganizationController = OrganizationController;
//# sourceMappingURL=organizationController.js.map