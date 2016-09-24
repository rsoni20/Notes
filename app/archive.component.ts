import { Component, OnInit } from '@angular/core';
import { NoteService } from './note.service';
import { Note } from './note';

@Component({
    moduleId: module.id,
    selector: 'selector',
    templateUrl: 'Archive.component.html',
    styles: [`  
    button.delete {
  float:right;
  margin-top: 2px;
  margin-right: .8em;
  background-color: gray !important;
  color:white;
}`]
})
export class ArchiveComponent implements OnInit {
    notes: Note[];
    showMessage:boolean;
    constructor(private _noteService: NoteService) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this._noteService.getNotes()
            .then(notes => {
                this.notes = notes.filter(n => n.archived)
                this.showMessage = this.notes.length == 0;

            });
    }


    delete(note: Note): void {
        this._noteService.delete(note.id)
            .then(() => {
                this.loadData();
            });
    }

    archive(note: Note): void {
        note.archived = false;
        this._noteService.update(note)
            .then(() => {
                this.loadData();
            });

    }



}