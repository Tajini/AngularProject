import {Component, OnInit} from "@angular/core";
import {NgPlural} from "@angular/common";
import {Client} from "./client";
import {BanqueLocalService} from "./banque-local.service";
import {BanqueService} from "./banque.service";
import {BanqueHttpService} from "./banque-http.service";
import {BanqueLocalAsyncService} from "./banque-local-async.service";

@Component({
  selector: "app-clients",
  template: `
    <h2>Liste des clients</h2>
    <mat-nav-list>
      <a mat-list-item 
         *ngFor="let cli of clients | slice:0:clients.length"
         [routerLink]="['/client',cli.id]" >
        <!-- routerLink="/client/{{cli.id}}" -->
        <mat-icon mat-list-icon>account_circle</mat-icon>
        <h3 mat-line>{{cli.prenom | capitalize}} {{cli.nom | capitalize}}</h3>
        
        <p mat-line >
          <small [ngPlural]="cli.comptes?cli.comptes.length:0">
            <ng-template ngPluralCase="=0">Aucun compte</ng-template>
            <ng-template ngPluralCase="=1">1 compte</ng-template>
            <ng-template ngPluralCase="other">{{cli.comptes.length}} comptes</ng-template>
          </small>
        </p>
      </a>
    </mat-nav-list>
  `,
  styles:[`
    .mat-nav-list .mat-list-item .mat-list-icon {
      font-size: 36px;
      height: 36px;
      width: 36px;
    }
  `]
})
export class ClientsComponent implements OnInit {

  clients: Array<Client> = [];

  private data: BanqueService;

  constructor(banqueService: BanqueHttpService){
    this.data = banqueService;
  }

  ngOnInit() {
    this.data.getClients()
      .then( listeClients => this.clients = listeClients);
  }

}
