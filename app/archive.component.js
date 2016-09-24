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
var core_1 = require('@angular/core');
var note_service_1 = require('./note.service');
var ArchiveComponent = (function () {
    function ArchiveComponent(_noteService) {
        this._noteService = _noteService;
    }
    ArchiveComponent.prototype.ngOnInit = function () {
        this.loadData();
    };
    ArchiveComponent.prototype.loadData = function () {
        var _this = this;
        this._noteService.getNotes()
            .then(function (notes) {
            _this.notes = notes.filter(function (n) { return n.archived; });
            _this.showMessage = _this.notes.length == 0;
        });
    };
    ArchiveComponent.prototype.delete = function (note) {
        var _this = this;
        this._noteService.delete(note.id)
            .then(function () {
            _this.loadData();
        });
    };
    ArchiveComponent.prototype.archive = function (note) {
        var _this = this;
        note.archived = false;
        this._noteService.update(note)
            .then(function () {
            _this.loadData();
        });
    };
    ArchiveComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'selector',
            templateUrl: 'Archive.component.html',
            styles: ["  \n    button.delete {\n  float:right;\n  margin-top: 2px;\n  margin-right: .8em;\n  background-color: gray !important;\n  color:white;\n}"]
        }), 
        __metadata('design:paramtypes', [note_service_1.NoteService])
    ], ArchiveComponent);
    return ArchiveComponent;
}());
exports.ArchiveComponent = ArchiveComponent;
//# sourceMappingURL=archive.component.js.map