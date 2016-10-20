import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { HttpModule } from '@angular/http';
import { appRouting } from './app.routing';



import { AppComponent } from './app.component';
import { ArchiveComponent } from './archive.component';
import { HomeComponent } from './home.component';


import { NoteService } from './note.service';

@NgModule({
    imports: [
        BrowserModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        FormsModule,
        HttpModule,
        appRouting
    ],
    exports: [],
    declarations: [
        AppComponent,
        ArchiveComponent,
        HomeComponent
        ],
    providers: [
        NoteService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
