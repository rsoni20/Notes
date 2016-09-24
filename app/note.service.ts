import { Injectable } from '@angular/core';
import { Note } from './note';
import { Http, Headers }  from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class NoteService {

    private _notesUrl = 'app/notes';
    constructor(private _http: Http) { }

    getNotes(): Promise<Note[]> {
        return this._http.get(this._notesUrl)
            .toPromise()
            .then(response => response.json().data as Note[])
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    private headers = new Headers({ 'content-type': 'application/json' });

    create(writing: string): Promise<Note> {

        return this._http.post(this._notesUrl, JSON.stringify({ writing: writing, date: new Date(), archived: false }))
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(note: Note): Promise<Note> {
        const url = `${this._notesUrl}/${note.id}`;

        return this._http
            .put(url, JSON.stringify(note), {headers:this.headers})
            .toPromise()
            .then(() => note)
            .catch(this.handleError);
    }
    delete(id: number): Promise<any> {
        let url = `${this._notesUrl}/${id}`;
        return this._http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

}