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
exports.ProjectController = void 0;
const projectService_1 = require("../services/projectService");
const tsoa_1 = require("tsoa");
let ProjectController = class ProjectController extends tsoa_1.Controller {
    async getProjectById(projectId) {
        return new projectService_1.ProjectService().getById(projectId);
    }
    async getProjects(page, theme, country) {
        return new projectService_1.ProjectService().get(page ? page : 0, theme, country);
    }
};
__decorate([
    tsoa_1.Get("{projectId}"),
    __param(0, tsoa_1.Path())
], ProjectController.prototype, "getProjectById", null);
__decorate([
    tsoa_1.Get(),
    __param(0, tsoa_1.Query()),
    __param(1, tsoa_1.Query()),
    __param(2, tsoa_1.Query())
], ProjectController.prototype, "getProjects", null);
ProjectController = __decorate([
    tsoa_1.Route("projects")
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=projectController.js.map