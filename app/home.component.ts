import { Component, OnInit } from '@angular/core';
import { NoteService } from './note.service';
import { Note } from './note';

@Component({
    moduleId: module.id,
    selector: 'selector',
    templateUrl: 'home.component.html',
    styles: [`  
    button.delete {
  float:right;
  margin-top: 2px;
  margin-right: .8em;
  background-color: gray !important;
  color:white;
}`]
})
export class HomeComponent implements OnInit {

    deleteTitle: string = "Delete";
    ArchiveTitle: string = "Archive";
   showMessage:boolean;

    notes: Note[];
    constructor(private _noteService: NoteService) { }

    ngOnInit() {
        this.loadData();
       
    }


    loadData() {
        this._noteService.getNotes()
            .then(notes => {
                this.notes = notes.filter(n => !n.archived);
                this.showMessage = this.notes.length == 0;
            });
            // if(this.notes.length == 0) { }
            
    }

    add(writing: string): void {
        (<HTMLInputElement>document.getElementById('addNote')).value = "";
        writing = writing.trim();
        if (!writing) { return; }

        this._noteService.create(writing)
            .then(note => {
                if (!note.archived)
                    this.notes.push(note);
            });
    }

    delete(note: Note): void {
        this._noteService.delete(note.id)
            .then(() => {
                this.loadData();
            });
    }

    archive(note: Note): void {
        note.archived = true;
        this._noteService.update(note)
            .then(() => this.loadData());

    }





}