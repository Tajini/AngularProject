import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
'use strict';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { RouterModule, Routes } from '@angular/router';
import {User} from './Users-list.component';
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  function RetirerArgent(User, connected) {
    
}
function buildUser(nickname: string, password: string) {
  let result1 = buildUser("Boby", "jekiffelebiff123");  
  return nickname + " " + password;
}

import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
    templateUrl: "index.html"
})
export class MainPageComponent {

    @ViewChild('dataContainer') dataContainer: ElementRef;

    loadData(data) {
        this.dataContainer.nativeElement.innerHTML = data;
    }}
