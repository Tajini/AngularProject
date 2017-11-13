import {Component, OnInit} from "@angular/core";
import {Client} from "./client";
import {BanqueLocalService} from "./banque-local.service";
import {ActivatedRoute} from "@angular/router";
import {BanqueService} from "./banque.service";
import {BanqueHttpService} from "./banque-http.service";


@Component({
  selector: "app-client",
  template: `
    <h2>{{client.prenom}} {{client.nom}}</h2>
    <mat-nav-list>
      <a mat-list-item 
         *ngFor="let cpt of client.comptes"
         routerLink="/" >
        <mat-icon mat-list-icon>account_balance</mat-icon>
        <h3 mat-line>{{cpt.numero}}</h3>
        <p mat-line>{{cpt.intitule}}</p>
      </a>
    </mat-nav-list>
  `,
  styles: [`
    .mat-nav-list .mat-list-item .mat-list-icon {
      font-size: 36px;
      height: 36px;
      width: 36px;
    }
  `]
})
export class ClientComponent implements OnInit {

  client: Client;

  private data: BanqueService;
  private route: ActivatedRoute;

  constructor(_data: BanqueHttpService, _route: ActivatedRoute) {
    this.route = _route;
    this.data = _data;
  }

  ngOnInit() {
    this.data.getClient(+this.route.snapshot.params["id"])
      .then( client => this.client = client );
  }

}
