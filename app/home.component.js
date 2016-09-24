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
var HomeComponent = (function () {
    function HomeComponent(_noteService) {
        this._noteService = _noteService;
        this.deleteTitle = "Delete";
        this.ArchiveTitle = "Archive";
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.loadData();
    };
    HomeComponent.prototype.loadData = function () {
        var _this = this;
        this._noteService.getNotes()
            .then(function (notes) {
            _this.notes = notes.filter(function (n) { return !n.archived; });
            _this.showMessage = _this.notes.length == 0;
        });
        // if(this.notes.length == 0) { }
    };
    HomeComponent.prototype.add = function (writing) {
        var _this = this;
        document.getElementById('addNote').value = "";
        writing = writing.trim();
        if (!writing) {
            return;
        }
        this._noteService.create(writing)
            .then(function (note) {
            if (!note.archived)
                _this.notes.push(note);
        });
    };
    HomeComponent.prototype.delete = function (note) {
        var _this = this;
        this._noteService.delete(note.id)
            .then(function () {
            _this.loadData();
        });
    };
    HomeComponent.prototype.archive = function (note) {
        var _this = this;
        note.archived = true;
        this._noteService.update(note)
            .then(function () { return _this.loadData(); });
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'selector',
            templateUrl: 'home.component.html',
            styles: ["  \n    button.delete {\n  float:right;\n  margin-top: 2px;\n  margin-right: .8em;\n  background-color: gray !important;\n  color:white;\n}"]
        }), 
        __metadata('design:paramtypes', [note_service_1.NoteService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map