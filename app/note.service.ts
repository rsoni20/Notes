import { Injectable } from '@angular/core';
import { Note } from './note';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';



@Injectable()
export class NoteService {

    private _notesUrl = 'http://localhost:56186/api/values';
    constructor(private _http: Http) { }

    getNotes(): Observable<Note[]> {
        console.log("getting notes");
        return this._http.get(this._notesUrl)
            .map((response: Response) => response.json() as Note[])
            .do(data => console.log("All: " + JSON.stringify(data)))
            .catch(this._handleEroor);
    }

    _handleEroor(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

    private headers = new Headers({ 'content-type': 'application/json' });

    create(writing: string): Observable<Note> {
        return this._http.post(this._notesUrl, JSON.stringify({ writing: writing }), { headers: this.headers })
            .catch(this._handleEroor);
    }

    update(note: Note): Observable<Note> {
        const url = `${this._notesUrl}/${note.id}`;

        return this._http
            .put(url, JSON.stringify(note), { headers: this.headers })

            .map(() => note)
            .catch(this._handleEroor);
    }

    updateMultipleNotes(notes: Note[]): Observable<Note[]> {
        let url = `${this._notesUrl}/archive`;
        return this._http.put(url, JSON.stringify(notes), { headers: this.headers })
            .map(() => Note)
            .catch(this._handleEroor);
    }

    deleteNote(id: number): Observable<any> {
        let url = `${this._notesUrl}/${id}`;
        return this._http.delete(url, { headers: this.headers })
            .map(() => null)
            .catch(this._handleEroor);
    }


    deleteMultipleNotes(id: number[]): Observable<any> {
        let url = `${this._notesUrl}/deleteNotes`;
        return this._http.post(url, JSON.stringify(id), { headers: this.headers })
            .catch(this._handleEroor);
    }

}