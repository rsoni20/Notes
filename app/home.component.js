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
        this.isSelected = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.loadData();
    };
    HomeComponent.prototype.loadData = function () {
        var _this = this;
        this._noteService.getNotes()
            .subscribe(function (notes) {
            _this.notes = notes.filter(function (n) { return !n.archived; });
            _this.showMessage = _this.notes.length == 0;
        });
    };
    HomeComponent.prototype.add = function (writing) {
        var _this = this;
        document.getElementById('addNote').value = "";
        writing = writing.trim();
        if (!writing) {
            return;
        }
        this._noteService.create(writing)
            .subscribe(function (note) {
            if (!note.archived)
                _this.notes.push(note);
        });
    };
    HomeComponent.prototype.delete = function (note) {
        var _this = this;
        this._noteService.delete(note.id)
            .subscribe(function () {
            _this.loadData();
        });
    };
    HomeComponent.prototype.check = function (note) {
        if (note.selected = true) {
            this.isSelected = true;
        }
        else if (note.selected = false) {
            this.isSelected = false;
        }
    };
    HomeComponent.prototype.deleteMultiple = function () {
        var _this = this;
        for (var counter = 0; counter < this.notes.length; counter++) {
            if (this.notes[counter].selected) {
                this._noteService.delete(this.notes[counter].id)
                    .subscribe(function () {
                    _this.loadData();
                });
            }
        }
    };
    HomeComponent.prototype.selectAll = function () {
        this.isSelected = true;
        for (var counter = 0; counter < this.notes.length; counter++) {
            if (!this.notes[counter].selected) {
                this.notes[counter].selected = true;
            }
        }
    };
    HomeComponent.prototype.archive = function (note) {
        var _this = this;
        note.archived = true;
        this._noteService.update(note)
            .subscribe(function () { return _this.loadData(); });
    };
    HomeComponent.prototype.archiveMultiple = function () {
        var _this = this;
        for (var counter = 0; counter < this.notes.length; counter++) {
            if (this.notes[counter].selected) {
                this.notes[counter].archived = true;
                this._noteService.update(this.notes[counter])
                    .subscribe(function () { return _this.loadData(); });
            }
        }
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