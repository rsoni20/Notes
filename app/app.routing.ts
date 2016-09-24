import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ArchiveComponent } from './archive.component';
import { HomeComponent } from './home.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'archive', component: ArchiveComponent },
];


export class NameRoutingModule { }

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);