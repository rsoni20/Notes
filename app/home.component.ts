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
    showMessage: boolean;
    isSelected: boolean = false;
    notes: Note[];
    constructor(private _noteService: NoteService) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this._noteService.getNotes()
            .subscribe(notes => {
                this.notes = notes.filter(n => !n.archived);
                this.showMessage = this.notes.length == 0;
            });


    }

    add(writing: string): void {
        (<HTMLInputElement>document.getElementById('addNote')).value = "";
        writing = writing.trim();
        if (!writing) { return; }

        this._noteService.create(writing)
            .subscribe(note => {
                if (!note.archived)
                    this.notes.push(note);
            });
    }


    delete(note: Note): void {
        this._noteService.delete(note.id)
            .subscribe(() => {
                this.loadData();
            });
    }

    check(note: Note): void {

        if (note.selected = true) {
            this.isSelected = true;
        }
        else if (note.selected = false) {
            this.isSelected = false;
        }
    }

    deleteMultiple(): void {
        for (var counter = 0; counter < this.notes.length; counter++) {
            if (this.notes[counter].selected) {
                this._noteService.delete(this.notes[counter].id)
                    .subscribe(() => {
                        this.loadData();
                    });
            }
        }
    }



    selectAll(): void {
        this.isSelected = true;
        for (var counter = 0; counter < this.notes.length; counter++) {
            if (!this.notes[counter].selected) {
                this.notes[counter].selected = true;
            }
        }
    }

    archive(note: Note): void {
        note.archived = true;
        this._noteService.update(note)
            .subscribe(() => this.loadData());
    }

    archiveMultiple(): void {
        for (var counter = 0; counter < this.notes.length; counter++) {
            if (this.notes[counter].selected) {
                this.notes[counter].archived = true;
                this._noteService.update(this.notes[counter])
                    .subscribe(() => this.loadData());
            }
        }

    }

}