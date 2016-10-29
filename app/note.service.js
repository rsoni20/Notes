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
var note_1 = require('./note');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
var NoteService = (function () {
    function NoteService(_http) {
        this._http = _http;
        this._notesUrl = 'http://localhost:56186/api/values';
        this.headers = new http_1.Headers({ 'content-type': 'application/json' });
    }
    NoteService.prototype.getNotes = function () {
        console.log("getting notes");
        return this._http.get(this._notesUrl)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log("All: " + JSON.stringify(data)); })
            .catch(this._handleEroor);
    };
    NoteService.prototype._handleEroor = function (error) {
        console.log(error);
        return Rx_1.Observable.throw(error);
    };
    NoteService.prototype.create = function (writing) {
        return this._http.post(this._notesUrl, JSON.stringify({ writing: writing }), { headers: this.headers })
            .catch(this._handleEroor);
    };
    NoteService.prototype.update = function (note) {
        var url = this._notesUrl + "/" + note.id;
        return this._http
            .put(url, JSON.stringify(note), { headers: this.headers })
            .map(function () { return note; })
            .catch(this._handleEroor);
    };
    NoteService.prototype.updateMultipleNotes = function (notes) {
        var url = this._notesUrl + "/archive";
        return this._http.put(url, JSON.stringify(notes), { headers: this.headers })
            .map(function () { return note_1.Note; })
            .catch(this._handleEroor);
    };
    NoteService.prototype.deleteNote = function (id) {
        var url = this._notesUrl + "/" + id;
        return this._http.delete(url, { headers: this.headers })
            .map(function () { return null; })
            .catch(this._handleEroor);
    };
    NoteService.prototype.deleteMultipleNotes = function (id) {
        var url = this._notesUrl + "/deleteNotes";
        return this._http.post(url, JSON.stringify(id), { headers: this.headers })
            .catch(this._handleEroor);
    };
    NoteService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], NoteService);
    return NoteService;
}());
exports.NoteService = NoteService;
//# sourceMappingURL=note.service.js.map